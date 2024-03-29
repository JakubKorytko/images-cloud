import React, { ChangeEvent, useEffect, useState } from 'react';
import {
  Button, Col, Container, Form, InputGroup, NavbarBrand, Row,
} from 'react-bootstrap';
import { CloudFill } from 'react-bootstrap-icons';

import { authTest } from 'utils/testConnection.util';
import Token from 'utils/token.util';

import InvalidLoginData from 'components/modals/InvalidLoginData';
import SessionExpired from 'components/modals/SessionExpired';

import styles from 'routes/LoginRoute.module.scss';

const serverUrl = process.env.REACT_APP_SERVER_URL;
const CONNECTION_TEST_INTERVAL: number = Number(process.env.REACT_APP_CONNECTION_TEST_INTERVAL);

function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [usernameValid, setUsernameValid] = useState(true);
  const [passwordValid, setPasswordValid] = useState(true);
  const [showExpiredModal, setShowExpiredModal] = useState(false);
  const [showWrongModal, setShowWrongModal] = useState(false);

  useEffect(() => {
    if (window.location.search === '?redirected') setShowExpiredModal(true);
    setInterval((): void => {
      authTest().then((res): void => {
        if (res.redirect
            && (res.resCode === 'AUTH_ERROR' || res.resCode === 'SERVER_DOWN' || res.resCode === 'AUTH_OK')
        ) window.location.href = res.redirect;
      });
    }, CONNECTION_TEST_INTERVAL);
  }, []);

  // --- password, username setters ---

  const updateUsername = (ev: ChangeEvent<HTMLInputElement>): boolean => {
    if (!ev) return false;

    const val: string = ev.currentTarget.value;

    setUsernameValid(true);

    setUsername(val);

    return true;
  };

  const updatePassword = (ev: ChangeEvent<HTMLInputElement>): boolean => {
    if (!ev) return false;

    const val: string = ev.target.value;

    setPasswordValid(true);

    setPassword(val);

    return true;
  };

  // ---

  // --- validation & authentication ---

  const validateForms = (): void => {
    if (!username) {
      setUsernameValid(false);
    } else {
      setUsernameValid(true);
    }

    if (!password) {
      setPasswordValid(false);
    } else {
      setPasswordValid(true);
    }
  };

  const loginValidation = (): void => {
    window.open('/', '_self');
  };

  const authenticate = async (): Promise<boolean> => {
    const response = await fetch(`${serverUrl}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username,
        password,
      }),
    });
    const json = await response.json();
    if (json.token === false) {
      setShowWrongModal(true);
      return false;
    }
    Token.value = json.token;
    loginValidation();
    return true;
  };

  // ---

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<boolean> => {
    const form = event.currentTarget;

    event.preventDefault();
    event.stopPropagation();

    validateForms();

    if (!form.checkValidity()) {
      return false;
    }

    return authenticate();
  };

  const handleExpiredClose = (): void => {
    setShowExpiredModal(false);
  };

  const handleWrongClose = (): void => {
    setShowWrongModal(false);
  };

  return (
    <div className={styles.app}>
      <div className={`${styles.center} ${styles['wh-100']}`}>
        <Container className={`${styles.center} bg-dark ${styles['login-container']}`}>
          <div>
            <Row className={styles['login-row']}>
              <Col className={`mb-4 ${styles['login-col']}`}>
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
                <Form noValidate onSubmit={handleSubmit}>
                  <Form.Group>
                    <InputGroup hasValidation>
                      <Form.Control required isInvalid={!usernameValid} type="text" aria-label="Username" className={`form-control ${styles['w-250px']}`} placeholder="Username" value={username} onChange={updateUsername} />
                      <Form.Control.Feedback className={styles['c-ffd3d3']} type="invalid">
                        Please choose a username.
                      </Form.Control.Feedback>
                    </InputGroup>
                  </Form.Group>
                  <br />

                  <Form.Group>
                    <InputGroup hasValidation>
                      <Form.Control required isInvalid={!passwordValid} type="password" aria-label="Password" className={`form-control ${styles['w-250px']}`} placeholder="Password" value={password} onChange={updatePassword} />
                      <Form.Control.Feedback className={styles['c-ffd3d3']} type="invalid">
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

      <SessionExpired show={showExpiredModal} closeHandler={handleExpiredClose} />

      <InvalidLoginData show={showWrongModal} closeHandler={handleWrongClose} />

    </div>
  );
}

export default App;
