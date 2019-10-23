const {Schema, model} = require('mongoose');
const transformFunc = require('./transformation-functions');
const bcrypt = require('bcrypt');

const UserSchema = new Schema({
    firstName: {type: String, require: true, minlength: 3, maxlength: 25, trim: true, set: transformFunc.capitalizeFirstLetter},
    lastName: {type: String, require: true, minlength: 3, maxlength: 25, trim: true, set: transformFunc.capitalizeFirstLetter},
    middleName: {type: String, minlength: 0, maxlength: 25, trim: true, set: transformFunc.capitalizeFirstLetter},
    gender: {type: String, lowercase: true, enum: ['male', 'female'], require: true},
    dateOfBirth: Date,
    dateOfReg: {type: Date, default: Date.now()},
    email: {type: String, require: true, index: {unique: true}},
    password: {type: String, require: true},
    username: {type: String, index: {unique: true}},
    phoneNumber: {type: String},
})
UserSchema.virtual('name').get(function () {
    return `${this.firstName} ${this.lastName}`;
})
UserSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
}
module.exports = model('User', UserSchema);

//clientID: 152865784250-5n7mh12cccf7ssbirga0v1d43viu5fhd.apps.googleusercontent.com
//clientSecret: XiPj3J-9kZTFhl__d91HwIR5
