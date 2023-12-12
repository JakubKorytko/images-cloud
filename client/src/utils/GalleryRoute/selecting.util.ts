import GalleryRoute from '../../routes/GalleryRoute';

export function selectAll(app: GalleryRoute): void {
  const imgs = app.state.images;
  const imgsSelected = app.state.selectedImages;
  for (let i = 0; i < imgs.length; i++) {
    const index: number = imgsSelected.indexOf(i);
    if (index === -1) {
      imgsSelected.push(i);
    }
  }
  app.setState({ selectedImages: imgsSelected });
}

export function selectImage(app: GalleryRoute, id: number, action: boolean): void {
  const arr = app.state.selectedImages;
  if (action) {
    arr.push(id);
  } else {
    const index: number = arr.indexOf(id);
    if (index !== -1) {
      arr.splice(index, 1);
    }
  }
  app.setState({ selectedImages: arr });
}

export function photoSelected(app: GalleryRoute, id: number): boolean {
  return app.state.selectedImages.includes(id);
}

export function deselectAllphotos(app: GalleryRoute): void {
  app.setState({ selectedImages: [] });
}
