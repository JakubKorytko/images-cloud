import { NextFunction, Request, Response } from 'express';

import { decode } from '../utils/auth.util';

require('dotenv').config();

const secret = process.env.APP_SECRET;

const authorization = (req: Request, res: Response, next: NextFunction) => {
  const token:string | undefined = req.headers.authorization;

  const authData = decode(secret || '')(token);
  if (authData === false) {
    res.status(401).send('Not authorized or wrong token given');
    return false;
  }

  const { locals } = res;
  locals.auth = authData;
  next();

  return true;
};

export default authorization;
