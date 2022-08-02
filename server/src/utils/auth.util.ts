// var me = { id: 2137, username: "tunczyk", password: "zaq123" }
const jwt = require("jsonwebtoken");
const users = require("../utils/users.util");
require('dotenv').config();
const SERVER_URL = process.env.SERVER_URL;

const encode = (secret: string) => async (username: string, password: string) => {
    const user = await users.loginUser(username, password)
    if (!user || user.password !== password) {
        return false;
    }

    return jwt.sign(
        {
            username: user.username,
        },
        secret,
        {
            issuer: SERVER_URL,
            subject: `${user.id}`,
            expiresIn: 30 * 60,
        }
    );
};


const decode = (secret: string) => (token: string | undefined) => {
    let decoded: any = false;
    if (typeof token !== "string") return false;
    const splittenToken = token.split(" ");
    if (splittenToken[0] != "Bearer") return false;
    try {
        decoded = jwt.verify(splittenToken[1], secret);
    } catch (error) {
        let message = 'Unknown Error'
        if (error instanceof Error) message = error.message
        // console.log(error);
        return false;
    }
    if (decoded.error != undefined) return false;
    return decoded;
}


module.exports = { encode: encode, decode: decode }