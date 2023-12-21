import path from 'path';

import { Request } from 'express';
import multer, { FileFilterCallback } from 'multer';
import { customAlphabet } from 'nanoid/non-secure';

import { decode } from '../utils/auth.util';

require('dotenv').config();

const secret = process.env.APP_SECRET;

type DestinationCallback = (error: Error | null, destination: string) => void;
type FileNameCallback = (error: Error | null, filename: string) => void;

const storage = multer.diskStorage({
  destination(req: Request, _: Express.Multer.File, cb: DestinationCallback) {
    const authData = decode(secret || '')(req.headers.authorization);
    const src = path.join(__dirname, '..', `/images/${authData.username}/photos`);
    if (!authData || !authData.username) cb(new Error('Auth error'), 'err');
    else cb(null, src);
  },
  filename(_: Request, file: Express.Multer.File, cb: FileNameCallback) {
    cb(null, customAlphabet('1234567890abcdef', 10)() + Date.now() + path.extname(file.originalname));
  },
});

const multerConfig = multer({
  storage,
  limits: { fileSize: 20971520 },
  fileFilter(_: Request, file: Express.Multer.File, cb: FileFilterCallback) {
    const allowedFormats = ['image/png', 'image/jpeg'];
    if (allowedFormats.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Wrong mime-type'));
    }
  },
});

export default multerConfig;
