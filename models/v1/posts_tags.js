

const mongoose = require('mongoose');
const uuid = require('uuid');

const PostsTagSchema = new mongoose.Schema({
    id: {
        type: String,
        default: uuid.v4
    },
    post_id: {
        type: String,
        required: true
    },
    tag_id: {
        type: String,
        required: true
    },
    sort_order: {
        type: Number,
        default: 0
    }

}, { collection: '_posts_tags' });

module.exports = mongoose.model('PostsTags', PostsTagSchema);