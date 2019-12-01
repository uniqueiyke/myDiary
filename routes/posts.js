const router = require('express').Router();
const Post = require('../models/post');
const {checkAuthenticated} = require('../lib/verify-auth');

router.post('/story', checkAuthenticated, async (req, res, next) => {
    const post = new Post({
        title: req.body.title,
        visibility: req.body.visibility,
        body: req.body.story,
        authorID: req.user._id,
        provider: req.user.provider
    })

    await post.save();
    res.redirect(`/wall/${req.user._id}`);
})

router.get('/likes/:id', async (req, res, next) => {
    try {
        const post = await Post.findById(req.params.id);
        if(!post.likesCount){
            post.likesCount = 1;
        }else{
            post.likesCount += 1;
        }
        await post.save();
        res.send(post.likesCount.toString());
    } catch (error) {
        console.log(error.message);
    }
})

module.exports = router;