const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const GoogleUser = require('../../models/google-user');

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
                
                done(null, {id: user._id, provider: user.provider});
            }else{
                
                done(null, {id: user._id, provider: user.provider})
            }
            
        }
        catch(e){
            done(e)
        }
    }
    ));
}

module.exports = initPassportGoogle;

