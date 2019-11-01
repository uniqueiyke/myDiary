const UserInfo = require('../../models/user-info');
const UserModel = require('../user-model-mapping');


function initPassport(passport) {
    passport.serializeUser((user_id, done) => {
        done(null, user_id);
      });
      
    passport.deserializeUser(async (id, done) => {
        try {
            const userInfo = await UserInfo.findById(id);
            const userID = userInfo.userID
            const curUser = await UserModel[userInfo.provider].findById(userID);
            done(null, curUser);
        } catch (error) {
            done(error.message);
        }
    });
}

module.exports = initPassport;