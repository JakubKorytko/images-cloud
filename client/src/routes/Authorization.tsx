import React, {useState, useEffect} from 'react';
import { Navigate } from 'react-router';
import { Rings } from 'react-loader-spinner';
import Token from '../utils/token.util';
import { authTest } from '../utils/connectionTest.util';

const Authorization = (props: { loginPage: boolean, path: JSX.Element }) => {
    const [res, setRes] = useState<boolean | undefined>(undefined);

    useEffect(() => {
        const requestHeaders: HeadersInit = new Headers();
        requestHeaders.set('Authorization', `Bearer ${Token.value}`);

        authTest().then(test => {

          if (test.resCode === 'SERVER_DOWN' || test.resCode === 'AUTH_ERROR') window.location.href = test.redirect;

          if (test.resCode === 'AUTH_OK') setRes(true);
          else if (test.resCode === 'UNAUTH') setRes(false);

        }).catch(() => {
          window.location.href = '/status?redirected';
        })
    }, []);

    const x = res;

    const loader = (<div className="loader"><Rings height="200" width="200" color="grey" ariaLabel="loading" /></div>);

    if (props.loginPage === true) {
        if (x === false) { return props.path; }
        if (x === undefined) { return loader; }
        return <Navigate to="/" />;
    }
    if (x === false) { return <Navigate to="/login" />; }
    if (x === undefined) { return loader; }
    return props.path;
}

export default Authorization;
