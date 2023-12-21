import Database from 'services/database/database';
import queries from 'services/database/queries';

const db = new Database();

db.create();

const Users = {
  async loginUser(username: string, password: string) {
    const result = await db.conn.prepare(queries.loginUser).get(username, password);
    if (result !== undefined) return result;
    return false;
  },

  async addUser(username: string, password: string) {
    if (!(await this.userExists(username))) {
      await db.conn.prepare(queries.addUser).run(username, password);
      return true;
    }
    return false;
  },

  async deleteUser(username: string) {
    if (username === '_testuser') return false;
    if ((await this.userExists(username))) {
      await db.conn.prepare(queries.deleteUser).run(username);
      return true;
    }
    return false;
  },

  async userExists(username: string) {
    const users = db.conn.prepare(queries.userExists).all(username);

    return users.length > 0;
  },

  async getAll() {
    return db.conn.prepare(queries.getAllUsers).all();
  },
};

export default Users;
