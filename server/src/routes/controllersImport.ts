import { Request, Response } from 'express';

import sendFile from 'controllers/sendFile.controller';
import uploadPhoto from 'controllers/uploadPhoto.controller';
import deletePhoto from 'controllers/deletePhoto.controller';
import downloadPhoto from 'controllers/downloadPhoto.controller';
import healthCheck from 'controllers/healthCheck.controller';
import addUser from 'controllers/addUser.controller';
import deleteUser from 'controllers/deleteUser.controller';
import usersDatabase from 'controllers/usersDatabase.controller';

import getPhotos from 'utils/photos.util';
import { decode, encode } from 'utils/auth.util';

require('dotenv').config();

const secret = process.env.APP_SECRET;

const sendPhoto = (req: Request, res: Response) => {
  sendFile('photos', req.params.photo, res);
};
const sendThumb = (req: Request, res: Response) => {
  sendFile('photos_thumb', req.params.thumb, res);
};
const sendProgressiveThumb = (req: Request, res: Response) => {
  sendFile('progressive_thumb', req.params.thumb, res);
};
const sendPhotos = (req: Request, res: Response) => {
  res.send(getPhotos(res.locals.auth.username));
};
const login = async (req: Request, res: Response) => {
  if (!req.body.username || !req.body.password) {
    res.send({ token: false });
    return false;
  }

  const encoded = await encode(secret || '')(req.body.username, req.body.password);
  res.send({ token: encoded });

  return true;
};
const auth = (req: Request, res: Response) => {
  const decoded = decode(secret || '')(req.headers.authorization);
  if (decoded === false) res.send({ res: false });
  else res.send({ res: decoded.username });
};

export default {
  uploadPhoto,
  deletePhoto,
  downloadPhoto,
  healthCheck,
  addUser,
  deleteUser,
  usersDatabase,
  sendPhoto,
  sendThumb,
  sendProgressiveThumb,
  sendPhotos,
  login,
  auth,
};
