

const mongoose = require('mongoose');
const uuid = require('uuid');

const PostMetaSchema = new mongoose.Schema({
    id: {
        type: String,
        default: uuid.v4
    },
    post_id: {
        type: String,
        required: true
    },
    og_image: {
        type: String,
        default: null
    },
    og_title: {
        type: String,
        default: null
    },
    og_description: {
        type: String,
        default: null
    },
    twitter_image: {
        type: String,
        default: null
    },
    twitter_title: {
        type: String,
        default: null
    },
    twitter_description: {
        type: String,
        default: null
    },
    meta_title: {
        type: String,
        default: null
    },
    meta_description: {
        type: String,
        default: null
    },
    email_subject: {
        type: String,
        default: null
    },
    frontmatter: {
        type: String,
        default: null
    },
    feature_image_alt: {
        type: String,
        default: null
    },
    feature_image_caption: {
        type: String,
        default: null
    },
    email_only: {
        type: Number,
        default: 0
    }

}, { collection: 'posts_meta' });

module.exports = mongoose.model('PostsMeta', PostMetaSchema);