import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { DeleteModalProps } from './DeleteModal.type';
import { RootState } from '../../app/store';
import { setShowDeleteModal } from '../../features/componentsVisibility';
import { setImages, setSelected } from '../../features/images';
import { deleteImages, fetchImages } from '../../utils/images.util';

function DeleteModal(props: DeleteModalProps) {
  const display = useSelector((state: RootState) => state.componentsVisibility.showDeleteModal);
  const images = useSelector((state: any) => state.images.list);
  const selectedImages = useSelector((state: RootState) => state.images.selected);

  const dispatch = useDispatch();
  const hide = () => dispatch(setShowDeleteModal(false));

  const deletePhotos = async (): Promise<void> => {
    const selected = selectedImages;
    dispatch(setSelected([]));

    await deleteImages(images, selected);

    dispatch(setImages(await fetchImages()));
    dispatch(setShowDeleteModal(false));
  };

  const { deletePhoto } = props;

  return (
    <Modal
      show={display}
      onHide={hide}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>Delete image</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Are you sure that you want to delete
        {' '}
        {selectedImages.length > 1 ? 'these images' : 'this image'}
        ? You can&apos;t undo this action.
      </Modal.Body>
      <Modal.Footer>
        <Button variant="danger" onClick={selectedImages.length > 0 ? deletePhotos : deletePhoto}>
          Delete
        </Button>
        <Button variant="secondary" onClick={hide}>Don&apos;t delete it!</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default DeleteModal;
