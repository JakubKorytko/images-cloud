import React from 'react';
import { Button, Modal } from 'react-bootstrap';

import FetchImageUtil from 'utils/fetchImage.util';

import { useAppDispatch, useAppSelector } from 'app/hooks';

import { setShowDeleteModal } from 'features/componentsVisibility';
import { setImages, setSelected } from 'features/images';

import type { DeleteModalProps } from 'components/modals/DeleteModal.type';

function DeleteModal(props: DeleteModalProps) {
  const display = useAppSelector((state) => state.componentsVisibility.showDeleteModal);
  const images = useAppSelector((state) => state.images.list);
  const selectedImages = useAppSelector((state) => state.images.selected);

  const dispatch = useAppDispatch();
  const hide = () => dispatch(setShowDeleteModal(false));

  const deleteImages = async (): Promise<void> => {
    const selected = selectedImages;
    dispatch(setSelected([]));

    await FetchImageUtil.deleteMany(images, selected);

    dispatch(setImages(await FetchImageUtil.getList()));
    dispatch(setShowDeleteModal(false));
  };

  const { deleteImage } = props;

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
        <Button variant="danger" onClick={selectedImages.length > 0 ? deleteImages : deleteImage}>
          Delete
        </Button>
        <Button variant="secondary" onClick={hide}>Don&apos;t delete it!</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default DeleteModal;
