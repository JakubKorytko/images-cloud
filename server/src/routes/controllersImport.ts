import { Request, Response } from "express";
const sendFile = require("../controllers/sendFile.controller");
const getPhotos = require("../utils/photos.util");
const {encode, decode} = require("../utils/auth.util");
require('dotenv').config();
const secret = process.env.APP_SECRET;

module.exports = {
    uploadPhoto: require("../controllers/uploadPhoto.controller"),
    deletePhoto: require("../controllers/deletePhoto.controller"),
    downloadPhoto: require("../controllers/downloadPhoto.controller"),
    healthCheck: require("../controllers/healthCheck.controller"),
    addUser: require("../controllers/addUser.controller"),
    deleteUser: require("../controllers/deleteUser.controller"),
    usersDatabase: require("../controllers/usersDatabase.controller"),

    sendPhoto: (req: Request, res: Response) => {
        sendFile("photos", req.params.photo, res)
    },
    sendThumb: (req: Request, res: Response) => {
        sendFile("photos_thumb", req.params.thumb, res)
    },
    sendProgressiveThumb: (req: Request, res: Response) => {
        sendFile("progressive_thumb", req.params.thumb, res)
    },
    sendPhotos: (req: Request, res: Response) => {
        res.send(getPhotos(res.locals.auth.username));
    },
    login: async (req: Request, res: Response) => {
        if (!req.body.username || !req.body.password) {
            res.send({token: false});
            return false;
        }
        const encoded = await encode(secret)(req.body.username, req.body.password);
        res.send({token: encoded})
    },
    auth: (req: Request, res: Response) => {
        const decoded = decode(secret)(req.headers.authorization);
        if (decoded == false) res.send({res: false})
        else res.send({res: decoded.username})
    }
}