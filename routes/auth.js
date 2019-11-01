const router = require('express').Router();
const passport = require('passport');

router.get('/google',
  passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/google/callback', 
  passport.authenticate('google'), (req, res) => {
    console.log(req.user._id);
    res.redirect(`/users/profile/${req.user._id}`);
  });

router.get('/facebook', passport.authenticate('facebook', { scope: ['profile', 'email'] }));
  
router.get('/facebook/callback', passport.authenticate('facebook'), (req, res) => {
    res.send('facebook callback');
});

router.get('/twitter', passport.authenticate('twitter'));

router.get('/twitter/callback',
  passport.authenticate('twitter'), (req, res) => {
    console.log(req.user._id);
    res.redirect(`/users/profile/${req.user._id}`);
});
  
module.exports = router;