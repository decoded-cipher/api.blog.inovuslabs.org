

const mongoose = require('mongoose');
const uuid = require('uuid');

const PostAuthorSchema = new mongoose.Schema({
    id: {
        type: String,
        default: uuid.v4
    },
    post_id: {
        type: String,
        required: true
    },
    author_id: {
        type: String,
        required: true
    },
    sort_order: {
        type: Number,
        default: 0
    }

}, { collection: '_posts_authors' });

module.exports = mongoose.model('PostsAuthors', PostAuthorSchema);