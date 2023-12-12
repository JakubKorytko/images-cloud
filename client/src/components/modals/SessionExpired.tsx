import { Modal, Button } from 'react-bootstrap';

const SessionExpired = (props: { show: boolean, closeHandler: Function }) => {
    const closeHandler = (): void => {
        props.closeHandler();
    };

    return (
        <Modal centered show={props.show} onHide={closeHandler} animation={false}>
        <Modal.Header closeButton>
            <Modal.Title>Your session expired!</Modal.Title>
        </Modal.Header>
        <Modal.Body>Please login again</Modal.Body>
        <Modal.Footer>
            <Button variant="secondary" onClick={closeHandler}>
            Okay!
            </Button>
        </Modal.Footer>
        </Modal>
    );
}

export default SessionExpired;
