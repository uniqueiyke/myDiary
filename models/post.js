const {Schema, model} = require('mongoose');
const transformFunc = require('./transformation-functions');
const bcrypt = require('bcrypt');

const UserInfoSchema = new Schema({
    authorID: Schema.Types.ObjectId,
    provider: {type: String, default: 'local'},
    title: String,
    body: String,
    createdDate: {type: Date, default: Date.now()},
    editedDate: [Date],
    visibility: {type: String, lowercase: true, enum: ['private', 'public'], default: 'private'},
    comments: [
        {
            commentedBy: Schema.Types.ObjectId,
            body: String, 
            date: Date 
        }],
    likesCount: {type: Number}
});

UserInfoSchema.virtual('likes').get(function () {
    return `/posts/likes/${this._id}`;
})

module.exports = model('UserInfo', UserInfoSchema);