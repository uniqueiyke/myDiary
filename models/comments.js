const {Schema, model} = require('mongoose');

const CommentSchema = new Schema({
    postID: {type: Schema.Types.ObjectId, ref: 'Post'},
    commentedBy: {
        id: Schema.Types.ObjectId,
        name: String
    },
    comment: String, 
    date: {type: Date, default: Date.now()} 
});

module.exports = model('Comment', CommentSchema);