const router = require('express').Router();
const Post = require('../models/post');
const Like = require('../models/likes');
const Comment = require('../models/comments');
const {checkAuthenticated, checkAuthenticatedAjax} = require('../lib/verify-auth');

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

router.get('/likes/:id', checkAuthenticatedAjax, async (req, res, next) => {
    try {
        const like = await Like.findOne({userID: req.user._id, postID: req.params.id});
        if(!like){
            const newLike = new Like({
                userID: req.user._id,
                postID: req.params.id
            })
            await newLike.save();
            const story = await Post.findById(req.params.id);
            story.likes.push(newLike._id);
            await story.save();
        }else{
            await Like.deleteOne({userID: req.user._id, postID: req.params.id});
            const story = await Post.findById(req.params.id);
            story.likes.pop(like._id);
            await story.save();
        }
        const likes = await Like.find({postID: req.params.id});
        console.log(likes);
        res.send(likes.length.toString());
    } catch (error) {
        console.log(error.message);
    }
})

router.post('/comments/:id', checkAuthenticatedAjax, async (req, res, next) => {
    try {
        // const comments = await Comment.findOne({userID: req.user._id});
        const comment = new Comment({
            commentedBy: {
                id: req.user._id,
                name: req.user.name
            },
            postID: req.params.id,
            comment: req.body.comment
        })
        await comment.save();
        const story = await Post.findById(req.params.id);
        story.comments.push(comment._id);
        await story.save();
        //const commentsFound = await Comment.find({postID: req.params.id});
        res.json(comment);
    } catch (error) {
        console.log(error.message);
    }

})

module.exports = router;