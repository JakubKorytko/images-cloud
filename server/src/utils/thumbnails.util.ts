import path from 'path';
import fs from 'fs';

import sharp from 'sharp';
import sizeOf from 'image-size';

import Folders from 'utils/folders.util';

const Thumbnails = {

  async generateAll(data = { test: false }) {
    const imagesPath = path.join(__dirname, '..', '/images');

    const generated:any = {
      all: true,
    };

    await Promise.all(fs.readdirSync(imagesPath).map(async (username: string) => {
      // if it's running as test it shouldn't check all users
      if ((data.test && username !== '_test_thumbnails_util_generateAll') || username === '_test_sample') return false;
      if (username === 'all') throw new Error('Username "all" is not allowed');

      const photosPath = path.join(imagesPath, `/${username}/photos`);

      generated[username] = {};

      await Promise.all(fs.readdirSync(photosPath).map(async (file: string) => {
        const thumbsPath = path.join(imagesPath, `${username}/photos_thumb/${file}`);
        const progressivePath = path.join(imagesPath, `${username}/progressive_thumb/${file}`);

        if (!fs.existsSync(thumbsPath) || !fs.existsSync(progressivePath)) {
          const res = await this.generate(file, username);
          if (!res.thumbnail || !res.progressive_thumbnail) generated.all = false;
          generated[username][file] = res;
        } else {
          generated[username][file] = {
            thumbnail: true,
            progressive_thumbnail: true,
          };
        }
      }));

      return true;
    }));

    return generated;
  },

  async generate(name: string, username: string) {
    const src = path.join(__dirname, '..', `/images/${username}/photos/${name}`);

    const promise = await new Promise((resolve) => {
      const w = sizeOf(src).width;

      sharp(fs.readFileSync(src))
        .resize({ width: Math.min((w || 0), 600) })
        .toBuffer()
        .then((x: Buffer) => {
          const thumbsPath = path.join(__dirname, '..', `/images/${username}/photos_thumb/${name}`);
          if (!fs.existsSync(thumbsPath)) Folders.create(username);
          fs.writeFileSync(thumbsPath, x);
          resolve(true);
        });
    });

    const promise2 = await new Promise((resolve) => {
      sharp(fs.readFileSync(src))
        .resize({ width: 5 })
        .toBuffer()
        .then((x: Buffer) => {
          const progressivePath = path.join(__dirname, '..', `/images/${username}/progressive_thumb/${name}`);
          if (!fs.existsSync(progressivePath)) Folders.create(username);
          fs.writeFileSync(progressivePath, x);
          resolve(true);
        });
    });

    return {
      thumbnail: promise,
      progressive_thumbnail: promise2,
    };
  },

  deleteUnused(data = { test: false }) {
    const src = path.join(__dirname, '..', '/images/');

    fs.readdirSync(src).forEach((username: string) => {
      // if it's running as test it shouldn't check all users
      if ((data.test && username !== '_test_thumbnails_util_delete') || username === '_test_sample') { return false; }
      const thumbsPath = path.join(__dirname, '..', `/images/${username}/photos_thumb`);

      if (!fs.existsSync(thumbsPath)) Folders.create(username);

      fs.readdirSync(thumbsPath).forEach((file: string) => {
        const photoPath = path.join(__dirname, '..', `/images/${username}/photos/${file}`);

        if (!fs.existsSync(photoPath)) {
          const thumbPath = path.join(__dirname, '..', `/images/${username}/photos_thumb/${file}`);
          fs.rmSync(thumbPath);
        }
      });

      return true;
    });

    fs.readdirSync(src).forEach((username: string) => {
      // if it's running as test it shouldn't check all users
      if (data.test && username !== '_test_thumbnails_util_delete') return false;
      const progressivePath = path.join(__dirname, '..', `/images/${username}/progressive_thumb`);

      if (!fs.existsSync(progressivePath)) Folders.create(username);

      fs.readdirSync(progressivePath).forEach((file: string) => {
        const photoPath = path.join(__dirname, '..', `/images/${username}/photos/${file}`);

        if (!fs.existsSync(photoPath)) {
          const progressiveThumbPath = path.join(__dirname, '..', `/images/${username}/progressive_thumb/${file}`);
          fs.rmSync(progressiveThumbPath);
        }
      });

      return true;
    });
  },
};

export default Thumbnails;
