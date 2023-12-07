import { Component } from 'react';
import { Button, Modal } from 'react-bootstrap';
import {DeleteModalProps, DeleteModalState} from "../../types/deleteModal";

class DeleteModal extends Component<DeleteModalProps, DeleteModalState> {

    render() {
        return (
            <>
                <Modal
                    show={this.props.deleteModalDisplay}
                    onHide={(): void => {this.props.hideDeleteModal()}}
                    backdrop="static"
                    keyboard={false}
                >
                    <Modal.Header closeButton>
                        <Modal.Title>Delete image</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                    Are you sure that you want to delete {this.props.multiDelete>1?"these images":"this image"}? You can't undo this action.
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="danger" onClick={this.props.multiDelete>0?this.props.deletePhotos:this.props.deletePhoto}>
                            Delete
                        </Button>
                        <Button variant="secondary" onClick={(): void => {this.props.hideDeleteModal()}}>Don't delete it!</Button>
                    </Modal.Footer>
                </Modal>
            </>
        );
    }
}

export default DeleteModal;