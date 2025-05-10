const db = require('../config/db');

const findUserByEmail = (email, callback) => {
  db.query('SELECT * FROM users WHERE email = ?', [email], callback);
};

const createUser = (user, callback) => {
  db.query('INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
    [user.name, user.email, user.password], callback);
};

module.exports = {
  findUserByEmail,
  createUser,
};
