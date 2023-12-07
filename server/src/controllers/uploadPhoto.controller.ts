import { Request, Response, NextFunction } from "express";
import { MulterError } from "multer";
const upload = require("../configs/multer.config");
const thumbnails = require("../utils/thumbnails.util");

const uploadPhoto = (req: Request, res: Response, next: NextFunction) => {
    upload.single("image")(req, res, (err: MulterError) => {
        if (err) return res.status(500).send(err.message);
        if (req.file === undefined) return res.status(500).send("No image attached")
        thumbnails.generate(req.file?.filename, res.locals.auth.username);
        res.status(200).send("File uploaded")
    })
}

module.exports = uploadPhoto;