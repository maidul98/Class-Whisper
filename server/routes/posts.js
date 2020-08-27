const mongoose = require('mongoose');
const router = require('express').Router();   
const User = mongoose.model('User');
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
router.post('/search', function(req, res, next){
    
});

/**
 * TODO
 * get a post by ID
 */
router.get('/post', function(req, res, next){
    
});


/**
 * TODO
 * make a new post
 */
router.post('/post', function(req, res, next){
    
});

/**
 * TODO
 * update a post
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