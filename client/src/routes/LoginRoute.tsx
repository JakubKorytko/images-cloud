import React, { ChangeEvent } from 'react';
import '../scss/App.scss';
import '../scss/login.scss';
import {
  Container, Row, Col, Form, Button, InputGroup, NavbarBrand,
} from 'react-bootstrap';
import { CloudFill } from 'react-bootstrap-icons';
import { authTest } from '../utils/connectionTest.util';
import { LoginRouteProps, LoginRouteState } from '../types/loginRoute';
import Token from '../utils/token.util';
import InvalidLoginData from '../components/modals/InvalidLoginData';
import SessionExpired from '../components/modals/SessionExpired';

const serverUrl = process.env.REACT_APP_SERVER_URL;
const connection_test_interval: number = Number(process.env.REACT_APP_CONNECTION_TEST_INTERVAL);

class App extends React.Component<LoginRouteProps, LoginRouteState> {
  constructor(props: LoginRouteProps) {
    super(props);
    this.state = {
      username: '',
      password: '',
      usernameValid: true,
      passwordValid: true,
      logged: false,
      showExpiredModal: false,
      showWrongModal: false,
    };
  }

  componentDidMount() {
    if (window.location.search === '?redirected') this.setState({ showExpiredModal: true });
    setInterval((): void => {
      authTest().then((res): void => {
        if (res.redirect
          && (res.resCode === 'AUTH_ERROR' || res.resCode === 'SERVER_DOWN' || res.resCode === 'AUTH_OK')
        ) window.location.href = res.redirect;
      });
    }, connection_test_interval);
  }

  // --- password, username setters ---

  updateUsername = (ev: ChangeEvent<HTMLInputElement>): boolean => {
    if (!ev) return false;

    const val: string = ev.currentTarget.value;

    this.setState({ usernameValid: true });

    this.setState({
      username: val,
    });

    return true;
  };

  updatePassword = (ev: ChangeEvent<HTMLInputElement>): boolean => {
    if (!ev) return false;

    const val: string = ev.target.value;

    this.setState({ passwordValid: true });

    this.setState({
      password: val,
    });

    return true;
  };

  // ---

  // --- validation & authentication ---

  validateForms = (): void => {
    if (!this.state.username) {
      this.setState({
        usernameValid: false,
      });
    } else {
      this.setState({
        usernameValid: true,
      });
    }

    if (!this.state.password) {
      this.setState({
        passwordValid: false,
      });
    } else {
      this.setState({
        passwordValid: true,
      });
    }
  };

  authenticate = async (): Promise<boolean> => {
    const response = await fetch(`${serverUrl}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: this.state.username,
        password: this.state.password,
      }),
    });
    const json = await response.json();
    if (json.token === false) {
      this.setState({ showWrongModal: true });
      return false;
    }
    Token.value = json.token;
    this.loginValidation();
    return true;
  };

  // ---

  handleSubmit = (event: React.FormEvent<HTMLFormElement>): boolean => {
    const form = event.currentTarget;

    event.preventDefault();
    event.stopPropagation();

    this.validateForms();

    if (form.checkValidity() === false) {
      return false;
    }

    this.authenticate();

    return true;
  };

  loginValidation = (): void => {
    window.open('/', '_self');
  };

  handleExpiredClose = (): void => {
    this.setState({ showExpiredModal: false });
  };

  handleWrongClose = (): void => {
    this.setState({ showWrongModal: false });
  };

  render() {
    return (
      <div className="app">
        <div className="center wh-100">
          <Container className="center bg-dark" id="login-container">
            <div>
              <Row id="login-row">
                <Col id="login-col" className="mb-4">
                  <NavbarBrand>
                    <CloudFill />
                    {' '}
                    images-cloud
                  </NavbarBrand>
                </Col>
              </Row>
              <hr />
              <Row>
                <Col className="text-center">
                  <Form noValidate onSubmit={this.handleSubmit}>
                    <Form.Group>
                      <InputGroup hasValidation>
                        <Form.Control required isInvalid={!this.state.usernameValid} type="text" aria-label="Username" className="form-control w-250px" placeholder="Username" value={this.state.username} onChange={this.updateUsername} />
                        <Form.Control.Feedback className="c-ffd3d3" type="invalid">
                          Please choose a username.
                        </Form.Control.Feedback>
                      </InputGroup>
                    </Form.Group>
                    <br />

                    <Form.Group>
                      <InputGroup hasValidation>
                        <Form.Control required isInvalid={!this.state.passwordValid} type="password" aria-label="Password" className="form-control w-250px" placeholder="Password" value={this.state.password} onChange={this.updatePassword} />
                        <Form.Control.Feedback className="c-ffd3d3" type="invalid">
                          Please choose a password.
                        </Form.Control.Feedback>
                      </InputGroup>
                    </Form.Group>
                    <br />
                    <Button className="btn btn-light" aria-label="Login button" type="submit">Let me in!</Button>
                  </Form>
                </Col>
              </Row>
            </div>
          </Container>
        </div>

        <SessionExpired show={this.state.showExpiredModal} closeHandler={this.handleExpiredClose} />

        <InvalidLoginData show={this.state.showWrongModal} closeHandler={this.handleWrongClose} />

      </div>
    );
  }
}

export default App;
