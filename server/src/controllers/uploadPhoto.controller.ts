import { Request, Response } from 'express';
import { MulterError } from 'multer';

import upload from '../configs/multer.config';
import thumbnails from '../utils/thumbnails.util';

const uploadPhoto = async (req: Request, res: Response) => {
  const singleFunc = upload.single('image');
  const singlePromise = new Promise((resolve) => {
    singleFunc(req, res, async (err: unknown) => {
      if (err) {
        const isMulterError = err instanceof MulterError;
        const isError = err instanceof Error;
        const isString = typeof err === 'string';
        if (isString) {
          res.status(500).send(err);
        } else if (isMulterError || isError) {
          res.status(500).send(err.message);
        } else {
          res.status(500).send('Unknown error');
        }
        return resolve(false);
      }
      if (req.file === undefined) {
        res.status(500).send('No image attached');
        return resolve(false);
      }
      await thumbnails.generate(req.file?.filename || '', res.locals.auth.username);
      res.status(200).send('File uploaded');
      return resolve(true);
    });
  });
  await singlePromise;
};

export default uploadPhoto;
