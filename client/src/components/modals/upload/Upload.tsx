import { useState } from 'react';
import { FileDrop } from 'react-file-drop';
import { Modal, Button } from 'react-bootstrap';
import '../../../scss/upload.scss';
import { UploadProps } from '../../../types/upload';

import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../app/store";
import { toggleUploadModal} from "../../../features/upload";
import { setUploadMimeTypeModal } from "../../../features/uploadMimeType";

const Upload = (props: UploadProps) => {
  const [fileAttached, setFileAttached] = useState(false);
    const [file, setFile] = useState<File | undefined>(undefined);

    const dispatch = useDispatch();
    const show = useSelector((state: RootState) => state.uploadModal.showUploadModal);

    const transferFile = (x: FileList | null): void => {
      if (x) {
        setFile(x[0]);
        setFileAttached(true);
      }
    };

    const cancelFile = (): void => {
      setFile(undefined);
      setFileAttached(false);
    };

    const uploadFile = async (): Promise<void> => {
      dispatch(toggleUploadModal());
      const res = await props.imageUpload(file);
      if (!res) {
        dispatch(setUploadMimeTypeModal(true));
      }
      cancelFile();
    };

    const transferDisplay = fileAttached ? 'flex' : 'none';
    const cardDisplay = fileAttached ? 'none' : 'flex';
    const bodyHeight = fileAttached ? 'fit' : '110px';

    return (
      <Modal
        backdrop="static"
        show={show}
        keyboard={false}
        onHide={() => dispatch(toggleUploadModal())}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Upload image (png/jpg/jpeg)</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className={`h-${bodyHeight}`}>
            <FileDrop onDrop={transferFile}>
              <div className={`card-img-overlay center d-${cardDisplay} text-center`}>
                <fieldset id="zone">

                  <div className="no-file">
                    <legend>Drop a file inside&hellip;</legend>
                    <input data-testid="upload" className="text-last-center" onChange={(ev): void => { transferFile(ev.target.files); ev.target.value = ''; }} aria-label="Select file to upload" type="file" />
                    <p>
                      Or click button to
                      <em>Browse</em>
                      ..
                    </p>
                  </div>

                  <div className="file-hold">
                    <legend>Drop here!</legend>
                  </div>

                  <div className="file-over">
                    <legend>Drop now!</legend>
                  </div>

                </fieldset>
              </div>
            </FileDrop>
            <div id="transfer-file" className={`d-${transferDisplay}`}>
              <div className="m-2">
                File selected! Click button below to transfer file
              </div>
              <div id="upload-select-buttons">
                <Button onClick={uploadFile} className="m-2" variant="primary" disabled={!fileAttached}>
                  <span className="no-break">Upload file</span>
                </Button>
                <Button onClick={cancelFile} className="m-2" variant="primary" disabled={!fileAttached}>
                  <span className="no-break">Select other file</span>
                </Button>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    );
}

export default Upload;
