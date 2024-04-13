
const mongoose = require('mongoose');
const uuid = require('uuid');

const UserSchema = new mongoose.Schema({
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
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    profile_image: {
        type: String,
        default: null
    },
    cover_image: {
        type: String,
        default: null
    },
    bio: {
        type: String,
        default: null
    },
    website: {
        type: String,
        default: null
    },
    location: {
        type: String,
        default: null
    },
    facebook: {
        type: String,
        default: null
    },
    twitter: {
        type: String,
        default: null
    },
    accessibility: {
        type: String,
        default: null
    },
    status: {
        type: String,
        default: null
    },
    locale: {
        type: String,
        default: null
    },
    visibility: {
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
    tour: {
        type: String,
        default: null
    },
    last_seen: {
        type: String,
        default: null
    },
    comment_notifications: {
        type: String,
        default: null
    },
    free_member_signup_notification: {
        type: String,
        default: null
    },
    paid_subscription_started_notification: {
        type: String,
        default: null
    },
    paid_subscription_canceled_notification: {
        type: String,
        default: null
    },
    mention_notifications: {
        type: String,
        default: null
    },
    recommendation_notifications: {
        type: String,
        default: null
    },
    milestone_notifications: {
        type: String,
        default: null
    },
    donation_notifications: {
        type: String,
        default: null
    },
    created_at: {
        type: String,
        default: null
    },
    updated_at: {
        type: String,
        default: null
    }

}, { collection: '_users' });

module.exports = mongoose.model('Users', UserSchema);