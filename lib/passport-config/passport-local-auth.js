const LocalStrategy = require('passport-local');
const User = require('../../models/user');
const LocalUser = require('../../models/local-user');

function initPassportLocal(passport){
    passport.use(new LocalStrategy( async (username, password, done) => {
        try {
            //find user with email or phoneNumber
            const user = await LocalUser.findOne({ $or: [{email: username}, { username: username }, { phoneNumber: username }] });
    
            //if not handle it
            if (!user) {
                // console.log('Invalid username .');                               
                return done(
                    null,  
                    false,
                    {message: "The username or phoneNumber doesn't have an associated user account. Are you sure you've registered?"
                });
            }
    
            //match password
            const isMatched = await user.comparePassword(password);
            //debugger
            if (!isMatched) {
                // console.log('Invalid password.');                
                return done(
                    null, 
                    false,
                    {message: "Invalid password."
                })
            }
    
            //otherwise return user
            const userIndfo = await User.findById(user._id);
            done(null, userIndfo._id);
        } catch (error) {
            // console.log('Authentication error');
            done(error);
        }
    }));
}

module.exports = initPassportLocal;