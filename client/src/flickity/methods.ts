import {FlktyObject} from "../types/flickity";

export default {
    ref: null,
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

            const elementWithAttributeGetter = element as unknown & { getAttribute: (x: string) => string | null };
            if (elementWithAttributeGetter.getAttribute !== undefined) {
                const name = elementWithAttributeGetter.getAttribute('name');
                if (!name) {
                    return false;
                }
                return name;
            }
        }
        return false;
    },
    setFullscreenEventListener(callback: Function) {
        if (this.ref) {
            this.ref.on('fullscreenChange', (isFullscreen: boolean): void => {
                console.log("XD");
                callback(isFullscreen);
            })
        }
        return !!this.ref;
    }
} as FlktyObject;