import { FlickityObject } from './flickity.type';

export default {
  ref: null,
  listener: false,
  next() {
    if (this.ref) {
      this.ref.next();
    }
  },
  previous() {
    if (this.ref) {
      this.ref.previous();
    }
  },
  exitFullscreen() {
    if (this.ref) {
      this.ref.exitFullscreen();
    }
  },
  show(x: number): boolean {
    if (!this.ref) return false;
    this.ref.select(x, true, true);
    this.ref.viewFullscreen();

    const element: unknown = this.ref.selectedElement;

    const elementWithFocusMethod = element as unknown & { focus: () => void };
    if (elementWithFocusMethod.focus !== undefined) {
      elementWithFocusMethod.focus();
    }

    return true;
  },
  currentName() {
    if (this.ref) {
      const element: unknown = this.ref.selectedElement;

      type ElementWithAttributeGetter = unknown & { getAttribute: (x: string) => string | null };
      const elementWithAttributeGetter = element as ElementWithAttributeGetter;
      if (elementWithAttributeGetter.getAttribute !== undefined) {
        const name = elementWithAttributeGetter.getAttribute('data-name');
        if (!name) {
          return false;
        }
        return name;
      }
    }
    return false;
  },
  setFullscreenEventListener(callback: Function) {
    if (this.ref && !this.listener) {
      this.ref.on('fullscreenChange', (isFullscreen: boolean): void => {
        callback(isFullscreen);
      });
      this.listener = true;
    }
    return !!this.ref;
  },
} as FlickityObject;
