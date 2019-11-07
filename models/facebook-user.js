const {Schema, model} = require('mongoose');

const FacebookUserSchema = new Schema({
    facebookID: String,
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

FacebookUserSchema.virtual('name').get(function () {
    return `${this.firstName} ${this.lastName}`;
});

module.exports = model('FacebookUser', FacebookUserSchema);

