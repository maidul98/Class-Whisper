const mongoose = require('mongoose');
const router = require('express').Router();   
const User = mongoose.model('User');
const passport = require('passport');
const utils = require('../lib/utils');

router.get('/protected',passport.authenticate('jwt', {session:false}),  (req, res, next) => {
    res.send('secured')
    next()
});

router.post('/login', function(req, res, next){
    User.findOne({username: req.body.username})
        .then((user)=>{
            if(!user){
                res.status(401).json({success: false, msg: "You are not registered"})
            }

            const isValid = utils.validPassword(req.body.password, user.hash, user.salt)
            if(isValid){
                const jwt = utils.issueJWT(user)
                res.json({success: true, user: user, token:jwt.token, expiresIn: jwt.expires });
            }else{
                res.status(401).json({success:false, msg:"Username or password is incorrect"})
            }

            next();
        })
        .catch(err=>{
            next(err)
        })
});


router.post('/register', function(req, res, next){
    const saltHash = utils.genPassword(req.body.password);

    const salt = saltHash.salt;
    const hash = saltHash.hash;

    const newUser = new User({
        username: req.body.username,
        hash: hash,
        salt: salt
    });

    newUser.save()
           .then(user=>{
               const jwt = utils.issueJWT(user)
               res.json({success: true, user: user, token:jwt.token, expiresIn: jwt.expires });
               next();
           })
           .catch(err => next(err));
});

module.exports = router;