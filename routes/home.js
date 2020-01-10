const router = require('express').Router();
const {checkAuthenticated} = require('../lib/verify-auth');
const HomeController = require('../controllers/home-controller');

router.get('/', HomeController.home);

router.get('/wall/:id', checkAuthenticated, HomeController.wall);

module.exports = router;