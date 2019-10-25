const router = require('express').Router();
const passport = require('passport');
// GET /auth/google
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  The first step in Google authentication will involve
//   redirecting the user to google.com.  After authorization, Google
//   will redirect the user back to this application at /auth/google/callback
router.get('/google',
  passport.authenticate('google', { scope: ['profile', 'email'] }));

// GET /auth/google/callback
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  If authentication fails, the user will be redirected back to the
//   login page.  Otherwise, the primary route function function will be called,
//   which, in this example, will redirect the user to the home page.
router.get('/google/callback', 
  passport.authenticate('google'/*, { failureRedirect: '/login' }*/),
  function(req, res) {
    res.send('google callback');
  });

  //Redirect the user to Facebook for authentication.  When complete,
  // Facebook will redirect the user back to the application at
  //     /auth/facebook/callback
router.get('/facebook', passport.authenticate('facebook', { scope: ['profile', 'email'] }));
  
  // Facebook will redirect the user to this URL after approval.  Finish the
  // authentication process by attempting to obtain an access token.  If
  // access was granted, the user will be logged in.  Otherwise,
  // authentication has failed.
router.get('/facebook/callback', passport.authenticate('facebook'), function(req, res) {
    res.send('facebook callback');
  });
  module.exports = router;