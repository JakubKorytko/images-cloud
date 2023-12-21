import path from 'path';
import fs from 'fs';

import sizeOf from 'image-size';

import { ImageModel } from 'models/image.model';

require('dotenv').config();

const { SERVER_URL } = process.env;
// const PORT = 3001;

const getPhotos = (username: string) => {
  const arr: ImageModel[] = [];
  const src = path.join(__dirname, '..', `/images/${username}/photos/`);
  fs.readdirSync(src).forEach((file: string, index: number) => {
    const dimensions = sizeOf(`${src}${file}`);

    let w = dimensions.width;
    let h = dimensions.height;
    if (dimensions.orientation !== undefined) {
      if (dimensions.orientation === 8 || dimensions.orientation === 6) {
        h = dimensions.width;
        w = dimensions.height;
      }
    }
    const data: ImageModel = {
      imageId: index,
      name: file,
      path: `${SERVER_URL}/photo/${encodeURI(file)}`,
      thumb_path: `${SERVER_URL}/thumbnail/${encodeURI(file)}`,
      progressive_path: `${SERVER_URL}/progressive/${encodeURI(file)}`,
      size: fs.statSync(`${src}${file}`).size,
      width: w || 0,
      height: h || 0,
      date: fs.statSync(`${src}${file}`).birthtimeMs,
      ratioY: (h && w) ? (h / w) : 0,
    };

    arr.push(data);
  });

  return arr;
};

export default getPhotos;
