import { Request, Response } from "express";
const path = require("path");
const fs = require("fs");

const downloadPhoto = (req: Request, res: Response) => {
    const requestedFile = req.params.photo;
    const fileUrl = path.join(__dirname, "..", `/images/${res.locals.auth.username}/photos/${decodeURI(requestedFile)}`);
    if (fs.existsSync(fileUrl)) {
        res.download(path.join(__dirname, fileUrl));
    } else {
        res.status(404).send("Not found");
    }
}

module.exports = downloadPhoto