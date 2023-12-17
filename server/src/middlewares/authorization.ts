import { Request, Response, NextFunction } from "express";
const {decode} = require("../utils/auth.util");
require('dotenv').config();
const secret = process.env.APP_SECRET;

const authorization = function (req: Request, res: Response, next: NextFunction) {

    const token:string | undefined = req.headers.authorization;

    const authData = decode(secret)(token);
    if (authData == false) {
      res.status(401).send("Not authorized or wrong token given");
      return false;
    }
    
    res.locals.auth = authData;
    next();
}

module.exports = authorization;