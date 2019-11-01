const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const GoogleUser = require('../../models/google-user');
const UserInfo = require('../../models/user-info');
// Use the GoogleStrategy within Passport.
//   Strategies in passport require a `verify` function, which accept
//   credentials (in this case, a token, tokenSecret, and Google profile), and
//   invoke a callback with a user object.
function initPassportGoogle(passport) {
    passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: process.env.ROOT_URI + '/auth/google/callback'
    },
    async (accessToken, refreshToken, profile, done) =>{
        try{
            let user = await GoogleUser.findOne({ googleID: profile.id });
            if(!user){
                user = new GoogleUser({
                    googleID: profile.id,
                    firstName: profile.name.givenName,
                    lastName: profile.name.familyName,
                    middleName: profile.name.middleName,
                    gender: profile.gender,
                    email: profile.emails[0].value,
                    username: profile.username,
                    photoPath: profile.photos[0].value,
                    provider: profile.provider
                });
                await user.save();
                //console.log(user)
                const userInfo = new UserInfo({
                    userID: user._id,
                    email: user.email,
                    provider: user.provider
                })

                await userInfo.save();
                done(null, userInfo._id);
            }else{
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

module.exports = initPassportGoogle;

