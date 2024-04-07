
const express = require('express');
const router = express.Router();

const Users = require('../../models/users');
const Posts = require('../../models/posts');
const Tags = require('../../models/tags');
const PostsTags = require('../../models/posts_tags');
const PostsAuthors = require('../../models/posts_authors');
const PostsMeta = require('../../models/posts_meta');

const verifyToken = require('../../middleware/authentication');
const e = require('express');



/**
 * @route   GET /api/v1/users
 * @desc    Get all users with pagination
 * @access  Public
 * @params  page, limit, search
 * @return  message, data
 * @error   400, { error }
 * @status  200, 400
 * 
 * @example /api/v1/users?page=1&limit=10&search=role
**/

router.get('/', async (req, res) => {

    let page = parseInt(req.query.page) || 1;
    let limit = parseInt(req.query.limit) || 10;
    let search = req.query.search || null;

    let query = {};
    if (search) {
        query = { $text: { $search: search } };
    }

    let totalUsers = await Users.countDocuments(query)
        .catch(err => {
            res.status(400).json({
                status: 400,
                message: 'Error retrieving users',
                error: err
            });
        });

    let users = await Users.find(query)
        .skip((page - 1) * limit)
        .limit(limit)
        .catch(err => {
            res.status(400).json({
                status: 400,
                message: 'Error retrieving users',
                error: err
            });
        });

    res.status(200).json({
        status: 200,
        message: 'Users retrieved successfully',
        data: {
            users: users,
            meta: {
                page: page,
                limit: limit,
                pages: Math.ceil(totalUsers / limit),
                total: totalUsers,
                search: search
            }
        }
    });

});





/**
 * @route   GET /api/v1/author/:slug
 * @desc    Get author posts by slug
 * @access  Public
 * @params  slug
 * @return  message, data
 * @error   400, { error }
 * @status  200, 400
 * 
 * @example /api/v1/author/arjun
**/

router.get('/:slug', async (req, res) => {

    let slug = req.params.slug;

    await Users.findOne({ slug: slug })
        .then(async user => {
            
            await PostsAuthors.find({ author_id: user.id })
                .then(async postsAuthors => {
                    
                    let posts = [];
                    for (let i = 0; i < postsAuthors.length; i++) {
                        let post = await Posts.findOne({ id: postsAuthors[i].post_id });
                        posts.push(post);
                    }

                    res.status(200).json({
                        status: 200,
                        message: 'Posts retrieved successfully',
                        data: {
                            user: {
                                id: user.id,
                                name: user.name,
                                slug: user.slug,
                                email: user.email,
                                profile_image: user.profile_image,
                                cover_image: user.cover_image,
                                bio: user.bio,
                                website: user.website,
                                location: user.location,
                                facebook: user.facebook,
                                twitter: user.twitter
                            },
                            posts: {
                                total: posts.length,
                                posts: [
                                    ...posts.map(post => ({
                                        id: post.id,
                                        uuid: post.uuid,
                                        title: post.title,
                                        slug: post.slug,
                                        feature_image: post.feature_image,
                                        featured: post.featured,
                                        type: post.type,
                                        status: post.status,
                                        visibility: post.visibility,
                                        created_at: post.created_at,
                                        updated_at: post.updated_at,
                                        published_at: post.published_at,
                                        custom_excerpt: post.custom_excerpt
                    
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
                message: 'Error retrieving user',
                error: err
            });
        });

});





router.post('/seed', async (req, res) => {

    let users = [
        {
            "id": "1",
            "name": "Inovus Labs IEDC",
            "slug": "inovuslabs",
            "password": "$2a$10$cuna6YfOYLTMEn13uQStHewKTG3T4K7IFt2tolZilmb4PXeeBYTpO",
            "email": "inovuslabs@kjcmt.ac.in",
            "profile_image": "__GHOST_URL__/content/images/2023/10/Inovus_Logo-PNG-3.png",
            "cover_image": "__GHOST_URL__/content/images/2023/12/0.jpg",
            "bio": null,
            "website": "https://inovuslabs.org/",
            "location": null,
            "facebook": null,
            "twitter": "@InovusLabs",
            "accessibility": "{\"nightShift\":true,\"whatsNew\":{\"lastSeenDate\":\"2023-11-16T14:34:12.000+00:00\"},\"navigation\":{\"expanded\":{\"posts\":true}}}",
            "status": "active",
            "locale": null,
            "visibility": "public",
            "meta_title": null,
            "meta_description": null,
            "tour": null,
            "last_seen": "2024-04-04 20:07:35",
            "comment_notifications": 1,
            "free_member_signup_notification": 1,
            "paid_subscription_started_notification": 1,
            "paid_subscription_canceled_notification": 0,
            "mention_notifications": 1,
            "recommendation_notifications": 1,
            "milestone_notifications": 1,
            "donation_notifications": 1,
            "created_at": "2023-10-30 08:21:13",
            "updated_at": "2024-04-04 20:07:35"
        },
        {
            "id": "653f7a27b14998447e1d36d5",
            "name": "Arjun Krishna",
            "slug": "arjun",
            "password": "$2a$10$Etvi1hKbL39RkZGmtzQkWeI7J1aaz.c8sI7gXKJPylIKmk4VWRPSq",
            "email": "arjun12345krishna@gmail.com",
            "profile_image": "https://www.gravatar.com/avatar/dd27406b884ca7ede3e5364c3dd6326c?s=250&r=x&d=mp",
            "cover_image": "__GHOST_URL__/content/images/2023/10/image-7.png",
            "bio": "Yet another human being born towards the end of the 20th century, and continues his Exploration & Experimentation on the Technology that the 21st century has to offer.",
            "website": "https://arjunkrishna.in/",
            "location": "Pathanamthitta | Bangalore",
            "facebook": null,
            "twitter": "@Decoded_Cipher",
            "accessibility": "{\"nightShift\":true,\"whatsNew\":{\"lastSeenDate\":\"2023-11-01T13:04:39.000+00:00\"}}",
            "status": "active",
            "locale": null,
            "visibility": "public",
            "meta_title": null,
            "meta_description": null,
            "tour": null,
            "last_seen": "2024-03-26 07:16:42",
            "comment_notifications": 1,
            "free_member_signup_notification": 1,
            "paid_subscription_started_notification": 1,
            "paid_subscription_canceled_notification": 0,
            "mention_notifications": 1,
            "recommendation_notifications": 1,
            "milestone_notifications": 1,
            "donation_notifications": 1,
            "created_at": "2023-10-30 09:40:55",
            "updated_at": "2024-03-26 07:16:42"
        },
        {
            "id": "65409075b14998447e1d393f",
            "name": "Nikhil T Das",
            "slug": "nikhil",
            "password": "$2a$10$kKRkK2RJrDvM8aWbKMdGgORqIcri8PYYZYaWW7xNwnHsudA6wR.Cy",
            "email": "nikhiltd05@gmail.com",
            "profile_image": "__GHOST_URL__/content/images/2023/10/da34f272-a6e1-4f6f-8414-79147fce3b5d.jpg",
            "cover_image": null,
            "bio": null,
            "website": null,
            "location": null,
            "facebook": null,
            "twitter": null,
            "accessibility": "{\"nightShift\":true}",
            "status": "active",
            "locale": null,
            "visibility": "public",
            "meta_title": null,
            "meta_description": null,
            "tour": null,
            "last_seen": "2024-04-04 18:14:43",
            "comment_notifications": 1,
            "free_member_signup_notification": 1,
            "paid_subscription_started_notification": 1,
            "paid_subscription_canceled_notification": 0,
            "mention_notifications": 1,
            "recommendation_notifications": 1,
            "milestone_notifications": 1,
            "donation_notifications": 1,
            "created_at": "2023-10-31 05:28:21",
            "updated_at": "2024-04-04 18:14:43"
        },
        {
            "id": "6540988cb14998447e1d3946",
            "name": "Badhusha Shaji",
            "slug": "badhusha",
            "password": "$2a$10$8s1aCnQIv7IOg9UruyVYku98ufqeQZjvdGgsi9do2qGBCrvGvG5Qi",
            "email": "badhusha.shaji22@gmail.com",
            "profile_image": "__GHOST_URL__/content/images/2023/11/159407.jpg",
            "cover_image": "__GHOST_URL__/content/images/2023/11/sukuna-mobile-3840-x-2160-9r69kpp8t3ensitv.jpg",
            "bio": null,
            "website": null,
            "location": null,
            "facebook": null,
            "twitter": null,
            "accessibility": null,
            "status": "active",
            "locale": null,
            "visibility": "public",
            "meta_title": null,
            "meta_description": null,
            "tour": null,
            "last_seen": "2024-01-27 11:27:44",
            "comment_notifications": 1,
            "free_member_signup_notification": 1,
            "paid_subscription_started_notification": 1,
            "paid_subscription_canceled_notification": 0,
            "mention_notifications": 1,
            "recommendation_notifications": 1,
            "milestone_notifications": 1,
            "donation_notifications": 1,
            "created_at": "2023-10-31 06:02:52",
            "updated_at": "2024-01-27 11:27:44"
        },
        {
            "id": "6540bc590b27848ad6616f50",
            "name": "Arjun A Acharry",
            "slug": "arjun-a-acharry",
            "password": "$2a$10$b7mRENs/0ZrIekJcPGTFluq5XmCC5mFe/Gf6BsvffEnW9pPpV/X5q",
            "email": "arjunaacharry007@gmail.com",
            "profile_image": "__GHOST_URL__/content/images/2023/10/_MG_2998---Copy.JPG",
            "cover_image": "__GHOST_URL__/content/images/2024/01/Instagram-post---4.png",
            "bio": null,
            "website": null,
            "location": null,
            "facebook": null,
            "twitter": null,
            "accessibility": "{\"nightShift\":true,\"whatsNew\":{\"lastSeenDate\":\"2023-11-16T14:34:12.000+00:00\"},\"navigation\":{\"expanded\":{\"posts\":true}}}",
            "status": "active",
            "locale": null,
            "visibility": "public",
            "meta_title": null,
            "meta_description": null,
            "tour": null,
            "last_seen": "2024-04-04 15:56:29",
            "comment_notifications": 1,
            "free_member_signup_notification": 1,
            "paid_subscription_started_notification": 1,
            "paid_subscription_canceled_notification": 0,
            "mention_notifications": 1,
            "recommendation_notifications": 1,
            "milestone_notifications": 1,
            "donation_notifications": 1,
            "created_at": "2023-10-31 08:35:37",
            "updated_at": "2024-04-04 15:56:29"
        },
        {
            "id": "6543781f0b27848ad6617038",
            "name": "Milan Sony",
            "slug": "milan",
            "password": "$2a$10$m5EVbfnPtP2IA4X3jSToYOUmcPCIohoRaewe8tBVp108T8DPGiyW6",
            "email": "milansonyofficial@gmail.com",
            "profile_image": null,
            "cover_image": null,
            "bio": null,
            "website": null,
            "location": null,
            "facebook": null,
            "twitter": null,
            "accessibility": "{\"nightShift\":true}",
            "status": "active",
            "locale": null,
            "visibility": "public",
            "meta_title": null,
            "meta_description": null,
            "tour": null,
            "last_seen": "2023-12-19 14:03:05",
            "comment_notifications": 1,
            "free_member_signup_notification": 1,
            "paid_subscription_started_notification": 1,
            "paid_subscription_canceled_notification": 0,
            "mention_notifications": 1,
            "recommendation_notifications": 1,
            "milestone_notifications": 1,
            "donation_notifications": 1,
            "created_at": "2023-11-02 10:21:19",
            "updated_at": "2023-12-19 14:03:05"
        },
        {
            "id": "654666da0b27848ad66173a9",
            "name": "Abhishek V Gopal",
            "slug": "abhishek",
            "password": "$2a$10$1/drFoVYITeqQWeQVWBhDeIVW4bAugrMJuxxCkJy.GkdCAE02idju",
            "email": "abhishekvgopal3@gmail.com",
            "profile_image": "__GHOST_URL__/content/images/2023/12/abhi.jpg",
            "cover_image": null,
            "bio": null,
            "website": null,
            "location": null,
            "facebook": null,
            "twitter": null,
            "accessibility": null,
            "status": "active",
            "locale": null,
            "visibility": "public",
            "meta_title": null,
            "meta_description": null,
            "tour": null,
            "last_seen": "2024-03-26 09:19:42",
            "comment_notifications": 1,
            "free_member_signup_notification": 1,
            "paid_subscription_started_notification": 1,
            "paid_subscription_canceled_notification": 0,
            "mention_notifications": 1,
            "recommendation_notifications": 1,
            "milestone_notifications": 1,
            "donation_notifications": 1,
            "created_at": "2023-11-04 15:44:26",
            "updated_at": "2024-03-26 09:19:42"
        },
        {
            "id": "654cb82cd6af5204882b104e",
            "name": "Athena Maria Vadakan",
            "slug": "athena",
            "password": "$2a$10$6lkPaRE/WdY0AC8FzL2wwOJ4QOKEC/EUBOpm/POT7jsmldoBtk5bi",
            "email": "minervaashkings@gmail.com",
            "profile_image": null,
            "cover_image": null,
            "bio": null,
            "website": null,
            "location": null,
            "facebook": null,
            "twitter": null,
            "accessibility": "{\"nightShift\":true}",
            "status": "active",
            "locale": null,
            "visibility": "public",
            "meta_title": null,
            "meta_description": null,
            "tour": null,
            "last_seen": "2024-03-31 15:12:23",
            "comment_notifications": 1,
            "free_member_signup_notification": 1,
            "paid_subscription_started_notification": 1,
            "paid_subscription_canceled_notification": 0,
            "mention_notifications": 1,
            "recommendation_notifications": 1,
            "milestone_notifications": 1,
            "donation_notifications": 1,
            "created_at": "2023-11-09 10:45:00",
            "updated_at": "2024-03-31 15:12:23"
        },
        {
            "id": "65715b9fda4a454504859902",
            "name": "Indhuchoodan R",
            "slug": "indhuchoodan",
            "password": "$2a$10$Dw6HadR5GZYdmLHyG.2a4./Qu.5UauxcGff4T3DeQudIKRbcg5YJG",
            "email": "kuttichattan.inovus@gmail.com",
            "profile_image": "__GHOST_URL__/content/images/2023/12/photo_2023-02-12_23-57-25.jpg",
            "cover_image": null,
            "bio": null,
            "website": null,
            "location": null,
            "facebook": null,
            "twitter": null,
            "accessibility": null,
            "status": "active",
            "locale": null,
            "visibility": "public",
            "meta_title": null,
            "meta_description": null,
            "tour": null,
            "last_seen": "2023-12-07 05:44:00",
            "comment_notifications": 0,
            "free_member_signup_notification": 1,
            "paid_subscription_started_notification": 1,
            "paid_subscription_canceled_notification": 0,
            "mention_notifications": 1,
            "recommendation_notifications": 1,
            "milestone_notifications": 1,
            "donation_notifications": 1,
            "created_at": "2023-12-07 05:43:59",
            "updated_at": "2023-12-07 05:48:37"
        },
        {
            "id": "65715d59da4a454504859916",
            "name": "Joseph Mathai Pathil",
            "slug": "joseph",
            "password": "$2a$10$BFTy3V1.zbSruWmcIDKs3evTnYyNTmz4gBzrnAR/pua3CjGrsTjPC",
            "email": "kuttichattan.inovus.02@gmail.com",
            "profile_image": "__GHOST_URL__/content/images/2023/12/josephmathai10.jpg",
            "cover_image": null,
            "bio": null,
            "website": null,
            "location": null,
            "facebook": null,
            "twitter": null,
            "accessibility": null,
            "status": "active",
            "locale": null,
            "visibility": "public",
            "meta_title": null,
            "meta_description": null,
            "tour": null,
            "last_seen": "2023-12-07 05:51:22",
            "comment_notifications": 1,
            "free_member_signup_notification": 1,
            "paid_subscription_started_notification": 1,
            "paid_subscription_canceled_notification": 0,
            "mention_notifications": 1,
            "recommendation_notifications": 1,
            "milestone_notifications": 1,
            "donation_notifications": 1,
            "created_at": "2023-12-07 05:51:21",
            "updated_at": "2023-12-07 05:52:16"
        },
        {
            "id": "65715f4dda4a454504859925",
            "name": "Jeevan Joseph",
            "slug": "jeevan",
            "password": "$2a$10$5WRsXLPltDfUWaknbdBqcu94fCAyNNYYjG14JQKV/8vDjusYJUTti",
            "email": "pwa.whatsapp@gmail.com",
            "profile_image": "__GHOST_URL__/content/images/2023/12/135457348-ae6bf41e-2490-4a71-88aa-0bb2b252b66a--1-.jpg",
            "cover_image": null,
            "bio": null,
            "website": null,
            "location": null,
            "facebook": null,
            "twitter": null,
            "accessibility": null,
            "status": "active",
            "locale": null,
            "visibility": "public",
            "meta_title": null,
            "meta_description": null,
            "tour": null,
            "last_seen": "2024-01-28 16:45:12",
            "comment_notifications": 1,
            "free_member_signup_notification": 1,
            "paid_subscription_started_notification": 1,
            "paid_subscription_canceled_notification": 0,
            "mention_notifications": 1,
            "recommendation_notifications": 1,
            "milestone_notifications": 1,
            "donation_notifications": 1,
            "created_at": "2023-12-07 05:59:41",
            "updated_at": "2024-01-28 16:45:12"
        },
        {
            "id": "65d36b3914e9499dedf51a47",
            "name": "Unnikrishanan m",
            "slug": "unnikrishanan",
            "password": "$2a$10$ng2xtfSugN9WUIaKmZiJHeNePLfWKobt6y85QA9uvJVzHS/M/Ot3K",
            "email": "unnikrishananm17803@gmail.com",
            "profile_image": null,
            "cover_image": null,
            "bio": null,
            "website": null,
            "location": null,
            "facebook": null,
            "twitter": null,
            "accessibility": null,
            "status": "active",
            "locale": null,
            "visibility": "public",
            "meta_title": null,
            "meta_description": null,
            "tour": null,
            "last_seen": "2024-02-19 14:52:43",
            "comment_notifications": 1,
            "free_member_signup_notification": 1,
            "paid_subscription_started_notification": 1,
            "paid_subscription_canceled_notification": 0,
            "mention_notifications": 1,
            "recommendation_notifications": 1,
            "milestone_notifications": 1,
            "donation_notifications": 1,
            "created_at": "2024-02-19 14:52:41",
            "updated_at": "2024-02-19 14:52:43"
        },
        {
            "id": "6601835e0b1a340478678d31",
            "name": "Anupama Teresa Sebastian",
            "slug": "anupama",
            "password": "$2a$10$Tba0lhyG1.KFHbO1MHDiEOwhO1f5rEL/AqoBcDv/vkGgGzNLU2ZT2",
            "email": "anupamateresasebastian@gmail.com",
            "profile_image": null,
            "cover_image": null,
            "bio": null,
            "website": null,
            "location": null,
            "facebook": null,
            "twitter": null,
            "accessibility": null,
            "status": "active",
            "locale": null,
            "visibility": "public",
            "meta_title": null,
            "meta_description": null,
            "tour": null,
            "last_seen": "2024-04-04 16:20:41",
            "comment_notifications": 1,
            "free_member_signup_notification": 1,
            "paid_subscription_started_notification": 1,
            "paid_subscription_canceled_notification": 0,
            "mention_notifications": 1,
            "recommendation_notifications": 1,
            "milestone_notifications": 1,
            "donation_notifications": 1,
            "created_at": "2024-03-25 13:59:58",
            "updated_at": "2024-04-04 16:20:41"
        }
    ];


    await Users.insertMany(users).then(() => {
        res.status(200).json({ message: 'Users added successfully' });
    }).catch((err) => {
        res.status(400).json({ message: err });
    });

})



module.exports = router;