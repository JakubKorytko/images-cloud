import React, { ReactElement, useEffect, useState } from 'react';
import { Rings } from 'react-loader-spinner';
import { Navigate } from 'react-router';

import { authTest } from 'utils/testConnection.util';
import Token from 'utils/token.util';

import styles from 'routes/Authorization.module.scss';

function Authorization(props: { loginPage: boolean, path: ReactElement | null }) {
  const [res, setRes] = useState<boolean | undefined>(undefined);

  const { loginPage, path } = props;

  useEffect(() => {
    const requestHeaders: HeadersInit = new Headers();
    requestHeaders.set('Authorization', `Bearer ${Token.value}`);

    authTest().then((test) => {
      if (test.resCode === 'SERVER_DOWN' || test.resCode === 'AUTH_ERROR') window.location.href = test.redirect;

      if (test.resCode === 'AUTH_OK') setRes(true);
      else if (test.resCode === 'UN_AUTH') setRes(false);
    }).catch(() => {
      window.location.href = '/status?redirected';
    });
  }, []);

  const x = res;

  const loader = (<div className={styles.loader}><Rings height="200" width="200" color="grey" ariaLabel="loading" /></div>);

  if (loginPage) {
    if (x === false) { return path; }
    if (x === undefined) { return loader; }
    return <Navigate to="/" />;
  }
  if (x === false) { return <Navigate to="/login" />; }
  if (x === undefined) { return loader; }
  return path;
}

export default Authorization;
