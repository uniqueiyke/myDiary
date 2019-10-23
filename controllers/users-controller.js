const User = require('../models/user');
const {body, validationResult, sanitize} = require('express-validator');
const bcryptHashedPassword = require('../lib/bcrypt-hash')
// const passport = require('passport');

exports.registerUser = (req, res, next) => {
    res.render('users/registration-form', {title: 'Sign up'});
}
exports.createUser = [
    // Validate fields.
    body('first_name').isLength({ min: 3 }).trim().withMessage('First name must be specified.')
    .isAlphanumeric().withMessage('First name has non-alphanumeric characters.').escape(),
    body('last_name').isLength({ min: 3 }).trim().withMessage('Surname must be specified.')
        .isAlphanumeric().withMessage('Surname has non-alphanumeric characters.').escape(),
    body('email').isEmail().normalizeEmail(),
    //checking if e-mail or username is in use
    body('email').custom(async value => {
        const user = await User.findOne({$or: [{email: value}, {username: value}]});
        if (user) {
            if(user.email === value)
                return new Error('E-mail already use by another user');
            else    return new Error('username already use by another user'); 
        }
      }),
      //checking if password confirmation matches password
      body('confirmPassword').custom((value) => {
        if (value !== req.body.password) {
            return new Error('Password confirmation does not match password');
        }
            // Indicates the success of this synchronous custom validator
            return true;
      }),
      async function(req, res, next) {
        try {
          const hashedPW = await bcryptHashedPassword(req.body.password)
          const user = new User({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            username: req.body.username,
            password: hashedPW
          });
      
        await user.save();
        
        req.login(user._id, err => {                     
            if (err) { return next(err); }
            //Successful - redirect to new student record.
            res.redirect(`/users/profile/${user._id}`);
        });
        } catch (error) {
          res.redirect('/users/registration');
        }
      }
]
exports.loginUser = (req, res, next) => {
    res.render('users/login-form', {title: 'login'});
}
exports.loginUserPost = (req, res, next) => {
    res.redirect(`/users/profile/${req.user._id}`);
}

exports.userProfile = async (req, res, next) => {
    const user = await User.findById(req.params.id);
    res.render('users/profile', {title:user.firstName, user: user});
}