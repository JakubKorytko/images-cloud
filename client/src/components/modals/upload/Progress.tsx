import { Modal, ProgressBar } from 'react-bootstrap';
import '../../../scss/upload.scss';
import { ProgressProps } from './Progress.type';
import { useSelector } from "react-redux";
import { RootState } from "../../../app/store";
import {setImages} from "../../../features/images";
import {fetchImages} from "../../../utils/GalleryRoute/images.util";
import {setShowProgressModal} from "../../../features/componentsVisibility";

const Progress = (props: ProgressProps) => {

  const show = useSelector((state: RootState) => state.componentsVisibility.showProgressModal);

  return (
    <Modal
      backdrop="static"
      show={show}
      keyboard={false}
      onExited={props.reset}
      centered
    >
      <Modal.Header className="justify-content-center">
        <Modal.Title>Uploading in progress...</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="progress-div">
          <ProgressBar id="progress-bar" aria-label="Progress bar" now={props.value} label={`${props.value}%`} />
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default Progress;
