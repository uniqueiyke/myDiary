const User = require('../../models/user');
const UserModel = require('../user-model-mapping')


function initPassport(passport) {
    passport.serializeUser((user_id, done) => {
        console.log('from serialise method');
        console.log(user_id)
        
        done(null, user_id);
      });
      
      passport.deserializeUser(async (id, done) => {
        try {
            const user = await User.findById(id);
            const userID = user.userID
            const curUser = await UserModel[user.provider].findById(userID);
            done(null, curUser);
        } catch (error) {
            done(error.message);
        }
    });
}

module.exports = initPassport;