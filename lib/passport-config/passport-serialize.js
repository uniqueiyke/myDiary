const UserModel = require('../user-model-mapping');


function initPassport(passport) {
    passport.serializeUser((userData, done) => {
        done(null, userData);
      });
      
    passport.deserializeUser(async (userData, done) => {
        try {         
            const user = await UserModel[userData.provider].findById(userData.id);
            done(null, user);
        } catch (error) {
            done(error.message);
        }
    });
}

module.exports = initPassport;