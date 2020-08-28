const mongoose = require('mongoose');
const router = require('express').Router();   
const User = mongoose.model('User');
const Post = mongoose.model('Post');
const passport = require('passport');
const utils = require('../lib/utils');

// router.get('/protected', passport.authenticate('jwt', {session:false}),  (req, res, next) => {
//     console.log(req.user)
//     res.send('secured')
//     next()
// });

/**
 * TODO
 * search for post by term from all of our posts
 */
router.get('/search', function(req, res, next){
    
});

/**
 * TODO
 * get a post by ID
 */
router.get('/post', function(req, res, next){
    Post.findOne({_id: req._id})
      .then((post)=>{
        if(!post){
            res.status(401).json({success: false, msg: "Post has not been created."})
        }
        else{
          res.json({success: true})
      }
});

router.post('/post', function(req, res, next){
    // const newPost = new Post({
    //   username: req.body.username,
    //     title: req.body.title,
    //     content: req.body.content,
    //     votes: 0,
    // });

    // newPost.save()
    //        .then(post=>{
    //            res.send("Successfully posted!");
    //            next();
    //        })
    //        .catch(err => next(err));

    res.send("hi");

});

/**
 * TODO
 * update a post
 * change the title or change the content
 */
router.put('/post', function(req, res, next){
    
});


/**
 * TODO
 * delete a post
 */
router.delete('/post', function(req, res, next){
    
});

/**
 * TODO
 * create a comment
 */
router.post('/comment', function(req, res, next){
    
});

/**
 * TODO
 * create a comment
 */
router.post('/comment', function(req, res, next){
    
});

/**
 * TODO
 * delete by id
 */
router.delete('/comment', function(req, res, next){
    
});

/**
 * TODO
 * get all comments for post ID
 */
router.get('/post-comments', function(req, res, next){
    
});



module.exports = router;