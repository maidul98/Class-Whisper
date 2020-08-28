const mongoose = require('mongoose');

/**
 * TODO
 * post title, user, votes..
 */
const PostSchema = new mongoose.Schema({
    username: String,
    title: String,
    content: String,
    votes: int,
});

mongoose.model('Post', PostSchema);