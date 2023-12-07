module.exports = {
    userExists: `SELECT * FROM users WHERE username = ?`,
    addUser: `INSERT INTO users (username, password) VALUES (?, ?)`,
    getAllUsers: `SELECT * FROM users`,
    deleteUser: `DELETE FROM users WHERE username = ?`,
    loginUser: `SELECT * FROM users WHERE username = ? AND password = ?`,
    
    testsQueries: {
        create: `INSERT INTO users (username, password) VALUES ('_test_user', 'qwerty123')`,
        delete: `DELETE FROM users WHERE username = '_test_user'`
    }
};