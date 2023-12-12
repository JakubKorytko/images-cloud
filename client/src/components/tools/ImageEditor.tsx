import FilerobotImageEditor from 'react-filerobot-image-editor';
import { ImageEditorProps } from '../../types/imageEditor';
import download from '../../utils/download.util';

const ImageEditor = (props: ImageEditorProps) => {
    const editorDisplay = props.display ? 'block' : 'none';

    let renderItem = <div />;
    if (props.display) {
        renderItem = (
        <FilerobotImageEditor
            source={props.src}
            savingPixelRatio={4}
            previewPixelRatio={4}
            aria-label="Image editor"
            onClose={(): void => { props.toggleDisplay(); }}
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

export default ImageEditor;
