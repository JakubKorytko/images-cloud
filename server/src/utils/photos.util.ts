import path from "path";
import { ImageModel } from "../models/image.model";
const sizeOf = require('image-size');
const fs = require('fs');
require('dotenv').config();
const SERVER_URL = process.env.SERVER_URL;
// const PORT = 3001;

const getPhotos = (username: string) => {
    let arr: ImageModel[] = [];
    const src = path.join(__dirname, "..", `/images/${username}/photos/`);
    fs.readdirSync(src).forEach((file: string, index: number) => {
        const dimensions = sizeOf(`${src}${file}`)

        let w = dimensions.width;
        let h = dimensions.height;
        if (dimensions.orientation != undefined) {
            if (dimensions.orientation == 8 || dimensions.orientation == 6) {
                h = dimensions.width;
                w = dimensions.height
            }
        }
        const data: ImageModel = {
            imageId: index,
            name: file,
            path: `${SERVER_URL}/photo/${encodeURI(file)}`,
            thumb_path: `${SERVER_URL}/thumbnail/${encodeURI(file)}`,
            progressive_path: `${SERVER_URL}/progressive/${encodeURI(file)}`,
            size: fs.statSync(`${src}${file}`).size,
            width: w,
            height: h,
            date: fs.statSync(`${src}${file}`).birthtimeMs,
            ratioY: h / w
        }

        arr.push(data);
    });

    return arr;
}

module.exports = getPhotos;