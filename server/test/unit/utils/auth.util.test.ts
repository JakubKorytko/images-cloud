require('dotenv').config();
const secret = process.env.APP_SECRET;

test("Encoding should return token if user exists", async () => {
    const {encode} = require("../../../src/utils/auth.util");
    
    const token = {
        true: await encode(secret)("_testuser", "qwerty123"),
        false: await encode(secret)("_null", "qwerty123")
    }

    expect(token.true).toBeTruthy();
    expect(token.false).toBe(false);

})


test("Decoding should return object", () => {
    const {decode} = require("../../../src/utils/auth.util");
    require('dotenv').config();
    const SERVER_URL = process.env.SERVER_URL;
    const jwt = require("jsonwebtoken");

    const token = jwt.sign(
        {
            username: "_testuser",
        },
        secret,
        {
            issuer: SERVER_URL,
            subject: `1`,
            expiresIn: 30 * 60,
        }
    );

    const tokenWithBearer = decode(secret)(`Bearer ${token}`);
    const wrongTokenWithBearer = decode(secret)("Bearer qwerty");

    const tokenWithoutBearer = decode(secret)(token);
    const wrongTokenWithoutBearer = decode(secret)("qwerty");

    expect(wrongTokenWithBearer).toBe(false);
    expect(tokenWithoutBearer).toBe(false);
    expect(wrongTokenWithoutBearer).toBe(false);

    expect(tokenWithBearer.username).toBeDefined();

})