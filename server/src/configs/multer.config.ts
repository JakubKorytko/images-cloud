import { Request } from "express";
import { FileFilterCallback } from "multer";
const { customAlphabet } = require('nanoid/non-secure');
const multer = require('multer');
const path = require("path");
const { decode } = require("../utils/auth.util");
require('dotenv').config();
const secret = process.env.APP_SECRET;

type DestinationCallback = (error: Error | null, destination: string) => void
type FileNameCallback = (error: Error | null, filename: string) => void

const storage = multer.diskStorage({
    destination: function (req: Request, file: Express.Multer.File, cb: DestinationCallback) {
        const authData = decode(secret)(req.headers.authorization);
        const src = path.join(__dirname, "..", `/images/${authData.username}/photos`);
        if (!authData || !authData.username) cb(new Error('Auth error'), "err");
        else cb(null, src);
    },
    filename: function (req: Request, file: Express.Multer.File, cb: FileNameCallback) {
        cb(null, customAlphabet('1234567890abcdef', 10)() + Date.now() + path.extname(file.originalname))
    }
})

const multerConfig = multer({
    storage: storage,
    limits: { fileSize: 20971520 },
    fileFilter: function (req: Request, file: Express.Multer.File, cb: FileFilterCallback) {
        const allowedFormats = ["image/png", "image/jpeg"];
        if (allowedFormats.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error("Wrong mime-type"))
        }
    }
})

module.exports = multerConfig;
