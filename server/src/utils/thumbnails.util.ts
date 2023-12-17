import path from "path";

const fs = require('fs');
const sharp = require("sharp");
const sizeOf = require('image-size');
const Folders = require("./folders.util");

const Thumbnails = {
    
    async generateAll(data={test: false}) {
        const images_path = path.join(__dirname, "..", "/images");

        let generated:any = {
            _all: true
        }
        
        await Promise.all(fs.readdirSync(images_path).map( async (username: string) => {
            // if its running as test it shouldn't check all users
            if ((data.test && username != "_test_thumbnails_util_generateAll") || username == "_test_sample") return false;

            const photos_path = path.join(images_path, `/${username}/photos`);

            generated[username] = {};

            await Promise.all(fs.readdirSync(photos_path).map( async (file: string) => {

                const thumbs_path = path.join(images_path, `${username}/photos_thumb/${file}`)
                const progressive_path = path.join(images_path, `${username}/progressive_thumb/${file}`)

                if (!fs.existsSync(thumbs_path) || !fs.existsSync(progressive_path)) {

                    const res = await this.generate(file, username);
                    if (!res.thumbnail || !res.progressive_thumbnail) generated._all = false;
                    generated[username][file] = res

                } else {
                    generated[username][file] = {
                        thumbnail: true,
                        progressive_thumbnail: true
                    }
                }
            }))

        }))

        return generated;
    },

    async generate(name: string, username: string) {
        const src = path.join(__dirname, "..", `/images/${username}/photos/${name}`);

        const promise = await new Promise((resolve, reject) => {
            const w = sizeOf(src).width

            sharp(fs.readFileSync(src))
                .resize({ width: Math.min(w, 600) })
                .toBuffer()
                .then((x: Buffer) => {
                    const thumbs_path = path.join(__dirname, "..", `/images/${username}/photos_thumb/${name}`);
                    if (!fs.existsSync(thumbs_path)) Folders.create(username)
                    fs.writeFileSync(thumbs_path, x);
                    resolve(true)
                });
        })

        const promise2 = await new Promise((resolve, reject) => {
            sharp(fs.readFileSync(src))
                .resize({ width: 5 })
                .toBuffer()
                .then((x: Buffer) => {
                    const progressive_path = path.join(__dirname, "..", `/images/${username}/progressive_thumb/${name}`);
                    if (!fs.existsSync(progressive_path)) Folders.create(username)
                    fs.writeFileSync(progressive_path, x);
                    resolve(true)
                });
        })
        
        return {
            thumbnail: promise,
            progressive_thumbnail: promise2
        }
    },

    deleteUnused(data={test: false}) {
        const src = path.join(__dirname, "..", "/images/");

        fs.readdirSync(src).forEach((username: string) => {
            // if its running as test it shouldn't check all users
            if ((data.test && username != "_test_thumbnails_util_delete") || username == "_test_sample") {return false}
            const thumbs_path = path.join(__dirname, "..", `/images/${username}/photos_thumb`);

            if (!fs.existsSync(thumbs_path)) Folders.create(username)

            fs.readdirSync(thumbs_path).forEach((file: string) => {
                const photo_path = path.join(__dirname, "..", `/images/${username}/photos/${file}`)

                if (!fs.existsSync(photo_path)) {
                    const thumb_path = path.join(__dirname, "..", `/images/${username}/photos_thumb/${file}`)
                    fs.rmSync(thumb_path);
                }
            })
        })

        fs.readdirSync(src).forEach((username: string) => {
            // if its running as test it shouldn't check all users
            if (data.test && username != "_test_thumbnails_util_delete") return false;
            const progressive_path = path.join(__dirname, "..", `/images/${username}/progressive_thumb`);

            if (!fs.existsSync(progressive_path)) Folders.create(username)

            fs.readdirSync(progressive_path).forEach((file: string) => {
                const photo_path = path.join(__dirname, "..", `/images/${username}/photos/${file}`)

                if (!fs.existsSync(photo_path)) {
                    const progressive_thumb_path = path.join(__dirname, "..", `/images/${username}/progressive_thumb/${file}`)
                    fs.rmSync(progressive_thumb_path);
                }
            })
        })
    }
}

module.exports = Thumbnails;