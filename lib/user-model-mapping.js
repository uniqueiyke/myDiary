const localUser = require('../models/local-user');
const googleUser = require('../models/google-user');
const facebookUser = require('../models/facebook-user');
const twitterUser = require('../models/twitter-user');

const userModel = {
    local: localUser,
    facebook: facebookUser,
    google: googleUser,
    twitter: twitterUser,
}
module.exports = userModel;