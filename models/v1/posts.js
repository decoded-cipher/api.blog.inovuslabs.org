

const mongoose = require('mongoose');
const uuid = require('uuid');

const PostSchema = new mongoose.Schema({
    id: {
        type: String,
        default: uuid.v4
    },
    uuid: {
        type: String,
        default: uuid.v4
    },
    title: {
        type: String,
        required: true
    },
    slug: {
        type: String,
        required: true
    },
    mobiledoc: {
        type: String,
        required: false
    },
    lexical: {
        type: String,
        required: false
    },
    html: {
        type: String,
        required: false
    },
    comment_id: {
        type: String,
        required: false
    },
    plaintext: {
        type: String,
        required: false
    },
    feature_image: {
        type: String,
        required: false
    },
    featured: {
        type: Boolean,
        required: false
    },
    type: {
        type: String,
        required: false
    },
    status: {
        type: String,
        required: false
    },
    locale: {
        type: String,
        required: false
    },
    visibility: {
        type: String,
        required: false
    },
    email_recipient_filter: {
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
    },
    published_at: {
        type: Date,
        default: Date.now
    },
    custom_excerpt: {
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
    custom_template: {
        type: String,
        required: false
    },
    canonical_url: {
        type: String,
        required: false
    },
    newsletter_id: {
        type: String,
        required: false
    },
    show_title_and_feature_image: {
        type: Boolean,
        required: false
    }

}, { collection: '_posts' });

module.exports = mongoose.model('Posts', PostSchema);