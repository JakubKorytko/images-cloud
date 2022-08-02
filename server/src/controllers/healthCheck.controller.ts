import { Request, Response } from "express";

const healthCheck = async (req: Request, res: Response) => {
    const data = {
        uptime: process.uptime(),
        message: 'Server is working properly',
        date: new Date().toUTCString()
      }
    
      res.status(200).send(data);
}

module.exports = healthCheck;