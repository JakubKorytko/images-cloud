import { Response } from "express";
const fs = require('fs');
const path = require("path");

const sendFile = (folder: string, name: string, res: Response) => {
    const requestedFile = name;
    // const fileUrl = `./src/images/${res.locals.auth.username}/${folder}/${decodeURI(requestedFile)}`;
    const fileUrl = path.join(__dirname, "..", `images/${res.locals.auth.username}/${folder}/${decodeURI(requestedFile)}`)
    if (fs.existsSync(fileUrl)) {
        res.sendFile(fileUrl);
        return true;
    } else {
        res.status(404).send("Not found");
        return false;
    }
}

module.exports = sendFile;