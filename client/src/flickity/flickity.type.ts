import Flickity from 'react-flickity-component';

export type FlickityObject = {
  ref: Flickity,
  listener: boolean,
  next: () => void,
  previous: () => void,
  exitFullscreen: () => void,
  show: (id: number) => boolean,
  currentName: () => string | false,
  setFullscreenEventListener: (arg: Function) => boolean,
};

export type ElementWithAttributeGetter = unknown & {
  getAttribute: (x: string) => string | null
};
