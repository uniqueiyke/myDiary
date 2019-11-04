const router = require('express').Router();
const {checkAuthenticated} = require('../lib/verify-auth');

router.get('/', (req, res, next) => {
    res.render('home');
});

router.get('/wall/:id', checkAuthenticated, (req, res, next) => {
    res.render('users/wall', {title: req.user.firstName});
});

module.exports = router;