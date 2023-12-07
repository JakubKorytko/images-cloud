import { Request, Response, NextFunction } from "express";
import { Multer, MulterError } from "multer";
const multer = require('multer');

const multerErrorHandler = (err: MulterError, req: Request, res: Response, next: NextFunction) => {
    console.log(err);
    if (err instanceof multer.MulterError) {
        res.statusCode = 400;
        res.send({ code: err.code });
    } else if (err) {
        if (err.message === "FILE_MISSING") {
            res.statusCode = 400;
            res.send({ code: "FILE_MISSING" });
        } else {
            res.statusCode = 500;
            res.send({ code: "GENERIC_ERROR" })
        }
    }
}

module.exports = multerErrorHandler;