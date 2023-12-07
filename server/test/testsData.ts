import path from "path";
import { ExpectedData } from "./models/expectedData.model";
const fs = require("fs");
require('dotenv').config();
const SERVER_URL = process.env.SERVER_URL;

const imagesFolder = path.join(__dirname, "../src/images");

const getpath = (username: string, folder?: string, file?: string) => {
    if (folder && file) return path.join(imagesFolder, `/${username}/${folder}/${file}`)
    else if (folder) return path.join(imagesFolder, `/${username}/${folder}`)
    else return path.join(imagesFolder, `/${username}`)
}

const rmIfExists = (path: string) => {
    if (fs.existsSync(path)) {
        fs.rmSync(path, {recursive: true, force: true});
    }
}

const mkdirIfNotExists = (path: string) => {
    if (!fs.existsSync(path)) {
        fs.mkdirSync(path);
    }
}

const createFoldersFromArray = (folders: Array<string>) => {
    folders.forEach((folder) => {
        fs.mkdirSync(getpath(folder))
    })
}

const deleteFoldersFromArray = (folders: Array<string>) => {
    folders.forEach((folder) => {
        rmIfExists(getpath(folder))
    })
}

const foldersExists = (username: string) => {
    return {
        photos: fs.existsSync(getpath(username)),
        thumbs: fs.existsSync(getpath(username)),
        progressive: fs.existsSync(getpath(username))
    }
}

const createFolders = (username: string) => {
    mkdirIfNotExists(getpath(username))
    mkdirIfNotExists(getpath(username, "photos"))
    mkdirIfNotExists(getpath(username, "photos_thumb"))
    mkdirIfNotExists(getpath(username, "progressive_thumb"))
}

const sampleImage = path.join(imagesFolder, "/_test_sample/sample.png")

const expectedData: ExpectedData = {
    imageId: 0,
    name: 'sample.png',
    path: `${SERVER_URL}/photo/sample.png`,
    thumb_path: `${SERVER_URL}/thumbnail/sample.png`,
    progressive_path: `${SERVER_URL}/progressive/sample.png`,
    size: 534283,
    width: 640,
    height: 426,
    ratioY: 0.665625
}

export {createFoldersFromArray, deleteFoldersFromArray, expectedData, sampleImage, foldersExists, getpath, rmIfExists, mkdirIfNotExists, createFolders}