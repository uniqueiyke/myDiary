const {Schema, model} = require('mongoose');
const transformFunc = require('./transformation-functions');
const bcrypt = require('bcrypt');

const LocalUserSchema = new Schema({
    firstName: {type: String, require: true, minlength: 3, maxlength: 25, trim: true, set: transformFunc.capitalizeFirstLetter},
    lastName: {type: String, require: true, minlength: 3, maxlength: 25, trim: true, set: transformFunc.capitalizeFirstLetter},
    middleName: {type: String, minlength: 0, maxlength: 25, trim: true, set: transformFunc.capitalizeFirstLetter},
    gender: {type: String, lowercase: true, enum: ['male', 'female'], require: true},
    dateOfBirth: Date,
    dateOfReg: {type: Date, default: Date.now()},
    email: {type: String, require: true, index: {unique: true}},
    password: {type: String, require: true},
    username: String,
    phoneNumber: {type: String},
    provider: {type: String, default: 'local'},
    photo: Buffer,
    photoType: String
})
LocalUserSchema.virtual('name').get(function () {
    return `${this.firstName} ${this.lastName}`;
})
LocalUserSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
}

LocalUserSchema.virtual('photoPath').get(function () { 
    if(this.photo !== null && this.photoType !== null){
        return `data:${this.photoType};charset=utf-8;base64,${this.photo.toString('base64')}`
    }
 })
module.exports = model('LocalUser', LocalUserSchema);

