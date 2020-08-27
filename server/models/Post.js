const mongoose = require('mongoose');

/**
 * TODO
 * post title, user, votes..
 */
const PostSchema = new mongoose.Schema({
    username: String,
    hash: String,
    salt: String
});

mongoose.model('Post', PostSchema);