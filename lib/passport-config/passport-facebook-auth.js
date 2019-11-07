const FacebookStrategy = require('passport-facebook').Strategy;
const FacebookUser = require('../../models/facebook-user');

function initPassportFacebook(passport) {
    passport.use(new FacebookStrategy({
        clientID: process.env.FACEBOOK_CLIENT_ID,
        clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
        callbackURL: process.env.ROOT_URI + '/auth/facebook/callback',
        profileFileds: ['emails']
    },
    async (accessToken, refreshToken, profile, done) => {
        // console.log(profile);
        try{
            let user = await FacebookUser.findOne({ facebookID: profile.id });
            console.log(user);
            
            if(!user){
                user = new FacebookUser({
                    facebookID: profile.id,
                    firstName: profile.name.givenName === undefined ? profile.displayName.split(' ')[0] : profile.name.givenName,
                    lastName: profile.name.familyName === undefined ? profile.displayName.split(' ')[1] : profile.name.familyName,
                    middleName: profile.name.givenName === undefined ? profile.displayName.split(' ')[2] : profile.name.middleName,
                    gender: profile.gender,
                    // email: profile.emails[0].value,
                    username: profile.username,
                    // photoPath: profile.photos[0].value,
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

module.exports = initPassportFacebook;

