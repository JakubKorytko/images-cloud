import Flickity from "react-flickity-component";

export type FlktyObject = {
    ref: Flickity | null,
    next: Function,
    previous: Function,
    exitFullscreen: Function,
    show: Function,
    currentName: () => string | false,
    setFullscreenEventListener: (Function) => boolean,
}
