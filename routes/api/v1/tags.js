
const express = require('express');
const router = express.Router();

const Tags = require('../../../models/v1/tags');
const Posts = require('../../../models/v1/posts');
const Users = require('../../../models/v1/users');
const PostsTags = require('../../../models/v1/posts_tags');
const PostsMeta = require('../../../models/v1/posts_meta');



/**
 * @route   GET /api/v1/roles
 * @desc    Get all roles with pagination
 * @access  Public
 * @params  page, limit, search
 * @return  message, data
 * @error   400, { error }
 * @status  200, 400
 * 
 * @example /api/v1/roles?page=1&limit=10&search=role
**/

router.get('/', async (req, res) => {

    let page = parseInt(req.query.page) || 1;
    let limit = parseInt(req.query.limit) || 10;
    let search = req.query.search || null;

    let query = {};
    if (search) {
        query = { $text: { $search: search } };
    }

    let totalTags = await Tags.countDocuments(query)
        .catch(err => {
            res.status(400).json({
                status: 400,
                message: 'Error retrieving tags',
                error: err
            });
        });

    let tags = await Tags.find(query)
        .skip((page - 1) * limit)
        .limit(limit)
        .catch(err => {
            res.status(400).json({
                status: 400,
                message: 'Error retrieving tags',
                error: err
            });
        });

    res.status(200).json({
        status: 200,
        message: 'Tags retrieved successfully',
        data: {
            tags: tags,
            meta: {
                page: page,
                limit: limit,
                pages: Math.ceil(totalTags / limit),
                total: totalTags,
                search: search
            }
        }
    });

});





/**
 * @route   GET /api/v1/tags/:slug
 * @desc    Get post by tag slug
 * @access  Public
 * @params  slug
 * @return  message, data
 * @error   400, { error }
 * @status  200, 400
 * 
 * @example /api/v1/tags/freethinking
 **/

router.get('/:slug', async (req, res) => {

    let slug = req.params.slug;

    await Tags.findOne({ slug: slug })
        .then(async tag => {

            await PostsTags.find({ tag_id: tag.id })
                .then(async postsTags => {

                    let posts = [];
                    for (let i = 0; i < postsTags.length; i++) {
                        let post = await Posts.findOne({ id: postsTags[i].post_id });
                        let author = await Users.findOne({ id: post.author_id });
                        let meta = await PostsMeta.findOne({ post_id: post.id });
                        posts.push({
                            id: post.id,
                            title: post.title,
                            slug: post.slug,
                            html: post.html,
                            feature_image: post.feature_image,
                            published_at: post.published_at
                        });
                    }

                    res.status(200).json({
                        status: 200,
                        message: 'Posts retrieved successfully',
                        data: {
                            tag: tag,
                            posts: {
                                total: posts.length,
                                posts: [
                                    ...posts.map(post => ({
                                        id: post.id,
                                        title: post.title,
                                        slug: post.slug,
                                        feature_image: post.feature_image,
                                        published_at: post.published_at
                    
                                    }))
                                ]
                            }
                        }
                    });

                })
                .catch(err => {
                    res.status(400).json({
                        status: 400,
                        message: 'Error retrieving posts',
                        error: err
                    });
                });

        })
        .catch(err => {
            res.status(400).json({
                status: 400,
                message: 'Error retrieving tag',
                error: err
            });
        });

});





router.post('/seed', async (req, res) => {

    let tags = [
        {
            "id": "653f689c5d18573f9b9f3d4d",
            "name": "Free Thinking",
            "slug": "freethinking",
            "description": null,
            "feature_image": "https://images.unsplash.com/photo-1553258318-c22356c14808?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMTc3M3wwfDF8c2VhcmNofDl8fGZyZWUlMjBzcGVlY2h8ZW58MHx8fHwxNjk4OTAyODU1fDA&ixlib=rb-4.0.3&q=80&w=2000",
            "parent_id": null,
            "visibility": "public",
            "og_image": null,
            "og_title": null,
            "og_description": null,
            "twitter_image": null,
            "twitter_title": null,
            "twitter_description": null,
            "meta_title": null,
            "meta_description": null,
            "codeinjection_head": null,
            "codeinjection_foot": null,
            "canonical_url": null,
            "accent_color": "#d12323",
            "created_at": "2023-10-30 08:26:04",
            "updated_at": "2023-11-03 09:55:59"
        },
        {
            "id": "653f70e95d18573f9b9f3d73",
            "name": "Psychology",
            "slug": "psychology",
            "description": null,
            "feature_image": "https://images.unsplash.com/photo-1573511860302-28c524319d2a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMTc3M3wwfDF8c2VhcmNofDF8fHBzeWNob2xvZ3l8ZW58MHx8fHwxNjk4OTAyNzgwfDA&ixlib=rb-4.0.3&q=80&w=2000",
            "parent_id": null,
            "visibility": "public",
            "og_image": null,
            "og_title": null,
            "og_description": null,
            "twitter_image": null,
            "twitter_title": null,
            "twitter_description": null,
            "meta_title": null,
            "meta_description": null,
            "codeinjection_head": null,
            "codeinjection_foot": null,
            "canonical_url": null,
            "accent_color": "#3eb8c1",
            "created_at": "2023-10-30 09:01:29",
            "updated_at": "2023-11-03 22:02:16"
        },
        {
            "id": "653f71fb5d18573f9b9f3d79",
            "name": "Science & Technology",
            "slug": "science-technology",
            "description": null,
            "feature_image": "https://images.unsplash.com/photo-1607988795691-3d0147b43231?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMTc3M3wwfDF8c2VhcmNofDU5fHxzY2llbmNlfGVufDB8fHx8MTY5ODkwMjM5OHww&ixlib=rb-4.0.3&q=80&w=2000",
            "parent_id": null,
            "visibility": "public",
            "og_image": null,
            "og_title": null,
            "og_description": null,
            "twitter_image": null,
            "twitter_title": null,
            "twitter_description": null,
            "meta_title": null,
            "meta_description": null,
            "codeinjection_head": null,
            "codeinjection_foot": null,
            "canonical_url": null,
            "accent_color": "#617bff",
            "created_at": "2023-10-30 09:06:03",
            "updated_at": "2023-11-02 05:20:44"
        },
        {
            "id": "653f72d95d18573f9b9f3d91",
            "name": "Internet of Things",
            "slug": "iot",
            "description": null,
            "feature_image": "https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMTc3M3wwfDF8c2VhcmNofDE3fHxlbGVjdHJvbmljc3xlbnwwfHx8fDE2OTg5MDI2MDV8MA&ixlib=rb-4.0.3&q=80&w=2000",
            "parent_id": null,
            "visibility": "public",
            "og_image": null,
            "og_title": null,
            "og_description": null,
            "twitter_image": null,
            "twitter_title": null,
            "twitter_description": null,
            "meta_title": null,
            "meta_description": null,
            "codeinjection_head": null,
            "codeinjection_foot": null,
            "canonical_url": null,
            "accent_color": "#794dcb",
            "created_at": "2023-10-30 09:09:45",
            "updated_at": "2023-11-02 05:26:07"
        },
        {
            "id": "653fc073b14998447e1d37aa",
            "name": "Current Affairs",
            "slug": "current-affairs",
            "description": null,
            "feature_image": null,
            "parent_id": null,
            "visibility": "public",
            "og_image": null,
            "og_title": null,
            "og_description": null,
            "twitter_image": null,
            "twitter_title": null,
            "twitter_description": null,
            "meta_title": null,
            "meta_description": null,
            "codeinjection_head": null,
            "codeinjection_foot": null,
            "canonical_url": null,
            "accent_color": null,
            "created_at": "2023-10-30 14:40:51",
            "updated_at": "2023-10-30 20:32:10"
        },
        {
            "id": "653fc107b14998447e1d37be",
            "name": "Design Facts",
            "slug": "design-facts",
            "description": null,
            "feature_image": "https://images.unsplash.com/photo-1561070791-2526d30994b5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMTc3M3wwfDF8c2VhcmNofDEwfHxkZXNpZ258ZW58MHx8fHwxNjk4OTAyNjYzfDA&ixlib=rb-4.0.3&q=80&w=2000",
            "parent_id": null,
            "visibility": "public",
            "og_image": null,
            "og_title": null,
            "og_description": null,
            "twitter_image": null,
            "twitter_title": null,
            "twitter_description": null,
            "meta_title": null,
            "meta_description": null,
            "codeinjection_head": null,
            "codeinjection_foot": null,
            "canonical_url": null,
            "accent_color": "#78a4dd",
            "created_at": "2023-10-30 14:43:19",
            "updated_at": "2023-11-02 05:24:43"
        },
        {
            "id": "653fc29ab14998447e1d37dd",
            "name": "Web Development",
            "slug": "web-development",
            "description": null,
            "feature_image": "https://images.unsplash.com/photo-1605379399642-870262d3d051?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMTc3M3wwfDF8c2VhcmNofDE1fHx3ZWIlMjBkZXZlbG9wbWVudHxlbnwwfHx8fDE2OTg5MDI5Mjh8MA&ixlib=rb-4.0.3&q=80&w=2000",
            "parent_id": null,
            "visibility": "public",
            "og_image": null,
            "og_title": null,
            "og_description": null,
            "twitter_image": null,
            "twitter_title": null,
            "twitter_description": null,
            "meta_title": null,
            "meta_description": null,
            "codeinjection_head": null,
            "codeinjection_foot": null,
            "canonical_url": null,
            "accent_color": "#8aaf46",
            "created_at": "2023-10-30 14:50:02",
            "updated_at": "2023-11-03 04:20:36"
        },
        {
            "id": "653fca73b14998447e1d37f2",
            "name": "Basic Electronics",
            "slug": "electronics",
            "description": null,
            "feature_image": "https://images.unsplash.com/photo-1565608438257-fac3c27beb36?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMTc3M3wwfDF8c2VhcmNofDJ8fGVsZWN0cmljYWx8ZW58MHx8fHwxNjk4OTAyNjIzfDA&ixlib=rb-4.0.3&q=80&w=2000",
            "parent_id": null,
            "visibility": "public",
            "og_image": null,
            "og_title": null,
            "og_description": null,
            "twitter_image": null,
            "twitter_title": null,
            "twitter_description": null,
            "meta_title": null,
            "meta_description": null,
            "codeinjection_head": null,
            "codeinjection_foot": null,
            "canonical_url": null,
            "accent_color": "#e1aa4c",
            "created_at": "2023-10-30 15:23:31",
            "updated_at": "2023-11-02 05:24:09"
        },
        {
            "id": "6541ec200b27848ad6616f73",
            "name": "History",
            "slug": "history",
            "description": null,
            "feature_image": null,
            "parent_id": null,
            "visibility": "public",
            "og_image": null,
            "og_title": null,
            "og_description": null,
            "twitter_image": null,
            "twitter_title": null,
            "twitter_description": null,
            "meta_title": null,
            "meta_description": null,
            "codeinjection_head": null,
            "codeinjection_foot": null,
            "canonical_url": null,
            "accent_color": "#b81919",
            "created_at": "2023-11-01 06:11:44",
            "updated_at": "2023-11-01 06:11:44"
        },
        {
            "id": "6541ec420b27848ad6616f75",
            "name": "Environment & Society",
            "slug": "environment-society",
            "description": null,
            "feature_image": "https://images.unsplash.com/photo-1421789665209-c9b2a435e3dc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMTc3M3wwfDF8c2VhcmNofDV8fGVudmlyb25tZW50fGVufDB8fHx8MTY5ODkwMjQ4MXww&ixlib=rb-4.0.3&q=80&w=2000",
            "parent_id": null,
            "visibility": "public",
            "og_image": null,
            "og_title": null,
            "og_description": null,
            "twitter_image": null,
            "twitter_title": null,
            "twitter_description": null,
            "meta_title": null,
            "meta_description": null,
            "codeinjection_head": null,
            "codeinjection_foot": null,
            "canonical_url": null,
            "accent_color": "#4ac748",
            "created_at": "2023-11-01 06:12:18",
            "updated_at": "2023-11-02 05:22:09"
        },
        {
            "id": "6541ecb20b27848ad6616f77",
            "name": "Politics",
            "slug": "politics",
            "description": null,
            "feature_image": null,
            "parent_id": null,
            "visibility": "public",
            "og_image": null,
            "og_title": null,
            "og_description": null,
            "twitter_image": null,
            "twitter_title": null,
            "twitter_description": null,
            "meta_title": null,
            "meta_description": null,
            "codeinjection_head": null,
            "codeinjection_foot": null,
            "canonical_url": null,
            "accent_color": "#c77f7f",
            "created_at": "2023-11-01 06:14:10",
            "updated_at": "2023-11-01 06:14:10"
        },
        {
            "id": "6541ed6b0b27848ad6616f79",
            "name": "Education",
            "slug": "education",
            "description": null,
            "feature_image": "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMTc3M3wwfDF8c2VhcmNofDN8fGVkdWNhdGlvbnxlbnwwfHx8fDE2OTk0Mjk3ODJ8MA&ixlib=rb-4.0.3&q=80&w=2000",
            "parent_id": null,
            "visibility": "public",
            "og_image": null,
            "og_title": null,
            "og_description": null,
            "twitter_image": null,
            "twitter_title": null,
            "twitter_description": null,
            "meta_title": null,
            "meta_description": null,
            "codeinjection_head": null,
            "codeinjection_foot": null,
            "canonical_url": null,
            "accent_color": "#8bce27",
            "created_at": "2023-11-01 06:17:15",
            "updated_at": "2023-11-08 07:49:50"
        },
        {
            "id": "6541ee040b27848ad6616f84",
            "name": "Tribal",
            "slug": "tribal",
            "description": null,
            "feature_image": "https://images.unsplash.com/photo-1608501407963-8a036afbb8f2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMTc3M3wwfDF8c2VhcmNofDR8fHRyaWJhbHxlbnwwfHx8fDE2OTg5MDI1NDl8MA&ixlib=rb-4.0.3&q=80&w=2000",
            "parent_id": null,
            "visibility": "public",
            "og_image": null,
            "og_title": null,
            "og_description": null,
            "twitter_image": null,
            "twitter_title": null,
            "twitter_description": null,
            "meta_title": null,
            "meta_description": null,
            "codeinjection_head": null,
            "codeinjection_foot": null,
            "canonical_url": null,
            "accent_color": "#d05249",
            "created_at": "2023-11-01 06:19:48",
            "updated_at": "2023-11-02 05:23:08"
        },
        {
            "id": "6541ee780b27848ad6616f89",
            "name": "Sarcasm",
            "slug": "sarcasm",
            "description": null,
            "feature_image": null,
            "parent_id": null,
            "visibility": "public",
            "og_image": null,
            "og_title": null,
            "og_description": null,
            "twitter_image": null,
            "twitter_title": null,
            "twitter_description": null,
            "meta_title": null,
            "meta_description": null,
            "codeinjection_head": null,
            "codeinjection_foot": null,
            "canonical_url": null,
            "accent_color": "#13c3c0",
            "created_at": "2023-11-01 06:21:44",
            "updated_at": "2023-11-01 06:21:44"
        },
        {
            "id": "654681e50b27848ad66173ac",
            "name": "Literature",
            "slug": "literature",
            "description": null,
            "feature_image": null,
            "parent_id": null,
            "visibility": "public",
            "og_image": null,
            "og_title": null,
            "og_description": null,
            "twitter_image": null,
            "twitter_title": null,
            "twitter_description": null,
            "meta_title": null,
            "meta_description": null,
            "codeinjection_head": null,
            "codeinjection_foot": null,
            "canonical_url": null,
            "accent_color": "#214f08",
            "created_at": "2023-11-04 17:39:49",
            "updated_at": "2023-11-04 17:39:49"
        },
        {
            "id": "654689fa0b27848ad66173ae",
            "name": "Human Rights",
            "slug": "human-rights",
            "description": null,
            "feature_image": null,
            "parent_id": null,
            "visibility": "public",
            "og_image": null,
            "og_title": null,
            "og_description": null,
            "twitter_image": null,
            "twitter_title": null,
            "twitter_description": null,
            "meta_title": null,
            "meta_description": null,
            "codeinjection_head": null,
            "codeinjection_foot": null,
            "canonical_url": null,
            "accent_color": "#e10909",
            "created_at": "2023-11-04 18:14:18",
            "updated_at": "2023-11-04 18:14:42"
        },
        {
            "id": "6558f83d658dec2aef461d7f",
            "name": "Memoir",
            "slug": "memoir",
            "description": null,
            "feature_image": null,
            "parent_id": null,
            "visibility": "public",
            "og_image": null,
            "og_title": null,
            "og_description": null,
            "twitter_image": null,
            "twitter_title": null,
            "twitter_description": null,
            "meta_title": null,
            "meta_description": null,
            "codeinjection_head": null,
            "codeinjection_foot": null,
            "canonical_url": null,
            "accent_color": "#4ab842",
            "created_at": "2023-11-18 17:45:33",
            "updated_at": "2023-11-18 17:45:33"
        },
        {
            "id": "6558f87e658dec2aef461d81",
            "name": "Entrepreneurship",
            "slug": "entrepreneurship",
            "description": null,
            "feature_image": null,
            "parent_id": null,
            "visibility": "public",
            "og_image": null,
            "og_title": null,
            "og_description": null,
            "twitter_image": null,
            "twitter_title": null,
            "twitter_description": null,
            "meta_title": null,
            "meta_description": null,
            "codeinjection_head": null,
            "codeinjection_foot": null,
            "canonical_url": null,
            "accent_color": "#1939d7",
            "created_at": "2023-11-18 17:46:38",
            "updated_at": "2023-11-18 17:46:38"
        },
        {
            "id": "660703029db75aa581ce2f96",
            "name": "Movie",
            "slug": "movie",
            "description": null,
            "feature_image": null,
            "parent_id": null,
            "visibility": "public",
            "og_image": null,
            "og_title": null,
            "og_description": null,
            "twitter_image": null,
            "twitter_title": null,
            "twitter_description": null,
            "meta_title": null,
            "meta_description": null,
            "codeinjection_head": null,
            "codeinjection_foot": null,
            "canonical_url": null,
            "accent_color": "#22b0c3",
            "created_at": "2024-03-29 18:05:54",
            "updated_at": "2024-03-29 18:05:54"
        }
    ];


    await Tags.insertMany(tags).then(() => {
        res.status(200).json({ message: 'Tags added successfully' });
    }).catch((err) => {
        res.status(400).json({ message: err });
    });

})



module.exports = router;