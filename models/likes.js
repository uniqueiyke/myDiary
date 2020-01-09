const {Schema, model} = require('mongoose');

const LikeSchema = new Schema({
    postID: {type: Schema.Types.ObjectId, ref: 'Post'},
    userID: Schema.Types.ObjectId
});

// LikeSchema.virtual('likes').get(function () {
//     return `/posts/likes/${this._id}`;
// })

module.exports = model('Like', LikeSchema);