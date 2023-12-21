import jwt from 'jsonwebtoken';

import { decode, encode } from '../../../src/utils/auth.util';

require('dotenv').config();

const secret = process.env.APP_SECRET;
const secretString = secret || '';
test('Encoding should return token if user exists', async () => {
  const token = {
    true: await encode(secretString)('_testuser', 'qwerty123'),
    false: await encode(secretString)('_null', 'qwerty123'),
  };

  expect(token.true).toBeTruthy();
  expect(token.false).toBe(false);
});

test('Decoding should return object', () => {
  const { SERVER_URL } = process.env;

  const token = jwt.sign(
    {
      username: '_testuser',
    },
    secretString,
    {
      issuer: SERVER_URL,
      subject: '1',
      expiresIn: 30 * 60,
    },
  );

  const tokenWithBearer = decode(secretString)(`Bearer ${token}`);
  const wrongTokenWithBearer = decode(secretString)('Bearer qwerty');

  const tokenWithoutBearer = decode(secretString)(token);
  const wrongTokenWithoutBearer = decode(secretString)('qwerty');

  expect(wrongTokenWithBearer).toBe(false);
  expect(tokenWithoutBearer).toBe(false);
  expect(wrongTokenWithoutBearer).toBe(false);

  expect(tokenWithBearer.username).toBeDefined();
});
