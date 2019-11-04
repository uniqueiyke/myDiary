const LocalStrategy = require('passport-local');
const LocalUser = require('../../models/local-user');

function initPassportLocal(passport){
    passport.use(new LocalStrategy( async (username, password, done) => {
        try {
            //find user with email or phoneNumber
            const user = await LocalUser.findOne({ $or: [{email: username}, { username: username }, { phoneNumber: username }] });

            //if not handle it
            if (!user) {                              
                return done(
                    null,  
                    false,
                    {message: "The username or phoneNumber doesn't have an associated user account. Are you sure you've registered?"
                });
            }
    
            const isMatched = await user.comparePassword(password);
            
            if (!isMatched) {              
                return done(
                    null, 
                    false,
                    {message: "Invalid password."
                })
            }
            
            done(null, {id: user._id, provider: user.provider})
        } catch (error) {
            done(error);
        }
    }));
}

module.exports = initPassportLocal;