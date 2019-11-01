const {Schema, model} = require('mongoose');
const transformFunc = require('./transformation-functions');
const bcrypt = require('bcrypt');

const UserInfoSchema = new Schema({
    userID: Schema.Types.ObjectId,
    email: String,
    provider: {type: String, require: true, default: 'local'}
});

module.exports = model('UserInfo', UserInfoSchema);

//clientID: 152865784250-5n7mh12cccf7ssbirga0v1d43viu5fhd.apps.googleusercontent.com
//clientSecret: XiPj3J-9kZTFhl__d91HwIR5
