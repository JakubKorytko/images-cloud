import fs from 'fs';
import path from 'path';

import { Response } from 'express';

const sendFile = (folder: string, name: string, res: Response) => {
  const fileUrl = path.join(__dirname, '..', `images/${res.locals.auth.username}/${folder}/${decodeURI(name)}`);
  if (fs.existsSync(fileUrl)) {
    res.sendFile(fileUrl);
    return true;
  }
  res.status(404).send('Not found');
  return false;
};

export default sendFile;
