import Flickity from 'react-flickity-component';

export type FlickityObject = {
  ref: Flickity | null,
  listener: boolean,
  next: Function,
  previous: Function,
  exitFullscreen: Function,
  show: Function,
  currentName: () => string | false,
  setFullscreenEventListener: (arg: Function) => boolean,
};
