
const mongoose = require('mongoose');
const uuid = require('uuid');

const TagsSchema = new mongoose.Schema({
    id: {
        type: String,
        default: uuid.v4
    },
    name: {
        type: String,
        required: true
    },
    slug: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    feature_image: {
        type: String,
        required: false
    },
    parent_id: {
        type: String,
        required: false
    },
    visibility: {
        type: String,
        required: false
    },
    og_image: {
        type: String,
        required: false
    },
    og_title: {
        type: String,
        required: false
    },
    og_description: {
        type: String,
        required: false
    },
    twitter_image: {
        type: String,
        required: false
    },
    twitter_title: {
        type: String,
        required: false
    },
    twitter_description: {
        type: String,
        required: false
    },
    meta_title: {
        type: String,
        required: false
    },
    meta_description: {
        type: String,
        required: false
    },
    codeinjection_head: {
        type: String,
        required: false
    },
    codeinjection_foot: {
        type: String,
        required: false
    },
    canonical_url: {
        type: String,
        required: false
    },
    accent_color: {
        type: String,
        required: false
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: {
        type: Date,
        default: Date.now
    }

}, { collection: '_tags' });

module.exports = mongoose.model('Tags', TagsSchema);