import React from 'react';
import FilerobotImageEditor from 'react-filerobot-image-editor';
import { useSelector, useDispatch } from 'react-redux';
import { ImageEditorProps, SavedImageData } from './ImageEditor.type';
import download from '../../utils/downloadFile.util';
import { RootState } from '../../app/store';
import { setShowImageEditor } from '../../features/componentsVisibility';
import './ImageEditor.scss';

function ImageEditor(props: ImageEditorProps) {
  const display = useSelector((state: RootState) => state.componentsVisibility.showImageEditor);
  const dispatch = useDispatch();

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
      <div id="image-editor">
        {renderItem}
      </div>
    ) : null
  );
}

export default ImageEditor;
