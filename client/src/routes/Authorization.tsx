import React from 'react';
import { Navigate } from 'react-router';
import { Rings } from 'react-loader-spinner';
import Token from '../utils/token.util';
import { authTest } from '../utils/connectionTest.util';

class Authorization extends React.Component<{ loginPage: boolean, path: JSX.Element }, { res: boolean | undefined }> {
  constructor(props: { loginPage: boolean, path: JSX.Element }) {
    super(props);
    this.state = {
      res: undefined,
    };
  }

  async componentDidMount() {
    const requestHeaders: HeadersInit = new Headers();
    requestHeaders.set('Authorization', `Bearer ${Token.value}`);

    const test = await authTest();

    if (test.resCode === 'SERVER_DOWN' || test.resCode === 'AUTH_ERROR') window.location.href = test.redirect;

    if (test.resCode === 'AUTH_OK') this.setState({ res: true });
    else if (test.resCode === 'UNAUTH') this.setState({ res: false });
  }

  render() {
    const x = this.state.res;

    const loader = (<div className="loader"><Rings height="200" width="200" color="grey" ariaLabel="loading" /></div>);

    if (this.props.loginPage === true) {
      if (x === false) { return this.props.path; }
      if (x === undefined) { return loader; }
      return <Navigate to="/" />;
    }
    if (x === false) { return <Navigate to="/login" />; }
    if (x === undefined) { return loader; }
    return this.props.path;
  }
}

export default Authorization;
