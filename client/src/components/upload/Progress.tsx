import React from 'react';
import { Modal, ProgressBar } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import styles from './Progress.module.scss';
import { ProgressProps } from './Progress.type';
import { RootState } from '../../app/store';

function Progress(props: ProgressProps) {
  const show = useSelector((state: RootState) => state.componentsVisibility.showProgressModal);

  const { reset, value } = props;

  return (
    <Modal
      backdrop="static"
      show={show}
      keyboard={false}
      onExited={reset}
      centered
    >
      <Modal.Header className="justify-content-center">
        <Modal.Title>Uploading in progress...</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className={styles['progress-div']}>
          <ProgressBar className={styles['progress-bar']} aria-label="Progress bar" now={value} label={`${value}%`} />
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default Progress;
