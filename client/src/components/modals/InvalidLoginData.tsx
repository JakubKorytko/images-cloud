import { Modal, Button } from 'react-bootstrap';

const InvalidLoginData = (props: { show: boolean, closeHandler: Function }) => {
    const closeHandler = (): void => {
        props.closeHandler();
    };

    return (
        <Modal centered show={props.show} onHide={closeHandler}>
        <Modal.Header closeButton>
            <Modal.Title className="text-danger">Wrong username or password!</Modal.Title>
        </Modal.Header>
        <Modal.Body>Please try again</Modal.Body>
        <Modal.Footer>
            <Button variant="secondary" onClick={closeHandler}>
            Okay...
            </Button>
        </Modal.Footer>
        </Modal>

    );
}

export default InvalidLoginData;
