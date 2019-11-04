const {Schema, model} = require('mongoose');
const transformFunc = require('./transformation-functions');
const bcrypt = require('bcrypt');

const UserInfoSchema = new Schema({
    author: Schema.Types.ObjectId,
    provider: {type: String, require: true, default: 'local'},
    title: String,
    body: String,
    createdDate: {type: Date, default: Date.now()},
    editedDate: [Date],
    accessebility: {type: String, lowercase: true, enum: ['private', 'public'], default: 'private'},
    comments: [
        {
            commentedBy: Schema.Types.ObjectId,
            body: String, 
            date: Date 
        }],
});

module.exports = model('UserInfo', UserInfoSchema);

//clientID: 152865784250-5n7mh12cccf7ssbirga0v1d43viu5fhd.apps.googleusercontent.com
//clientSecret: XiPj3J-9kZTFhl__d91HwIR5
