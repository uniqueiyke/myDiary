//hashing of password
const bcrypt = require('bcrypt');
const SALT_ROUNDS = 10;

/**
 * Return a promise which resolve to a hashed password or reject with an error if hashing
 * failed.
 * @param {number} password 
 * @returns {Promise}
 */
async function bcryptHashedPassword(password){
    return await bcrypt.hash(password, SALT_ROUNDS);
}

module.exports = bcryptHashedPassword;