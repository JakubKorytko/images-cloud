import { useEffect, useState } from 'react';
import {
  Container, Row, Col, Card,
} from 'react-bootstrap';
import { CircleFill } from 'react-bootstrap-icons';
import HealthCheckModal from '../components/modals/HealthCheckModal';
import '../scss/App.scss';

const serverUrl = process.env.REACT_APP_SERVER_URL;
const connection_test_interval: number = Number(process.env.REACT_APP_CONNECTION_TEST_INTERVAL);

const getTime = (): string => {
  const date = new Date();

  let h: string | number = date.getHours();
  let m: string | number = date.getMinutes();
  let s: string | number = date.getSeconds();

  if (h < 10) h = `0${h}`;
  if (m < 10) m = `0${m}`;
  if (s < 10) s = `0${s}`;

  const time = `${h}:${m}:${s}`;

  return time;
};

const HealthCheck = (): JSX.Element => {
  const [time, setTime] = useState<string>(getTime());
  const [serverStatus, setServerStatus] = useState<boolean | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);

  useEffect(() => {
    if (window.location.search === '?redirected') setShowModal(true);
    setInterval(authUser, connection_test_interval);
  }, []);

  const handleClose = (): void => {
    setShowModal(false);
  };

  const setStatus = (status: boolean): void => {
    setServerStatus(status);
    setTime(getTime());
  };

  const authUser = (): void => {
    fetch(`${serverUrl}/health`).then((response) => {
      if (!response.ok) {
        setStatus(false);
      }
    }).then((data) => {
      setStatus(true);
    }).catch((error) => {
      setStatus(false);
    });
  };

  let headerBg = 'initial';
  let footerBg = 'initial';

  if (serverStatus !== null) {
    headerBg = serverStatus ? 'c2ffc2' : 'ffc2c2';
    footerBg = serverStatus ? '95ff95' : 'ff9595';
  }

  const statusText = serverStatus !== null ? (serverStatus ? 'Online' : 'Offline') : 'Checking...';
  const textColor = serverStatus ? 'green' : 'red';

  return (
    <Container className="center wh-100">
      <Row>
        <Col>
          <Card className="text-center">
            <Card.Header className={`bg-${headerBg}`}>On this site you can check if server is down</Card.Header>
            <Card.Body>
              <Card.Title>Server status</Card.Title>
              <Card.Text aria-label="Server status">
                {serverStatus !== null ? <CircleFill aria-label="Server status icon" className={`align-baseline c-${textColor}`} /> : null}
                {' '}
                {statusText}
                </Card.Text>
            </Card.Body>
            <Card.Footer className={`bg-${footerBg} text-muted`}>
              Last checked:
              {time}
            </Card.Footer>
            </Card>
        </Col>
        </Row>

        <HealthCheckModal show={showModal} closeHandler={handleClose} />
    </Container>
    );
}

export default HealthCheck;
