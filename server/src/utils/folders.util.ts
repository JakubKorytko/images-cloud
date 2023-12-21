import fs from 'fs';
import path from 'path';

import users from 'utils/users.util';

const Folders = {

  async validate() {
    this.imagesFolderValidation();
    await this.deleteMissing();
    await this.fillMissing();
  },

  create(username: string) {
    let created = 0;
    const folders = ['/', '/photos', '/photos_thumb', '/progressive_thumb'];
    for (let i = 0; i < 4; i += 1) {
      const src = path.join(__dirname, '..', `/images/${username}${folders[i]}`);
      if (!fs.existsSync(src)) { fs.mkdirSync(src); created += 1; }
    }
    return created > 0;
  },

  delete(username: string) {
    if (!this.exists(username)) return false;
    const src = path.join(__dirname, '..', `/images/${username}`);
    fs.rmSync(src, { recursive: true, force: true });
    // fs.rmSync(`./src/images/${username}`, { recursive: true, force: true });
    return true;
  },

  exists(username: string) {
    const src = path.join(__dirname, '..', `/images/${username}`);
    return fs.existsSync(src);
  },

  async fillMissing() {
    const usrs = await users.getAll();
    usrs.forEach((user: { id: number, username: string, password: string }) => {
      if (user.username !== '_testuser') {
        this.create(user.username);
      }
    });
  },

  async deleteMissing() {
    const src = path.join(__dirname, '..', '/images');
    const folders = fs.readdirSync(src);
    const promises = folders.map(async (folder: string) => {
      const exists = await users.userExists(folder);
      if (!exists && folder !== '_test_sample') {
        this.delete(folder);
      }
    });
    await Promise.all(promises);
  },

  imagesFolderValidation() {
    const src = path.join(__dirname, '..', '/images');
    if (!fs.existsSync(src)) {
      fs.mkdirSync(src);
    }
  },
};

export default Folders;
