const crypto = require('crypto');
const accountDB = require('../db/account.db');

const SALT_SIZE = 32;

/**
 * generates random string of characters i.e salt
 */
function genRandomString(length) {
    return crypto.randomBytes(Math.ceil(length / 2))
        .toString('hex') /** convert to hexadecimal format */
        .slice(0, length); /** return required number of characters */
}
/**
 * hash password with sha512.
 */
function sha512(password, salt) {
    let hash = crypto.createHmac('sha512', salt); /** Hashing algorithm sha512 */
    hash.update(password);
    let value = hash.digest('hex');
    return {
        salt,
        hash: value
    };
}

module.exports = {
    /**
     * Check if the username's password hash match the stored one
     */
    checkPassword(username, password) {
        let row = accountDB.getUser(username);
        if (row) {
            let [salt, passwordHash] = row.password.split(':');
            let passwordData = sha512(password, salt);
            return passwordHash === passwordData.hash;
        }
        return false;
    },
    /**
     * Create account for user
     */
    createAccount(username, email, password) {
        let salt = genRandomString(SALT_SIZE);
        let passwordData = sha512(password, salt);
        let storedPasword = `${passwordData.salt}:${passwordData.hash}`;
        accountDB.createUser(username, email, storedPasword);
    }
};
