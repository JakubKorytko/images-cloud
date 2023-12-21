import jwt from 'jsonwebtoken';
import users from 'utils/users.util';

require('dotenv').config();

const { SERVER_URL } = process.env;
const JWT_EXPIRATION = Number(process.env.JWT_EXPIRATION);

const encode = (secret: string) => async (username: string, password: string) => {
  const user = await users.loginUser(username, password);
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
      expiresIn: JWT_EXPIRATION * 60,
    },
  );
};

const decode = (secret: string) => (token: string | undefined) => {
  let decoded: any = false;
  if (typeof token !== 'string') return false;
  const splitToken = token.split(' ');
  if (splitToken[0] !== 'Bearer') return false;
  try {
    decoded = jwt.verify(splitToken[1], secret);
  } catch (error) {
    return false;
  }
  if (decoded.error !== undefined) return false;
  return decoded;
};

export { encode, decode };
