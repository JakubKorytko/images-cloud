import Token from 'utils/token.util';

const serverUrl = process.env.REACT_APP_SERVER_URL;

//  ===================================================
//                    RESPONSE CODES
//  ===================================================
//   UN_AUTH - Unauthorized or token expired
//   AUTH_ERROR - Error while trying to authenticate
//   SERVER_DOWN - Server is down
//   AUTH_OK - Auth test passed along with server test
//   SERVER_OK - Server test passed
//  ===================================================

// //========================================================\\
// ||                       serverTest                       ||
// |]========================================================[|
// || Function tests if server is running and returns object ||
// || with structure:                                        ||
// ||                                                        ||
// || {                                                      ||
// || resCode - short code explaining res value              ||
// || msg - text representation of returned code             ||
// || res - boolean determining if test went ok              ||
// || redirect - url to redirect when needed                 ||
// || }                                                      ||
// ||                                                        ||
// \\========================================================//

export function serverTest():
Promise<{ resCode: string, msg: string, res: boolean, redirect: string }> {
  return new Promise((resolve): void => {
    fetch(`${serverUrl}/health`).then((response) => {
      if (!response.ok) {
        resolve({
          resCode: 'SERVER_DOWN', msg: 'Server is down', res: false, redirect: '/status?redirected',
        });
      } else {
        resolve({
          resCode: 'SERVER_OK', msg: 'Server is running', res: true, redirect: '/',
        });
      }
    }).catch(() => {
      resolve({
        resCode: 'SERVER_DOWN', msg: 'Server is down', res: false, redirect: '/status?redirected',
      });
    });
  });
}

// //=================================================================\\
// ||                            authTest                             ||
// |]=================================================================[|
// || Function tests if server is running and returns object          ||
// || with structure:                                                 ||
// ||                                                                 ||
// || {                                                               ||
// || resCode - short code explaining res value                       ||
// || msg - text representation of returned code                      ||
// || res - boolean determining if test went ok                       ||
// || redirect - url to redirect when needed                          ||
// || data - object containing username - only if test was successful ||
// || }                                                               ||
// ||                                                                 ||
// \\=================================================================//

export function authTest(): Promise<{
  resCode: string, msg: string, res: boolean, data?: { username: string }, redirect: string }> {
  const requestHeaders: HeadersInit = new Headers();
  requestHeaders.set('Authorization', `Bearer ${Token.value}`);

  return new Promise((resolve): void => {
    serverTest().then((data) => {
      if (data.resCode === 'SERVER_DOWN') resolve(data);
      fetch(`${serverUrl}/auth`, {
        method: 'POST',
        headers: requestHeaders,
      }).then((response) => response.json()).then((json: { res: false | string }): void => {
        if (!json || !json.res) {
          Token.remove();
          resolve({
            resCode: 'UN_AUTH', msg: 'Unauthorized or token expired', res: false, redirect: '/login?redirected',
          });
        } else {
          resolve({
            resCode: 'AUTH_OK', msg: 'Authorized and server is running', res: true, data: { username: json.res }, redirect: '/',
          });
        }
      });
    }).catch((() => {
      resolve({
        resCode: 'AUTH_ERROR', msg: 'Error while trying to authenticate', res: false, redirect: '/status?redirected',
      });
    }));
  });
}
