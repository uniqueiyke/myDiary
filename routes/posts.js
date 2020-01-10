const router = require('express').Router();
const PostController = require('../controllers/posts-controller');
const {checkAuthenticated, checkAuthenticatedAjax} = require('../lib/verify-auth');

router.post('/story', checkAuthenticated, PostController.storyPost)

router.get('/likes/:id', checkAuthenticatedAjax, PostController.likeStory)

router.post('/comments/:id', checkAuthenticatedAjax, PostController.commentOnStory)

module.exports = router;