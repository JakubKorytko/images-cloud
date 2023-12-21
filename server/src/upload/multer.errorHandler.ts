import { Request, Response } from 'express';
import multer, { MulterError } from 'multer';

const multerErrorHandler = (err: MulterError | Error | unknown, _: Request, res: Response) => {
  const resPointer = res;

  if (err instanceof multer.MulterError) {
    resPointer.statusCode = 400;
    res.send({ code: err.code });
  } else if (err instanceof Error) {
    if (err.message === 'FILE_MISSING') {
      resPointer.statusCode = 400;
      res.send({ code: 'FILE_MISSING' });
    } else {
      resPointer.statusCode = 500;
      res.send({ code: 'GENERIC_ERROR' });
    }
  }
};

export default multerErrorHandler;
