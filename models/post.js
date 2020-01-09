const {Schema, model} = require('mongoose');
// const transformFunc = require('./transformation-functions');
// const bcrypt = require('bcrypt');

const PostSchema = new Schema({
    authorID: Schema.Types.ObjectId,
    provider: {type: String, default: 'local'},
    title: String,
    body: String,
    createdDate: {type: Date, default: Date.now()},
    editedDate: [Date],
    visibility: {type: String, lowercase: true, enum: ['private', 'public'], default: 'private'},
    comments: [{type: Schema.Types.ObjectId, ref: 'Comment'}],
    likes: [{type: Schema.Types.ObjectId, ref: 'Like'}]
});

PostSchema.virtual('like').get(function () {
    return `/posts/likes/${this._id}`;
});

PostSchema.virtual('comment').get(function () {
    return `/posts/comments/${this._id}`;
});

module.exports = model('Post', PostSchema);