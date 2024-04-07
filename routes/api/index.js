
const express = require('express');
const router = express.Router();

const postsRouter = require('./posts');
const usersRouter = require('./users');
const tagsRouter = require('./tags');
const postsTagsRouter = require('./posts_tags');
const postsAuthorsRouter = require('./posts_authors');
const postsMetaRouter = require('./posts_meta');



router.use('/posts', postsRouter);
router.use('/authors', usersRouter);
router.use('/tags', tagsRouter);
router.use('/posts_tags', postsTagsRouter);
router.use('/posts_authors', postsAuthorsRouter);
router.use('/posts_meta', postsMetaRouter);


module.exports = router;
