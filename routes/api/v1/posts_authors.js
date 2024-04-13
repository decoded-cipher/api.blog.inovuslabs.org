
const express = require('express');
const router = express.Router();

const PostsAuthors = require('../../../models/v1/posts_authors');




router.get('/', async (req, res) => {
    await PostsAuthors.find().then((tags) => {
        res.status(200).json(tags);
    }).catch((err) => {
        res.status(400).json({ message: err });
    });
})



router.post('/seed', async (req, res) => {

    let tags = [
        {
            "id": "653f7a39b14998447e1d36db",
            "post_id": "653f72b55d18573f9b9f3d89",
            "author_id": "653f7a27b14998447e1d36d5",
            "sort_order": 0
        },
        {
            "id": "653f7b33b14998447e1d36eb",
            "post_id": "653f7b33b14998447e1d36ea",
            "author_id": "653f7a27b14998447e1d36d5",
            "sort_order": 0
        },
        {
            "id": "653fcc5cb14998447e1d3814",
            "post_id": "653fcc5cb14998447e1d3812",
            "author_id": "653f7a27b14998447e1d36d5",
            "sort_order": 0
        },
        {
            "id": "65409e1f0b27848ad6616f03",
            "post_id": "653f72b55d18573f9b9f3d89",
            "author_id": "65409075b14998447e1d393f",
            "sort_order": 1
        },
        {
            "id": "65409e310b27848ad6616f06",
            "post_id": "653f75815d18573f9b9f3db8",
            "author_id": "65409075b14998447e1d393f",
            "sort_order": 0
        },
        {
            "id": "65409e440b27848ad6616f09",
            "post_id": "653fbcceb14998447e1d3758",
            "author_id": "65409075b14998447e1d393f",
            "sort_order": 0
        },
        {
            "id": "65409e550b27848ad6616f0c",
            "post_id": "653f7c85b14998447e1d36fe",
            "author_id": "65409075b14998447e1d393f",
            "sort_order": 0
        },
        {
            "id": "654103c70b27848ad6616f61",
            "post_id": "654006a8b14998447e1d38a0",
            "author_id": "6540bc590b27848ad6616f50",
            "sort_order": 0
        },
        {
            "id": "654103f50b27848ad6616f64",
            "post_id": "65400b89b14998447e1d38d2",
            "author_id": "6540bc590b27848ad6616f50",
            "sort_order": 0
        },
        {
            "id": "6541042c0b27848ad6616f67",
            "post_id": "653f71fa5d18573f9b9f3d78",
            "author_id": "6540bc590b27848ad6616f50",
            "sort_order": 0
        },
        {
            "id": "654104470b27848ad6616f6a",
            "post_id": "65400865b14998447e1d38b1",
            "author_id": "6540bc590b27848ad6616f50",
            "sort_order": 0
        },
        {
            "id": "654104610b27848ad6616f6d",
            "post_id": "653fbbc5b14998447e1d3741",
            "author_id": "6540bc590b27848ad6616f50",
            "sort_order": 0
        },
        {
            "id": "6544ba9d0b27848ad66171ef",
            "post_id": "6544ba9d0b27848ad66171cf",
            "author_id": "653f7a27b14998447e1d36d5",
            "sort_order": 0
        },
        {
            "id": "6544ba9e0b27848ad661724f",
            "post_id": "6544ba9d0b27848ad66171e2",
            "author_id": "1",
            "sort_order": 0
        },
        {
            "id": "6544ba9e0b27848ad6617254",
            "post_id": "6544ba9d0b27848ad66171e3",
            "author_id": "65409075b14998447e1d393f",
            "sort_order": 0
        },
        {
            "id": "6544ba9e0b27848ad6617259",
            "post_id": "6544ba9d0b27848ad66171e4",
            "author_id": "65409075b14998447e1d393f",
            "sort_order": 0
        },
        {
            "id": "6544ba9f0b27848ad6617276",
            "post_id": "6544ba9d0b27848ad66171ea",
            "author_id": "653f7a27b14998447e1d36d5",
            "sort_order": 0
        },
        {
            "id": "6544ba9f0b27848ad6617278",
            "post_id": "6544ba9d0b27848ad66171eb",
            "author_id": "653f7a27b14998447e1d36d5",
            "sort_order": 0
        },
        {
            "id": "6544ba9f0b27848ad661727b",
            "post_id": "6544ba9d0b27848ad66171ec",
            "author_id": "653f7a27b14998447e1d36d5",
            "sort_order": 0
        },
        {
            "id": "654908920b27848ad66173b5",
            "post_id": "654908910b27848ad66173b4",
            "author_id": "6540988cb14998447e1d3946",
            "sort_order": 0
        },
        {
            "id": "654b3c5cd6af5204882b1047",
            "post_id": "6544ba9d0b27848ad66171e8",
            "author_id": "654666da0b27848ad66173a9",
            "sort_order": 0
        },
        {
            "id": "654cb883d6af5204882b1051",
            "post_id": "653f6f6b5d18573f9b9f3d60",
            "author_id": "654cb82cd6af5204882b104e",
            "sort_order": 0
        },
        {
            "id": "65583977658dec2aef461d66",
            "post_id": "65583976658dec2aef461d65",
            "author_id": "1",
            "sort_order": 0
        },
        {
            "id": "65583a4d658dec2aef461d79",
            "post_id": "65583a4d658dec2aef461d78",
            "author_id": "1",
            "sort_order": 0
        },
        {
            "id": "65715be3da4a454504859905",
            "post_id": "6544ba9d0b27848ad66171e5",
            "author_id": "65715b9fda4a454504859902",
            "sort_order": 0
        },
        {
            "id": "65715bf0da4a454504859908",
            "post_id": "6544ba9d0b27848ad66171e1",
            "author_id": "65715b9fda4a454504859902",
            "sort_order": 0
        },
        {
            "id": "65715bfbda4a45450485990b",
            "post_id": "653fd483b14998447e1d382f",
            "author_id": "65715b9fda4a454504859902",
            "sort_order": 0
        },
        {
            "id": "65715c05da4a45450485990e",
            "post_id": "6544ba9d0b27848ad66171de",
            "author_id": "65715b9fda4a454504859902",
            "sort_order": 0
        },
        {
            "id": "65715c0cda4a454504859911",
            "post_id": "6544ba9d0b27848ad66171dd",
            "author_id": "65715b9fda4a454504859902",
            "sort_order": 0
        },
        {
            "id": "65715db5da4a45450485991a",
            "post_id": "653fc0c6b14998447e1d37b5",
            "author_id": "65715d59da4a454504859916",
            "sort_order": 0
        },
        {
            "id": "65715dc1da4a45450485991d",
            "post_id": "653fc04ab14998447e1d37a3",
            "author_id": "65715d59da4a454504859916",
            "sort_order": 0
        },
        {
            "id": "65715df3da4a454504859920",
            "post_id": "653fbfb6b14998447e1d378d",
            "author_id": "65715d59da4a454504859916",
            "sort_order": 0
        },
        {
            "id": "65716007da4a454504859929",
            "post_id": "653fc24db14998447e1d37d3",
            "author_id": "65715f4dda4a454504859925",
            "sort_order": 0
        },
        {
            "id": "6571615dda4a454504859930",
            "post_id": "6544ba9d0b27848ad66171ec",
            "author_id": "1",
            "sort_order": 1
        },
        {
            "id": "657161bada4a454504859933",
            "post_id": "653f72b55d18573f9b9f3d89",
            "author_id": "6540988cb14998447e1d3946",
            "sort_order": 2
        },
        {
            "id": "657161beda4a454504859936",
            "post_id": "653f72b55d18573f9b9f3d89",
            "author_id": "654666da0b27848ad66173a9",
            "sort_order": 3
        },
        {
            "id": "6573e47e6380a70b9d63872e",
            "post_id": "6573e47d6380a70b9d63872d",
            "author_id": "654cb82cd6af5204882b104e",
            "sort_order": 0
        },
        {
            "id": "657a2e746380a70b9d6387b7",
            "post_id": "657a2d2c6380a70b9d6387a9",
            "author_id": "653f7a27b14998447e1d36d5",
            "sort_order": 0
        },
        {
            "id": "6581a5f41a2f5504933bd34e",
            "post_id": "6581a5f31a2f5504933bd34d",
            "author_id": "6540bc590b27848ad6616f50",
            "sort_order": 0
        },
        {
            "id": "65b2878c0980912bb7e53a56",
            "post_id": "65b2878c0980912bb7e53a55",
            "author_id": "6540bc590b27848ad6616f50",
            "sort_order": 0
        },
        {
            "id": "65b52dc40980912bb7e53a84",
            "post_id": "65b52dc40980912bb7e53a83",
            "author_id": "6540bc590b27848ad6616f50",
            "sort_order": 0
        },
        {
            "id": "65c8c5dd284566be7b8c4841",
            "post_id": "65c8c5d7284566be7b8c4840",
            "author_id": "6540bc590b27848ad6616f50",
            "sort_order": 0
        },
        {
            "id": "65f9a3d3048d430467e38ca0",
            "post_id": "65f9a3cd048d430467e38c9f",
            "author_id": "6540bc590b27848ad6616f50",
            "sort_order": 0
        },
        {
            "id": "660dd1ac37e55ba7ff7ff718",
            "post_id": "660dd1a937e55ba7ff7ff717",
            "author_id": "65409075b14998447e1d393f",
            "sort_order": 0
        }
    ];


    await PostsAuthors.insertMany(tags).then(() => {
        res.status(200).json({ message: 'Tags added successfully' });
    }).catch((err) => {
        res.status(400).json({ message: err });
    });

})



module.exports = router;