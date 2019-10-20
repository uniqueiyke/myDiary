const LocalStrategy = require('passport-local');
const User = require('../models/user');

function initPassport(passport){
    passport.use(new LocalStrategy( async (username, password, done) => {
        try {
            //find user with email or phoneNumber
            const user = await User.findOne({ $or: [{email: username}, { username: username }, { phoneNumber: username }] });
    
            //if not handle it
            if (!user) {
                console.log('Invalid username .');                               
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
                console.log('Invalid password.');                
                return done(
                    null, 
                    false,
                    {message: "Invalid password."
                })
            }
    
            //otherwise return user
            done(null, user);
        } catch (error) {
            console.log('Authentication error');
            done(error);
        }
    }));

    passport.serializeUser((user_id, done) => {
        done(null, user_id);
      });
      
    passport.deserializeUser((id, done) => {
        User.findById(id, (err, user) =>{ 
            done(err, user)
        });
    });
}

module.exports = initPassport;