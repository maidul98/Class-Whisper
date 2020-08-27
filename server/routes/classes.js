const mongoose = require('mongoose');
const router = require('express').Router();   
const User = mongoose.model('User');
const passport = require('passport');
const utils = require('../lib/utils');

/**
 * TODO
 * join class
 */
router.post('/join', function(req, res, next){
    
});

/**
 * TODO
 * leave class
 */
router.post('/leave', function(req, res, next){
    
});

/**
 * TODO
 * search for the given term using https://classes.cornell.edu/content/FA20/api-details
 */
router.post('/search', function(req, res, next){
    
});





module.exports = router;