const {Schema, model} = require('mongoose');
const transformFunc = require('./transformation-functions');

const UserSchema = new Schema({
    firstName: {type: String, require: true, minlength: 3, maxlength: 25, trim: true, set: transformFunc.capitalizeFirstLetter},
    lastName: {type: String, require: true, minlength: 3, maxlength: 25, trim: true, set: transformFunc.capitalizeFirstLetter},
    middleName: {type: String, minlength: 0, maxlength: 25, trim: true, set: transformFunc.capitalizeFirstLetter},
    gender: {type: String, lowercase: true, enum: ['male', 'female'], require: true},
    dateOfBirth: Date,
    dateOfReg: {type: Date, default: Date.now()},
    email: {type: String, require: true},
    password: {type: String, require: true},
    username: {type: String},
    phoneNumber: {type: String},
})

module.exports = model('User', UserSchema);