const {Schema, model} = require('mongoose');

const TwitterUserSchema = new Schema({
    twitterID: String,
    firstName: String,
    lastName: String,
    middleName: String,
    gender: String,
    dateOfBirth: Date,
    dateOfReg: {type: Date, default: Date.now()},
    email: String,
    username: String,
    phoneNumber: {type: String},
    photoPath: String,
    provider: String
})

TwitterUserSchema.virtual('name').get(function () {
    return `${this.firstName} ${this.lastName}`;
});

module.exports = model('TwitterUser', TwitterUserSchema);
