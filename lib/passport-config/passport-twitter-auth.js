const TwitterStrategy = require('passport-twitter').Strategy;
const TwitterUser = require('../../models/twitter-user');
const UserInfo = require('../../models/user-info');

// Use the GoogleStrategy within Passport.
//   Strategies in passport require a `verify` function, which accept
//   credentials (in this case, a token, tokenSecret, and Google profile), and
//   invoke a callback with a user object.
function initPassportTwitter(passport) {
    passport.use(new TwitterStrategy({
        consumerKey: process.env.TWITTER_CONSUMER_KEY,
        consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
        callbackURL: process.env.ROOT_URI + '/auth/twitter/callback'
      },
      async (token, tokenSecret, profile, done) => {
        try{
          let user = await TwitterUser.findOne({ twitterID: profile.id });
          if(!user){
              user = new TwitterUser({
                  twitterID: profile.id,
                  firstName: profile.displayName.split(' ')[0],
                  lastName: profile.displayName.split(' ')[1],
                  gender: profile.gender,
                  //email: profile.emails[0].value,
                  username: profile.username,
                  photoPath: profile.photos[0].value,
                  provider: profile.provider
              });
              await user.save();
              // console.log(user)
              const userInfo = new UserInfo({
                  userID: user._id,
                  //email: user.email,
                  provider: user.provider
              })

              await userInfo.save();
              done(null, userInfo._id);
          }
          else{
            const userInfo = await UserInfo.findOne({userID: user._id})
            done(null, userInfo._id);
        }
      }
      catch(e){
          done(e)
      }
      }
    ));
}


module.exports = initPassportTwitter;

