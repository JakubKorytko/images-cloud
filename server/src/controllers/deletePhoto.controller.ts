const fs = require('fs');
import { Request, Response } from "express";
import path from "path";
const thumbnails = require("../utils/thumbnails.util");

const deletePhoto = (req: Request, res: Response) => {
    const requestedFile = req.params.photo;
    // const fileUrl = `./src/images/${res.locals.auth.username}/photos/${decodeURI(requestedFile)}`;
    const fileUrl = path.join(__dirname, "..", `images/${res.locals.auth.username}/photos/${decodeURI(requestedFile)}`);
    console.log(fileUrl);
    if (fs.existsSync(fileUrl)) {
        try {
            fs.unlinkSync(fileUrl);
            thumbnails.deleteUnused();
            res.send("Image deleted");
        } catch (err) {
            // console.log(err)
            res.send("Error while deleting image")
        }
    } else {
        res.status(404).send("Not found");
    }
}

module.exports = deletePhoto