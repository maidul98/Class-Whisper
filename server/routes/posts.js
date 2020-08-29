const mongoose = require('mongoose');
const router = require('express').Router();
const axios = require('axios');
const User = mongoose.model('User');
const Post = mongoose.model('Post');
const passport = require('passport');
const utils = require('../lib/utils');

// // router.get('/protected', passport.authenticate('jwt', {session:false}),  (req, res, next) => {
// //     console.log(req.user)
// //     res.send('secured')
// //     next()
// // });

// // /**
// //  * TODO
// //  * search for post by term from all of our posts
// //  */
// // router.get('/search', function(req, res, next){

// // });

/**
 * Get post by id
 */
router.get('get/:id', function (req, res, next) {
    Post.findById(req.params.id)
        .then(post => {
            console.log(post)
            res.send(post)
        })
        .catch(err => console.log(err))
});

router.post('/search', function (req, res, next) {
    // the body request should have roster and subject at a minimum
    // any other search terms can be passed in under the "q" parameter
    const searchTerm = {
        'params': req.body
    };
    axios.get("https://classes.cornell.edu/api/2.0/search/classes.json", searchTerm)
        .then(response => {
            const data = response.data.data.classes;
            var classes = [];
            data.forEach(function (x) {
                classes.push({ "courseId": x.crseId, "subject": x.subject, "number": x.catalogNbr, "title": x.titleLong })
            })
            res.send(classes);
        })
        .catch(error => console.error('Roster API error', error));
});

/**
 * Get all posts
 */
router.get('/', function (req, res, next) {
    Post.find({}, (error, posts) => {
        res.send(posts)
    })
});

/**
 * return all posts ordered by time and highest votes
 */

router.get('/sort', function (req, res, next) {
    Post.find({}, (error, posts) => {
        res.send(posts.sort(function (a, b) {
            // Formula is the same as the Reddit "Hot" algorithm, found here: 
            // https://medium.com/hacking-and-gonzo/how-reddit-ranking-algorithms-work-ef111e33d0d9
            var seconds = Date.parse(a.createdAt) / 1000 - 1134028003;
            var order = Math.log10(Math.max(Math.abs(a.votes), 1));
            var sign = a.votes > 0 ? 1 : a.votes < 0 ? -1 : 0
            var aScore = Math.round(sign * order + seconds / 45000, 7);
            seconds = Date.parse(b.createdAt) / 1000 - 1134028003;
            order = Math.log10(Math.max(Math.abs(b.votes), 1));
            sign = b.votes > 0 ? 1 : b.votes < 0 ? -1 : 0
            var bScore = Math.round(sign * order + seconds / 45000, 7);
            var comp = 0;
            if (aScore > bScore) comp = -1;
            else if (aScore < bScore) comp = 1;
            return comp;
        }));
    });
});


// /**
//  * Make a new post
//  */
router.post('/', function (req, res, next) {
    const newPost = new Post({
        title: req.body.title,
        body: req.body.body,
        user: req.user,
    });

    newPost.save()
        .then(post => {
            res.send({ msg: "Successfully posted", post: post });
            next();
        })
        .catch(err => next(err));
});

// // /**
// //  * TODO
// //  * update a post
// //  * change the title or change the content
// //  */
// // router.put('/post', function(req, res, next){

// // });


// // /**
// //  * TODO
// //  * delete a post
// //  */
// // router.delete('/post', function(req, res, next){

// // });

// // /**
// //  * TODO
// //  * create a comment
// //  */
// // router.post('/comment', function(req, res, next){

// // });

// // /**
// //  * TODO
// //  * create a comment
// //  */
// // router.post('/comment', function(req, res, next){

// // });

// // /**
// //  * TODO
// //  * delete by id
// //  */
// // router.delete('/comment', function(req, res, next){

// // });

// // /**
// //  * TODO
// //  * get all comments for post ID
// //  */
// // router.get('/post-comments', function(req, res, next){

// // });



module.exports = router;