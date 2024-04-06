
const express = require('express');
const router = express.Router();

const PostsTags = require('../../models/posts_tags');
const verifyToken = require('../../middleware/authentication');




router.post('/seed', async (req, res) => {

    let tags = [
        {
            "id": "653f70e95d18573f9b9f3d74",
            "post_id": "653f6f6b5d18573f9b9f3d60",
            "tag_id": "653f70e95d18573f9b9f3d73",
            "sort_order": 0
        },
        {
            "id": "653f71fb5d18573f9b9f3d7a",
            "post_id": "653f71fa5d18573f9b9f3d78",
            "tag_id": "653f71fb5d18573f9b9f3d79",
            "sort_order": 0
        },
        {
            "id": "653f72d95d18573f9b9f3d92",
            "post_id": "653f72b55d18573f9b9f3d89",
            "tag_id": "653f72d95d18573f9b9f3d91",
            "sort_order": 0
        },
        {
            "id": "653f7b56b14998447e1d36f3",
            "post_id": "653f7b33b14998447e1d36ea",
            "tag_id": "653f689c5d18573f9b9f3d4d",
            "sort_order": 0
        },
        {
            "id": "653fbc2cb14998447e1d374a",
            "post_id": "653fbbc5b14998447e1d3741",
            "tag_id": "653f71fb5d18573f9b9f3d79",
            "sort_order": 0
        },
        {
            "id": "653fbfd1b14998447e1d3794",
            "post_id": "653fbfb6b14998447e1d378d",
            "tag_id": "653f689c5d18573f9b9f3d4d",
            "sort_order": 0
        },
        {
            "id": "653fc073b14998447e1d37ab",
            "post_id": "653fc04ab14998447e1d37a3",
            "tag_id": "653fc073b14998447e1d37aa",
            "sort_order": 0
        },
        {
            "id": "653fc107b14998447e1d37bf",
            "post_id": "653fc0c6b14998447e1d37b5",
            "tag_id": "653fc107b14998447e1d37be",
            "sort_order": 0
        },
        {
            "id": "653fc29ab14998447e1d37de",
            "post_id": "653fc24db14998447e1d37d3",
            "tag_id": "653fc29ab14998447e1d37dd",
            "sort_order": 0
        },
        {
            "id": "653fcc5cb14998447e1d3813",
            "post_id": "653fcc5cb14998447e1d3812",
            "tag_id": "653fc29ab14998447e1d37dd",
            "sort_order": 0
        },
        {
            "id": "653fd4acb14998447e1d383a",
            "post_id": "653fd483b14998447e1d382f",
            "tag_id": "653fca73b14998447e1d37f2",
            "sort_order": 0
        },
        {
            "id": "654006ecb14998447e1d38aa",
            "post_id": "654006a8b14998447e1d38a0",
            "tag_id": "653f70e95d18573f9b9f3d73",
            "sort_order": 0
        },
        {
            "id": "65400887b14998447e1d38b9",
            "post_id": "65400865b14998447e1d38b1",
            "tag_id": "653f71fb5d18573f9b9f3d79",
            "sort_order": 0
        },
        {
            "id": "65400b9bb14998447e1d38d9",
            "post_id": "65400b89b14998447e1d38d2",
            "tag_id": "653f71fb5d18573f9b9f3d79",
            "sort_order": 0
        },
        {
            "id": "6541eb840b27848ad6616f70",
            "post_id": "653f75815d18573f9b9f3db8",
            "tag_id": "653f70e95d18573f9b9f3d73",
            "sort_order": 0
        },
        {
            "id": "6541edbb0b27848ad6616f81",
            "post_id": "653f7c85b14998447e1d36fe",
            "tag_id": "6541ec420b27848ad6616f75",
            "sort_order": 0
        },
        {
            "id": "6541ee210b27848ad6616f86",
            "post_id": "653fbcceb14998447e1d3758",
            "tag_id": "6541ee040b27848ad6616f84",
            "sort_order": 0
        },
        {
            "id": "6544ba9d0b27848ad66171ed",
            "post_id": "6544ba9d0b27848ad66171cf",
            "tag_id": "653f689c5d18573f9b9f3d4d",
            "sort_order": 0
        },
        {
            "id": "6544ba9e0b27848ad6617234",
            "post_id": "6544ba9d0b27848ad66171dd",
            "tag_id": "653fca73b14998447e1d37f2",
            "sort_order": 0
        },
        {
            "id": "6544ba9e0b27848ad6617239",
            "post_id": "6544ba9d0b27848ad66171de",
            "tag_id": "653fca73b14998447e1d37f2",
            "sort_order": 0
        },
        {
            "id": "6544ba9e0b27848ad6617248",
            "post_id": "6544ba9d0b27848ad66171e1",
            "tag_id": "653fca73b14998447e1d37f2",
            "sort_order": 0
        },
        {
            "id": "6544ba9e0b27848ad661724d",
            "post_id": "6544ba9d0b27848ad66171e2",
            "tag_id": "653f689c5d18573f9b9f3d4d",
            "sort_order": 0
        },
        {
            "id": "6544ba9e0b27848ad6617252",
            "post_id": "6544ba9d0b27848ad66171e3",
            "tag_id": "653f70e95d18573f9b9f3d73",
            "sort_order": 0
        },
        {
            "id": "6544ba9e0b27848ad6617257",
            "post_id": "6544ba9d0b27848ad66171e4",
            "tag_id": "6541ec420b27848ad6616f75",
            "sort_order": 0
        },
        {
            "id": "6544ba9e0b27848ad661725c",
            "post_id": "6544ba9d0b27848ad66171e5",
            "tag_id": "653fca73b14998447e1d37f2",
            "sort_order": 0
        },
        {
            "id": "6544ba9f0b27848ad661726b",
            "post_id": "6544ba9d0b27848ad66171e8",
            "tag_id": "653f71fb5d18573f9b9f3d79",
            "sort_order": 0
        },
        {
            "id": "6544ba9f0b27848ad6617279",
            "post_id": "6544ba9d0b27848ad66171ec",
            "tag_id": "653fc29ab14998447e1d37dd",
            "sort_order": 0
        },
        {
            "id": "6570315fda4a4545048598fe",
            "post_id": "653f75815d18573f9b9f3db8",
            "tag_id": "6541ed6b0b27848ad6616f79",
            "sort_order": 1
        },
        {
            "id": "657a2ebc6380a70b9d6387b9",
            "post_id": "657a2d2c6380a70b9d6387a9",
            "tag_id": "653fc29ab14998447e1d37dd",
            "sort_order": 0
        },
        {
            "id": "6581b5831a2f5504933bd3d9",
            "post_id": "6581a5f31a2f5504933bd34d",
            "tag_id": "653f71fb5d18573f9b9f3d79",
            "sort_order": 0
        },
        {
            "id": "65b28b1b0980912bb7e53a63",
            "post_id": "65b2878c0980912bb7e53a55",
            "tag_id": "653f70e95d18573f9b9f3d73",
            "sort_order": 0
        },
        {
            "id": "65b6012f0980912bb7e53aa2",
            "post_id": "65b52dc40980912bb7e53a83",
            "tag_id": "653f70e95d18573f9b9f3d73",
            "sort_order": 0
        },
        {
            "id": "65c8c6bd284566be7b8c484f",
            "post_id": "65c8c5d7284566be7b8c4840",
            "tag_id": "654681e50b27848ad66173ac",
            "sort_order": 0
        },
        {
            "id": "66019cb30b1a340478678d51",
            "post_id": "65f9a3cd048d430467e38c9f",
            "tag_id": "6558f87e658dec2aef461d81",
            "sort_order": 0
        },
        {
            "id": "660dd45737e55ba7ff7ff731",
            "post_id": "660dd1a937e55ba7ff7ff717",
            "tag_id": "660703029db75aa581ce2f96",
            "sort_order": 0
        }
    ];


    await PostsTags.insertMany(tags).then(() => {
        res.status(200).json({ message: 'Tags added successfully' });
    }).catch((err) => {
        res.status(400).json({ message: err });
    });

})



module.exports = router;