import path from 'path';
import fs from 'fs';

import { Request, Response } from 'express';

import thumbnails from '../utils/thumbnails.util';

const deletePhoto = (req: Request, res: Response) => {
  const requestedFile = req.params.photo;
  const fileUrl = path.join(__dirname, '..', `images/${res.locals.auth.username}/photos/${decodeURI(requestedFile)}`);
  if (fs.existsSync(fileUrl)) {
    try {
      fs.unlinkSync(fileUrl);
      thumbnails.deleteUnused();
      res.send('Image deleted');
    } catch (err) {
      res.send('Error while deleting image');
    }
  } else {
    res.status(404).send('Not found');
  }
};

export default deletePhoto;
