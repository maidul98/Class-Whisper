const router = require('express').Router();

router.use('/users', require('./users'));

router.use('/post', require('./posts'));

module.exports = router;