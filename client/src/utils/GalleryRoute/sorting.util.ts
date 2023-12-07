import GalleryRoute from '../../routes/GalleryRoute';
import {fetchImages, sortImages } from './images.util';

export async function refreshGallery(app: GalleryRoute): Promise<void> {
    await app.setState({ images: await fetchImages() })
    await app.resortGallery();
}

export function resortGallery (app: GalleryRoute): void {
    app.setState({ images: sortImages(app.state.images, app.state.sortBy, app.state.reverse) })
}

export async function sortEvent (app: GalleryRoute, x: string): Promise<void> {
    await app.setState({ sortBy: x });
    app.resortGallery()
}

export async function reverseEvent (app: GalleryRoute): Promise<void> {
    await app.setState({ reverse: !app.state.reverse });
    app.resortGallery();
}