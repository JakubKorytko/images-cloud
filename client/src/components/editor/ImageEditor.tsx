import React from 'react';
import FilerobotImageEditor from 'react-filerobot-image-editor';

import download from 'utils/downloadFile.util';

import { useAppDispatch, useAppSelector } from 'app/hooks';

import { setShowImageEditor } from 'features/componentsVisibility';

import type { ImageEditorProps, SavedImageData } from 'components/editor/ImageEditor.type';

import styles from 'components/editor/ImageEditor.module.scss';

function ImageEditor(props: ImageEditorProps) {
  const display = useAppSelector((state) => state.componentsVisibility.showImageEditor);
  const dispatch = useAppDispatch();

  const saveImage = async (file: SavedImageData): Promise<boolean> => {
    if (file.imageBase64 && file.fullName) {
      return download(file.imageBase64, file.fullName);
    }
    return false;
  };

  let renderItem = <div />;
  const { src } = props;
  if (display && src) {
    renderItem = (
      <FilerobotImageEditor
        source={src}
        savingPixelRatio={4}
        previewPixelRatio={4}
        aria-label="Image editor"
        onClose={(): void => { dispatch(setShowImageEditor(false)); }}
        onSave={saveImage}
      />
    );
  }

  return (
    display ? (
      <div className={styles['image-editor']}>
        {renderItem}
      </div>
    ) : null
  );
}

export default ImageEditor;
