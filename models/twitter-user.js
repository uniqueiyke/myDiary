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
    username: {type: String, index: {unique: true}},
    phoneNumber: {type: String},
    photoPath: String,
    provider: String
})

TwitterUserSchema.virtual('name').get(function () {
    return `${this.firstName} ${this.lastName}`;
});

module.exports = model('TwitterUser', TwitterUserSchema);

//clientID: 152865784250-5n7mh12cccf7ssbirga0v1d43viu5fhd.apps.Twitterusercontent.com
//clientSecret: XiPj3J-9kZTFhl__d91HwIR5
