
const express = require('express');
const router = express.Router();


// const auth = require('./auth');
const v1 = require('./api/v1');
// const v2 = require('./api/v2');


// router.use('/auth', auth);
router.use('/api/v1', v1);
// router.use('/api/v2', v2);


router.get('/', (req, res) => {
    res.json({
        status: 200,
        message: 'API is working properly'
    });
});


module.exports = router;