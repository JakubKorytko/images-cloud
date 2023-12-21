import { Request, Response } from 'express';

const healthCheck = (_: Request, res: Response) => {
  const data = {
    uptime: process.uptime(),
    message: 'Server is working properly',
    date: new Date().toUTCString(),
  };

  res.status(200).send(data);
};

export default healthCheck;
