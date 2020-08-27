const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    username: String,
    hash: String,
    salt: String
});

mongoose.model('Post', PostSchema);