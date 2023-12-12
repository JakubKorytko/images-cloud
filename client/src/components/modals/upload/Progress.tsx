import { Modal, ProgressBar } from 'react-bootstrap';
import '../../../scss/upload.scss';
import { ProgressProps } from '../../../types/progress';

const Progress = (props: ProgressProps) => {
  return (
    <Modal
      backdrop="static"
      show={props.show}
      keyboard={false}
      onExited={props.reset}
      centered
    >
      <Modal.Header className="justify-content-center">
        <Modal.Title>Uploading in progress...</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="progress-div">
          <ProgressBar id="progress-bar" aria-label="Progress bar" now={props.percentage} label={`${props.percentage}%`} />
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default Progress;
