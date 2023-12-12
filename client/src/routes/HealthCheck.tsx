import { Component } from 'react';
import {
  Container, Row, Col, Card,
} from 'react-bootstrap';
import { CircleFill } from 'react-bootstrap-icons';
import HealthCheckModal from '../components/modals/HealthCheckModal';
import '../scss/App.scss';

const serverUrl = process.env.REACT_APP_SERVER_URL;
const connection_test_interval: number = Number(process.env.REACT_APP_CONNECTION_TEST_INTERVAL);

class HealthCheck extends Component<{}, { time: string, showModal: boolean, serverStatus: boolean | null }> {
  constructor(props: {}) {
    super(props);
    this.state = {
      time: this.getTime(),
      serverStatus: null,
      showModal: false,
    };
  }

  componentDidMount() {
    if (window.location.search === '?redirected') this.setState({ showModal: true });
    setInterval(this.authUser, connection_test_interval);
  }

  handleClose = (): void => {
    this.setState({ showModal: false });
  };

  getTime = (): string => {
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

  setStatus = (status: boolean): void => {
    this.setState({ serverStatus: status });
    this.setState({ time: this.getTime() });
  };

  authUser = (): void => {
    fetch(`${serverUrl}/health`).then((response) => {
      if (!response.ok) {
        this.setStatus(false);
      }
    }).then((data) => {
      this.setStatus(true);
    }).catch((error) => {
      this.setStatus(false);
    });
  };

  render() {
    let headerBg = 'initial';
    let footerBg = 'initial';

    if (this.state.serverStatus !== null) {
      headerBg = this.state.serverStatus ? 'c2ffc2' : 'ffc2c2';
      footerBg = this.state.serverStatus ? '95ff95' : 'ff9595';
    }

    const statusText = this.state.serverStatus !== null ? (this.state.serverStatus ? 'Online' : 'Offline') : 'Checking...';
    const textColor = this.state.serverStatus ? 'green' : 'red';

    return (
      <Container className="center wh-100">
        <Row>
          <Col>
            <Card className="text-center">
              <Card.Header className={`bg-${headerBg}`}>On this site you can check if server is down</Card.Header>
              <Card.Body>
                <Card.Title>Server status</Card.Title>
                <Card.Text aria-label="Server status">
                  {this.state.serverStatus !== null ? <CircleFill aria-label="Server status icon" className={`align-baseline c-${textColor}`} /> : null}
                  {' '}
                  {statusText}
                </Card.Text>
              </Card.Body>
              <Card.Footer className={`bg-${footerBg} text-muted`}>
                Last checked:
                {this.state.time}
              </Card.Footer>
            </Card>
          </Col>
        </Row>

        <HealthCheckModal show={this.state.showModal} closeHandler={this.handleClose} />
      </Container>
    );
  }
}

export default HealthCheck;
