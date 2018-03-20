const Database = require('better-sqlite3');

const db = new Database('./db.sqlite3', { fileMustExist: true });

module.exports = {
    getUser(username) {
        let stmt = db.prepare('SELECT username, password FROM users WHERE username = ?');
        let row = stmt.get(username);
        return row;
    },
    createUser(username, email, password) {
        let stmt = db.prepare('INSERT INTO users(username, email, password) VALUES(?,?,?)');
        stmt.run(username, email, password);
    }
};
