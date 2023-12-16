import FilerobotImageEditor from 'react-filerobot-image-editor';
import { ImageEditorProps } from './ImageEditor.type';
import download from '../../utils/download.util';
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../app/store";
import { setShowImageEditor } from "../../features/componentsVisibility";
import './ImageEditor.scss';

const ImageEditor = (props: ImageEditorProps) => {
    const display = useSelector((state: RootState) => state.componentsVisibility.showImageEditor);
    const dispatch = useDispatch();

    const editorDisplay = display ? 'block' : 'none';

    let renderItem = <div />;
    if (display && props.src) {
        renderItem = (
        <FilerobotImageEditor
            source={props.src}
            savingPixelRatio={4}
            previewPixelRatio={4}
            aria-label="Image editor"
            onClose={(): void => {dispatch(setShowImageEditor(false))}}
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
