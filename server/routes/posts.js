const mongoose = require('mongoose');
const router = require('express').Router();
const axios = require('axios');
const User = mongoose.model('User');
const Post = mongoose.model('Post');
const passport = require('passport');
const utils = require('../lib/utils');

// router.get('/protected', passport.authenticate('jwt', {session:false}),  (req, res, next) => {
//     console.log(req.user)
//     res.send('secured')
//     next()
// });

// /**
//  * TODO
//  * search for post by term from all of our posts
//  */
// router.get('/search', function(req, res, next){

// });

/**
 * Get post by id
 */
router.get('/:id', function (req, res, next) {
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
 * TO DO 
 * return all posts ordered by time and highest votes
 */


/**
 * Make a new post
 */
router.post('/', passport.authenticate('jwt', { session: false }), function (req, res, next) {
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

// /**
//  * TODO
//  * update a post
//  * change the title or change the content
//  */
// router.put('/post', function(req, res, next){

// });


// /**
//  * TODO
//  * delete a post
//  */
// router.delete('/post', function(req, res, next){

// });

// /**
//  * TODO
//  * create a comment
//  */
// router.post('/comment', function(req, res, next){

// });

// /**
//  * TODO
//  * create a comment
//  */
// router.post('/comment', function(req, res, next){

// });

// /**
//  * TODO
//  * delete by id
//  */
// router.delete('/comment', function(req, res, next){

// });

// /**
//  * TODO
//  * get all comments for post ID
//  */
// router.get('/post-comments', function(req, res, next){

// });



module.exports = router;