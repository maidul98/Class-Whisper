const mongoose = require("mongoose");
const router = require("express").Router();
const postVotesCollection = mongoose.model("Vote");
const passport = require("passport");

/**
 * Make a vote
 */
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  async (req, res, next) => {
    var counterInc = 0;
    var voterType = null;

    let requestBody = req.body;
    let postToFind = requestBody["postId"];

    console.log(req.body);

    if (requestBody["voteType"] == "") {
      await postVotesCollection.updateOne(
        { post: postToFind },
        {
          $pull: {
            downvoters: req.user._id,
          },
        },
        async (error, result) => {
          if (result.nModified > 0) {
            await postVotesCollection.updateOne(
              { post: postToFind },
              {
                $inc: {
                  voteCounts: 1,
                },
              }
            );
          } else {
            await postVotesCollection.updateOne(
              { post: postToFind },
              {
                $pull: {
                  upvoters: req.user._id,
                },
              },
              async (error, result) => {
                if (result.nModified > 0) {
                  await postVotesCollection.updateOne(
                    { post: postToFind },
                    {
                      $inc: {
                        voteCounts: -1,
                      },
                    }
                  );
                }
              }
            );
          }
        }
      );
    }
    //If the user is already in the downvoters list, then we remove from it and add to the upvoters
    //That's why for negating the downvote -(-1) and another upvote (+1) - Totally 2 is added to the count
    if (requestBody["voteType"] == "up") {
      voterType = "upvoters";
      await postVotesCollection.updateOne(
        { post: postToFind },
        {
          $pull: {
            downvoters: req.user._id,
          },
        },
        (error, result) => {
          if (result.nModified > 0) {
            counterInc = 2;
          } else {
            counterInc = 1;
          }
        }
      );
    }
    //The same logic for downvoting as well. We remove from the upvoters list and add to the downvoters
    //We negate the upvote -(+1) and another downvote - Totally -2 is added to the count
    else if (requestBody["voteType"] == "down") {
      voterType = "downvoters";
      await postVotesCollection.updateOne(
        { post: postToFind },
        {
          $pull: {
            upvoters: req.user._id,
          },
        },
        (error, result) => {
          if (result.nModified > 0) {
            counterInc = -2;
          } else {
            counterInc = -1;
          }
        }
      );
    }
    //Finally here we make the changes to the DB for upvote and downvote
    //We add it to the respective voters list and modify the counter accordingly
    if (requestBody["voteType"] !== "") {
      const voterTypeObj = {};
      voterTypeObj[voterType] = req.user._id;

      postVotesCollection.updateOne(
        { post: postToFind },
        {
          $addToSet: voterTypeObj,
        },
        async (error, result) => {
          if (result.nModified > 0) {
            await postVotesCollection.updateOne(
              { post: postToFind },
              {
                $inc: {
                  voteCounts: counterInc,
                },
              }
            );
          }
        }
      );
    }

    res.end();
  }
);

module.exports = router;
