const {body, validationResult, sanitize} = require('express-validator');
const bcryptHashedPassword = require('../lib/bcrypt-hash');
// const LocalUser = require('../models/local-user');
// const UserInfo = require('../models/user-info');
const UserModel = require('../lib/user-model-mapping');

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
        const user = await UserModel['local'].findOne({$or: [{email: value}, {username: value}]});
        if (user) {
            console.log(user);
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
            // isUser = await UserInfo.findOne({email: req.body.email});
            // if(isUser){
            //     console.log(isUser);
            //     throw new Error(`You have already have account with this email using ${isUser.provider} authorization.\nYou can login using ${isUser.provider} link provided`)
            // }
            const hashedPW = await bcryptHashedPassword(req.body.password)
            const user = new UserModel['local']({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                username: req.body.username,
                password: hashedPW
            });
      
            await user.save();
            // const userInfo = new UserInfo({
            //     userID: user._id,
            //     email: user.email
                
            // })
            // await userInfo.save();

            req.login({id: user._id, provider: user.provider}, err => {                     
                if (err) { return next(err); }
                //Successful - redirect to new student record.
                res.redirect(`/wall/${user._id}`);
            });
        } catch (error) {
            console.error(error.message);
            res.render('users/registration-form', {title: 'Sign up', errorMessage: error.message});
        }
    }
]
exports.loginUser = (req, res, next) => {
    res.render('users/login-form', {title: 'login'});
}
exports.loginUserPost = (req, res, next) => {
    res.redirect(`/wall/${req.user.id}`);
}

exports.userProfile = async (req, res, next) => {
    //const userInfo = await UserInfo.findById(req.params.id);
    const user = await UserModel[req.user.provider].findById(req.params.id);
    res.render('users/profile', {title: user.firstName, user: user});
}