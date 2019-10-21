const router = require('express').Router();
const usersController = require('../controllers/users-controller');
const passport = require('passport');
const verifyAuth = require('../lib/verify-auth');

router.get('/registration', usersController.registerUser);

router.post('/registration', usersController.createUser);

router.get('/login', usersController.loginUser);

router.post('/login', passport.authenticate('local'), usersController.loginUserPost);

router.get('/profile/:id', verifyAuth.checkAuthentication,  usersController.userProfile);

router.get('/logout', (req, res) =>{
    req.logout();
    res.redirect('/');
  });
  
module.exports = router;