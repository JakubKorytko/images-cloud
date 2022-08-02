var sqlite = require("better-sqlite3")(__dirname + '/data.db');

class Database {
    public conn: any
    create = async () => {
        this.conn = sqlite;
        await this.conn.prepare(
            "CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, username TEXT NOT NULL UNIQUE, password TEXT NOT NULL);"
        ).run();

        const testUser = await this.conn.prepare("SELECT EXISTS(SELECT username FROM users WHERE username='_testuser') AS [exists];").get();
        const stanley = await this.conn.prepare("SELECT EXISTS(SELECT username FROM users WHERE username='stanley') AS [exists];").get();

        if (!testUser.exists) {
            await this.conn.prepare(
                "INSERT INTO users (username, password) VALUES('_testuser', 'qwerty123');"
            ).run();
        }

        if (!stanley.exists) {
            await this.conn.prepare(
                "INSERT INTO users (username, password) VALUES('stanley', 'qwerty123');"
            ).run();
        }

    }
}

module.exports = Database;