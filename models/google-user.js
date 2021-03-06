const {Schema, model} = require('mongoose');

const GoogleUserSchema = new Schema({
    googleID: String,
    firstName: String,
    lastName: String,
    middleName: String,
    gender: String,
    dateOfBirth: Date,
    dateOfReg: {type: Date, default: Date.now()},
    email: String,
    username: {type: String, index: {unique: true}},
    phoneNumber: {type: String},
    photoPath: String,
    provider: String
})

GoogleUserSchema.virtual('name').get(function () {
    return `${this.firstName} ${this.lastName}`;
});

module.exports = model('GoogleUser', GoogleUserSchema);

