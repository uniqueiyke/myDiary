const User = require('../models/user');

exports.registerUser = (req, res, next) => {
    res.render('users/registration-form');
}
exports.createUser = (req, res, next) => {
    res.json(req.body);
}