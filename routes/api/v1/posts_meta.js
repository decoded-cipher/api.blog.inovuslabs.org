
const express = require('express');
const router = express.Router();

const PostsMeta = require('../../../models/v1/posts_meta');




router.post('/seed', async (req, res) => {

    let tags = [
        {
            "id": "653f753f5d18573f9b9f3db6",
            "post_id": "6544ba9d0b27848ad66171cf",
            "og_image": null,
            "og_title": null,
            "og_description": null,
            "twitter_image": null,
            "twitter_title": null,
            "twitter_description": null,
            "meta_title": null,
            "meta_description": null,
            "email_subject": null,
            "frontmatter": null,
            "feature_image_alt": null,
            "feature_image_caption": "<span style=\"white-space: pre-wrap;\">Photo by </span><a href=\"https://unsplash.com/@napr0tiv?utm_source=ghost&amp;utm_medium=referral&amp;utm_campaign=api-credit\"><span style=\"white-space: pre-wrap;\">Vasily Koloda</span></a><span style=\"white-space: pre-wrap;\"> / </span><a href=\"https://unsplash.com/?utm_source=ghost&amp;utm_medium=referral&amp;utm_campaign=api-credit\"><span style=\"white-space: pre-wrap;\">Unsplash</span></a>",
            "email_only": 0
        },
        {
            "id": "653fd548b14998447e1d3849",
            "post_id": "6544ba9d0b27848ad66171e1",
            "og_image": null,
            "og_title": null,
            "og_description": null,
            "twitter_image": null,
            "twitter_title": null,
            "twitter_description": null,
            "meta_title": null,
            "meta_description": null,
            "email_subject": null,
            "frontmatter": null,
            "feature_image_alt": null,
            "feature_image_caption": "<i><em class=\"italic\" style=\"white-space: pre-wrap;\">Slightly adapted from google😁</em></i>",
            "email_only": 0
        },
        {
            "id": "6542908c0b27848ad6616f8f",
            "post_id": "6544ba9d0b27848ad66171ec",
            "og_image": null,
            "og_title": null,
            "og_description": null,
            "twitter_image": null,
            "twitter_title": null,
            "twitter_description": null,
            "meta_title": null,
            "meta_description": null,
            "email_subject": null,
            "frontmatter": null,
            "feature_image_alt": null,
            "feature_image_caption": "<span style=\"white-space: pre-wrap;\">Photo by </span><a href=\"https://unsplash.com/@artwall_hd?utm_source=ghost&amp;utm_medium=referral&amp;utm_campaign=api-credit\"><span style=\"white-space: pre-wrap;\">Art Wall - Kittenprint</span></a><span style=\"white-space: pre-wrap;\"> / </span><a href=\"https://unsplash.com/?utm_source=ghost&amp;utm_medium=referral&amp;utm_campaign=api-credit\"><span style=\"white-space: pre-wrap;\">Unsplash</span></a>",
            "email_only": 0
        },
        {
            "id": "6573e6bd6380a70b9d638736",
            "post_id": "6573e47d6380a70b9d63872d",
            "og_image": null,
            "og_title": null,
            "og_description": null,
            "twitter_image": null,
            "twitter_title": null,
            "twitter_description": null,
            "meta_title": null,
            "meta_description": null,
            "email_subject": null,
            "frontmatter": null,
            "feature_image_alt": null,
            "feature_image_caption": null,
            "email_only": 0
        },
        {
            "id": "657a2e096380a70b9d6387b2",
            "post_id": "657a2d2c6380a70b9d6387a9",
            "og_image": null,
            "og_title": null,
            "og_description": null,
            "twitter_image": null,
            "twitter_title": null,
            "twitter_description": null,
            "meta_title": null,
            "meta_description": null,
            "email_subject": null,
            "frontmatter": null,
            "feature_image_alt": null,
            "feature_image_caption": "<span style=\"white-space: pre-wrap;\">Photo by </span><a href=\"https://unsplash.com/@kmuza?utm_source=ghost&amp;utm_medium=referral&amp;utm_campaign=api-credit\"><span style=\"white-space: pre-wrap;\">Carlos Muza</span></a><span style=\"white-space: pre-wrap;\"> / </span><a href=\"https://unsplash.com/?utm_source=ghost&amp;utm_medium=referral&amp;utm_campaign=api-credit\"><span style=\"white-space: pre-wrap;\">Unsplash</span></a>",
            "email_only": 0
        },
        {
            "id": "6581b35f1a2f5504933bd3d3",
            "post_id": "6581a5f31a2f5504933bd34d",
            "og_image": null,
            "og_title": null,
            "og_description": null,
            "twitter_image": null,
            "twitter_title": null,
            "twitter_description": null,
            "meta_title": null,
            "meta_description": null,
            "email_subject": null,
            "frontmatter": null,
            "feature_image_alt": null,
            "feature_image_caption": "<span style=\"white-space: pre-wrap;\">Photo by </span><a href=\"https://unsplash.com/@marvelous?utm_source=ghost&amp;utm_medium=referral&amp;utm_campaign=api-credit\"><span style=\"white-space: pre-wrap;\">Marvin Meyer</span></a><span style=\"white-space: pre-wrap;\"> / </span><a href=\"https://unsplash.com/?utm_source=ghost&amp;utm_medium=referral&amp;utm_campaign=api-credit\"><span style=\"white-space: pre-wrap;\">Unsplash</span></a>",
            "email_only": 0
        },
        {
            "id": "65b287a50980912bb7e53a5b",
            "post_id": "65b2878c0980912bb7e53a55",
            "og_image": null,
            "og_title": null,
            "og_description": null,
            "twitter_image": null,
            "twitter_title": null,
            "twitter_description": null,
            "meta_title": null,
            "meta_description": null,
            "email_subject": null,
            "frontmatter": null,
            "feature_image_alt": null,
            "feature_image_caption": null,
            "email_only": 0
        },
        {
            "id": "65b669a30980912bb7e53aad",
            "post_id": "65b52dc40980912bb7e53a83",
            "og_image": null,
            "og_title": null,
            "og_description": null,
            "twitter_image": null,
            "twitter_title": null,
            "twitter_description": null,
            "meta_title": null,
            "meta_description": null,
            "email_subject": null,
            "frontmatter": null,
            "feature_image_alt": null,
            "feature_image_caption": "<span style=\"white-space: pre-wrap;\">Image Generated by AI</span>",
            "email_only": 0
        },
        {
            "id": "65c8c5e5284566be7b8c4846",
            "post_id": "65c8c5d7284566be7b8c4840",
            "og_image": null,
            "og_title": null,
            "og_description": null,
            "twitter_image": null,
            "twitter_title": null,
            "twitter_description": null,
            "meta_title": null,
            "meta_description": null,
            "email_subject": null,
            "frontmatter": null,
            "feature_image_alt": null,
            "feature_image_caption": "<span style=\"white-space: pre-wrap;\">Image generated by AI</span>",
            "email_only": 0
        },
        {
            "id": "65fbec1d7d9356046dbd815e",
            "post_id": "65f9a3cd048d430467e38c9f",
            "og_image": null,
            "og_title": null,
            "og_description": null,
            "twitter_image": null,
            "twitter_title": null,
            "twitter_description": null,
            "meta_title": null,
            "meta_description": null,
            "email_subject": null,
            "frontmatter": null,
            "feature_image_alt": null,
            "feature_image_caption": "<span style=\"white-space: pre-wrap;\">Image generated by AI</span>",
            "email_only": 0
        }
    ];


    await PostsMeta.insertMany(tags).then(() => {
        res.status(200).json({ message: 'Tags added successfully' });
    }).catch((err) => {
        res.status(400).json({ message: err });
    });

})



module.exports = router;