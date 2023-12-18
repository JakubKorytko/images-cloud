import React, { useState } from 'react';
import { FileDrop } from 'react-file-drop';
import { Modal, Button } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { AxiosProgressEvent } from 'axios';
import { RootState } from '../../app/store';
import { setShowUploadMimeTypeModal, setShowProgressModal, setShowUploadModal } from '../../features/componentsVisibility';
import { setImages } from '../../features/images';
import FetchImageUtil from '../../utils/fetchImage.util';
import Progress from './Progress';
import styles from './Upload.module.scss';
import './filedrop.scss';

function Upload() {
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

  const setProgress = async (x: number): Promise<void> => {
    setUploadingPercentage(x);
    if (x === 100) {
      dispatch(setImages(await FetchImageUtil.getList()));
      setTimeout((): void => {
        dispatch(setShowProgressModal(false));
      }, 300);
    }
  };

  const sendImage = async (fileToSend: File): Promise<boolean> => {
    const updateProgress = (data: AxiosProgressEvent): void => {
      const total = data.total ? data.total : 1;
      setProgress(Math.round(100 * (data.loaded / total)));
    };
    await FetchImageUtil.sendToServer(fileToSend, updateProgress);
    const images = await FetchImageUtil.getList();
    dispatch(setImages(images));
    return true;
  };

  const uploadFile = async (): Promise<void> => {
    if (!file) return;
    dispatch(setShowUploadModal(false));
    dispatch(setShowProgressModal(true));
    const res = await sendImage(file);
    if (!res) {
      dispatch(setShowUploadMimeTypeModal(true));
    }
    cancelFile();
  };

  const hide = (): void => {
    cancelFile();
    dispatch(setShowUploadModal(false));
  };

  const resetProgress = (): void => setUploadingPercentage(0);

  const transferDisplay = fileAttached ? 'flex' : 'none';
  const cardDisplay = fileAttached ? 'none' : 'flex';
  const bodyHeight = fileAttached ? 'fit' : '110px';

  return (
    <>
      <Modal
        backdrop="static"
        show={show}
        keyboard={false}
        onHide={hide}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Upload image (png/jpg/jpeg)</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className={styles[`h-${bodyHeight}`]}>
            <FileDrop onDrop={transferFile}>
              <div className={`card-img-overlay ${styles.center} d-${cardDisplay} text-center`}>
                <fieldset className={styles.zone}>

                  <div className="no-file">
                    <legend>Drop a file inside&hellip;</legend>
                    <input
                      data-testid="upload"
                      className={styles['text-last-center']}
                      onChange={(event): void => {
                        const ev = event;
                        transferFile(ev.target.files);
                        ev.target.value = '';
                      }}
                      aria-label="Select file to upload"
                      type="file"
                    />
                    <p>
                      Or click button to
                      {' '}
                      <em>Browse</em>
                      ..
                    </p>
                  </div>

                  <div className={styles['file-hold']}>
                    <legend>Drop here!</legend>
                  </div>

                  <div className={styles['file-over']}>
                    <legend>Drop now!</legend>
                  </div>

                </fieldset>
              </div>
            </FileDrop>
            <div className={`${styles['transfer-file']} d-${transferDisplay}`}>
              <div className="m-2">
                File selected! Click button below to transfer file
              </div>
              <div className={styles['upload-select-buttons']}>
                <Button onClick={uploadFile} className="m-2" variant="primary" disabled={!fileAttached}>
                  <span className={styles['no-break']}>Upload file</span>
                </Button>
                <Button onClick={cancelFile} className="m-2" variant="primary" disabled={!fileAttached}>
                  <span className={styles['no-break']}>Select other file</span>
                </Button>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
      <Progress value={uploadingPercentage} reset={resetProgress} />
    </>
  );
}

export default Upload;
