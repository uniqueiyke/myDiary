const {Schema, model} = require('mongoose');
const transformFunc = require('./transformation-functions');
const bcrypt = require('bcrypt');

const UserSchema = new Schema({
    userID: Schema.Types.ObjectId,
    email: String,
    provider: {type: String, require: true},
});

UserSchema.virtual('name').get(function () {
    return `${this.firstName} ${this.lastName}`;
});

UserSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
}
module.exports = model('User', UserSchema);

//clientID: 152865784250-5n7mh12cccf7ssbirga0v1d43viu5fhd.apps.googleusercontent.com
//clientSecret: XiPj3J-9kZTFhl__d91HwIR5
