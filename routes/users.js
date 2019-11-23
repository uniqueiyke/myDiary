const router = require('express').Router();
const usersController = require('../controllers/users-controller');
const passport = require('passport');
const {checkAuthenticated, checkNotAuthenticated} = require('../lib/verify-auth');

router.get('/registration', checkNotAuthenticated, usersController.registerUser);

router.post('/registration', usersController.createUser);

router.get('/login', checkNotAuthenticated, usersController.loginUser);

router.post('/login', passport.authenticate('local'), usersController.loginUserPost);

router.get('/profile/:id', checkAuthenticated,  usersController.userProfile);

router.post('/update-profile-pics/:id', checkAuthenticated,  usersController.updateProflePics);

router.get('/logout', (req, res) =>{
    req.logout();
    req.session = null;
    res.redirect('/');
  });
  
module.exports = router;