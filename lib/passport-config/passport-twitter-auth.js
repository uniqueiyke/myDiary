const TwitterStrategy = require('passport-twitter').Strategy;
const TwitterUser = require('../../models/twitter-user');

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

            done(null, {id: user._id, provider: user.provider})
          }
          else{
            //const userInfo = await UserInfo.findOne({userID: user._id})
            done(null, {id: user._id, provider: user.provider})
        }
      }
      catch(e){
          done(e)
      }
      }
    ));
}


module.exports = initPassportTwitter;

