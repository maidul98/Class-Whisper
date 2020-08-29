const mongoose = require('mongoose');

/**
 * TODO
 * post title, user, votes..
 */
const PostSchema = new mongoose.Schema({
    createdAt: Date,
    title: String,
    body: String,
    votes: {
        type: Number,
        default: 0
    },
    user: Object,
    comments: {
        type: Array,
        default: []
    },
});

mongoose.model('Post', PostSchema);