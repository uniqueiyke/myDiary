const mongoose = require('mongoose')

/**
 * Create mongoDB connection using the provided host, port, DB name and options
 *@param {string} url
 *  @param {object} options 
 * @returns Connection
 */
exports.connectToDB = function(url, options) {
    mongoose.connect(url, options);
    return mongoose.connection
}