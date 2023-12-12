import { Modal, Button } from 'react-bootstrap';

const HealthCheckModal = (props: { show: boolean, closeHandler: Function }) => {
    const closeHandler = (): void => {
        props.closeHandler();
    };

    return (
        <Modal centered show={props.show} onHide={closeHandler} animation={false}>
        <Modal.Header closeButton>
            <Modal.Title className="text-danger">Whoops! Server sent some errors...</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            There was an issue completing your request, on this website you can check if server is down and wait until it will start up again. If this was the mistake and server is running, return to the
            <a href="/">home page</a>
        </Modal.Body>
        <Modal.Footer>
            <Button variant="secondary" onClick={closeHandler}>
            Okay!
            </Button>
        </Modal.Footer>
        </Modal>
    );
}

export default HealthCheckModal;
