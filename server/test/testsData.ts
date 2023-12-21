import path from 'path';
import fs from 'fs';

import { ExpectedData } from 'models/expectedData.model';

require('dotenv').config();

const { SERVER_URL } = process.env;

const imagesFolder = path.join(__dirname, '../src/images');

const getPath = (username: string, folder?: string, file?: string) => {
  if (folder && file) return path.join(imagesFolder, `/${username}/${folder}/${file}`);
  if (folder) return path.join(imagesFolder, `/${username}/${folder}`);
  return path.join(imagesFolder, `/${username}`);
};

const rmIfExists = (filePath: string) => {
  if (fs.existsSync(filePath)) {
    fs.rmSync(filePath, { recursive: true, force: true });
  }
};

const mkdirIfNotExists = (filePath: string) => {
  if (!fs.existsSync(filePath)) {
    fs.mkdirSync(filePath);
  }
};

const createFoldersFromArray = (folders: Array<string>) => {
  folders.forEach((folder) => {
    fs.mkdirSync(getPath(folder));
  });
};

const deleteFoldersFromArray = (folders: Array<string>) => {
  folders.forEach((folder) => {
    rmIfExists(getPath(folder));
  });
};

const foldersExists = (username: string) => ({
  photos: fs.existsSync(getPath(username)),
  thumbs: fs.existsSync(getPath(username)),
  progressive: fs.existsSync(getPath(username)),
});

const createFolders = (username: string) => {
  mkdirIfNotExists(getPath(username));
  mkdirIfNotExists(getPath(username, 'photos'));
  mkdirIfNotExists(getPath(username, 'photos_thumb'));
  mkdirIfNotExists(getPath(username, 'progressive_thumb'));
};

const sampleImage = path.join(imagesFolder, '/_test_sample/sample.png');

const expectedData: ExpectedData = {
  imageId: 0,
  name: 'sample.png',
  path: `${SERVER_URL}/photo/sample.png`,
  thumb_path: `${SERVER_URL}/thumbnail/sample.png`,
  progressive_path: `${SERVER_URL}/progressive/sample.png`,
  size: 534283,
  width: 640,
  height: 426,
  ratioY: 0.665625,
};

export {
  createFoldersFromArray,
  deleteFoldersFromArray,
  expectedData,
  sampleImage,
  foldersExists,
  getPath,
  rmIfExists,
  mkdirIfNotExists,
  createFolders,
};
