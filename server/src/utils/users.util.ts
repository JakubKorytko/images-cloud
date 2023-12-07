const db = new (require("../services/database/database"))();
const queries = require("../services/database/queries");
db.create();

const Users = {
    async loginUser (username: string, password: string) {
        const result = await db.conn.prepare(queries.loginUser).get(username, password);
        if (result !== undefined ) return result
        else return false;
    },

    async addUser (username: string, password: string) {
        if (!(await this.userExists(username))) {
            await db.conn.prepare(queries.addUser).run(username, password);
            return true;
        } else {
            return false;
        }
    },

    async deleteUser (username: string) {
        if (username === "_testuser") return false;
        if ((await this.userExists(username))) {
            await db.conn.prepare(queries.deleteUser).run(username);
            return true;
        } else {
            return false;
        }
    },
    
    async userExists (username: string) {
        const users = await db.conn.prepare(queries.userExists).all(username);

        if (users.length>0) return true
        else return false
    },

    async getAll () {
        return await db.conn.prepare(queries.getAllUsers).all();
    }
}



module.exports = Users;