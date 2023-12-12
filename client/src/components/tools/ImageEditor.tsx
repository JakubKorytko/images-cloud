import { Component } from 'react';
import FilerobotImageEditor from 'react-filerobot-image-editor';
import { ImageEditorProps, ImageEditorState } from '../../types/imageEditor';
import download from '../../utils/download.util';

class ImageEditor extends Component<ImageEditorProps, ImageEditorState> {
  render() {
    const editorDisplay = this.props.display ? 'block' : 'none';

    let renderItem = <div />;
    if (this.props.display) {
      renderItem = (
        <FilerobotImageEditor
          source={this.props.src}
          savingPixelRatio={4}
          previewPixelRatio={4}
          aria-label="Image editor"
          onClose={(): void => { this.props.toggleDisplay(); }}
          onSave={(file): void => { if (file.imageBase64 && file.fullName) download(file.imageBase64, file.fullName); }}
        />
      );
    }

    return (
      <div id="image-editor" className={`d-${editorDisplay}`}>
        {renderItem}
      </div>
    );
  }
}

export default ImageEditor;
