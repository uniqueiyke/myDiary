const Like = require('../models/likes');
const Comment = require('../models/comments');
const reducePosts = require('../lib/reduce-posts');

exports.home = async (req, res, next) => {
    const posts = await Post.find({}, null, {sort: { createdDate : 'desc' }}).populate('likes').populate('comments').exec();
    let publicPost = reducePosts(posts, req);
    res.render('home', {title: "Home", posts: publicPost});
}

exports.wall = async (req, res, next) => {
    const posts = await Post.find({}, null, {sort: { createdDate : 'desc' }}).populate('likes').populate('comments').exec();    
    let publicPost = posts.reduce((acc, curr) => {
        if(curr.authorID.toString() === req.user._id.toString()){
            acc.push(curr);
        }
        return acc; 
    }, []);
    res.render('users/wall', {title: req.user.firstName, posts: publicPost});
}