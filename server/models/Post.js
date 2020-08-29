const mongoose = require('mongoose');

/**
 * TODO
 * post title, user, votes..
 */
const PostSchema = new mongoose.Schema({
    createdAt: {
        type: Date,
        default: Date.now
    },
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
    class: String
});

mongoose.model('Post', PostSchema);