const router = require('express').Router();
const {checkAuthenticated} = require('../lib/verify-auth');

router.get('/', (req, res, next) => {
    res.render('posts/story');
})

module.exports = router;