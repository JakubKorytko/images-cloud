import React, { useState } from 'react';
import { FileDrop } from 'react-file-drop';
import { Modal, Button } from 'react-bootstrap';
import '../../../scss/upload.scss';
import { UploadProps } from '../../../types/upload';

import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../app/store";
import { setShowUploadMimeTypeModal, setShowProgressModal, setShowUploadModal } from "../../../features/componentsVisibility";
import {setImages} from "../../../features/images";
import {fetchImages, sendImage} from "../../../utils/GalleryRoute/images.util";
import {AxiosProgressEvent} from "axios/index";
import Progress from "./Progress";

const Upload = () => {
    const [fileAttached, setFileAttached] = useState(false);
    const [file, setFile] = useState<File | undefined>(undefined);
    const [uploadingPercentage, setUploadingPercentage] = useState(0);

    const show = useSelector((state: RootState) => state.componentsVisibility.showUploadModal);
    const dispatch = useDispatch();

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
      if (!file) return;
      dispatch(setShowUploadModal(false));
      dispatch(setShowProgressModal(true));
      console.log(file);
      debugger;
      const res = await sendPhoto(file);
      if (!res) {
        dispatch(setShowUploadMimeTypeModal(true));
      }
      cancelFile();
    };


    const setProgress = async (x: number): Promise<void> => {
      await setUploadingPercentage(x);
      if (x === 100) {
        dispatch(setImages(await fetchImages()));
        setTimeout((): void => {
          dispatch(setShowProgressModal(false));
        }, 300);
      }
    };

    const resetProgress = (): void => setUploadingPercentage(0);


  const sendPhoto = async (file: File): Promise<boolean> => {
    const updateProgress = (data: AxiosProgressEvent): void => {
      const total = data.total ? data.total : 1;
      setProgress(Math.round(100 * (data.loaded / total)));
    }
    await sendImage(file, updateProgress);
    const images = await fetchImages();
    dispatch(setImages(images));
    return true;
  }

    const transferDisplay = fileAttached ? 'flex' : 'none';
    const cardDisplay = fileAttached ? 'none' : 'flex';
    const bodyHeight = fileAttached ? 'fit' : '110px';

    return (
        <>
      <Modal
        backdrop="static"
        show={show}
        keyboard={false}
        onHide={() => dispatch(setShowUploadModal(false))}
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
          <Progress value={uploadingPercentage} reset={resetProgress}/>
          </>
    );
}

export default Upload;
