const router = require('express').Router();
const passport = require('passport');

router.get('/google',
  passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/google/callback', 
  passport.authenticate('google'), (req, res) => {
    res.redirect(`/wall/${req.user.id}`);
  });

router.get('/facebook', passport.authenticate('facebook', { scope: ['email'] }));
  
router.get('/facebook/callback', 
  passport.authenticate('facebook'), (req, res) => {
    res.redirect(`/wall/${req.user.id}`);

});

router.get('/twitter', passport.authenticate('twitter'));

router.get('/twitter/callback',
  passport.authenticate('twitter'), (req, res) => {
    res.redirect(`/wall/${req.user.id}`);
});
  
module.exports = router;