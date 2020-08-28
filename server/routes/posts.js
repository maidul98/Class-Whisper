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

// /**
//  * TODO
//  * search for post by term from all of our posts
//  */
// router.get('/search', function(req, res, next){
    
// });

// /**
//  * TODO
//  * get a post by ID
//  */
router.get('/', function(req, res, next){
    // Post.findOne({_id: req.body.id})
    //   .then((post)=>{
    //     if(!post){
    //         res.status(401).json({success: false, msg: "Post has not been created."})
    //     }
    //     else{
    //       res.json({success: true})
    //   }
    let data = Post.findOne({_id:"5f496beb615872e97f5915c4"})
    console.log(data)
});

router.post('/', passport.authenticate('jwt', {session:false}), function(req, res, next){
    const newPost = new Post({
        title: req.body.title,
        body: req.body.body,
        user: req.user,
    });

    newPost.save()
           .then(post=>{
               res.send({msg: "Successfully posted", post:post});
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