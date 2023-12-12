import axios, { AxiosProgressEvent } from 'axios';
import Token from '../token.util';
import fetchB from '../fetchBlob.util';
import download from '../download.util';
import GalleryRoute from '../../routes/GalleryRoute';
import { Photo } from '../../types/photoObject';

const serverUrl = process.env.REACT_APP_SERVER_URL;

const axiosIstance = axios.create({ baseURL: serverUrl });

export function sortImages(images: Photo[], x: string, reverse: boolean = false): Photo[] {
  let sorted: Photo[] = [];
  switch (x.toLowerCase()) {
    case 'size':
      sorted = images.sort((a: Photo, b: Photo): number => b.size - a.size);
      break;
    case 'date':
      sorted = images.sort((a: Photo, b: Photo): number => b.date - a.date);
      break;
    case 'name':
      sorted = images.sort((a: Photo, b: Photo): number => a.name.localeCompare(b.name));
      break;
    default:
      return images;
  }
  if (reverse === true) sorted = sorted.reverse();
  return sorted;
}

export async function fetchImages(): Promise<Photo[]> {
  const requestHeaders: HeadersInit = new Headers();
  requestHeaders.set('Authorization', `Bearer ${Token.value}`);
  const list = await fetch(`${serverUrl}/photos`, {
    headers: requestHeaders,
  });
  const json = await list.json();
  return json;
}

export async function deleteImage(app: GalleryRoute): Promise<boolean> {
  const photo = app.carouselCurrent();
  if (!photo) return false;

  app.setState({ deleteModalDisplay: false });
  app.exitFlickityFullscreen();

  const requestHeaders: HeadersInit = new Headers();
  requestHeaders.set('Authorization', `Bearer ${Token.value}`);

  await fetch(`${serverUrl}/delete/${encodeURI(photo)}`, { headers: requestHeaders });
  await app.setState({ images: await fetchImages() });
  app.resortGallery();
  return true;
}

export async function deleteImages(app: GalleryRoute): Promise<void> {
  const selected = app.state.selectedImages;
  const { images } = app.state;
  app.deselectAllphotos();
  const names: string[] = [];
  selected.forEach((x: number): void => {
    let y = images.map((z: Photo): string | undefined => {
      if (z.imageId === x) return z.name;
      return undefined;
    });
    y = y.filter((x: string | undefined) => x);
    if (y[0] !== undefined) names.push(y[0]);
  });

  const requestHeaders: HeadersInit = new Headers();
  requestHeaders.set('Authorization', `Bearer ${Token.value}`);

  names.forEach(async (photoName): Promise<void> => {
    await fetch(`${serverUrl}/delete/${encodeURI(photoName)}`, { headers: requestHeaders });
    await app.setState({ images: await fetchImages() });
  });
  app.resortGallery();
  app.hideDeleteModal();
}

export async function sendImage(app: GalleryRoute, file: File): Promise<boolean> {
  const form = new FormData();
  form.append('name', file.name);
  form.append('image', file);
  await app.setState({ fileSending: true });
  app.toggleProgress();
  const res = await axiosIstance.post(`${serverUrl}/upload`, form, {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${Token.value}`,
    },
    onUploadProgress: (data: AxiosProgressEvent): void => {
      const total = data.total ? data.total : 1;
      app.setProgress(Math.round(100 * (data.loaded / total)));
    },
  }).then(() => {
    return true;
  })
  .catch((err) => {
    console.log(err.response.data);
    if (err.response.data === 'Wrong mime-type') {
      return false;
    }
  });
  return Boolean(res);

}

export async function downloadImage(app: GalleryRoute): Promise<boolean> {
  const photo = app.carouselCurrent();
  if (!photo) return false;

  const url = await fetchB(encodeURI(`${serverUrl}/photo/${encodeURI(photo)}`));

  await download(url, photo);
  return true;
}

export async function editImage(app: GalleryRoute): Promise<boolean> {
  const photo = app.carouselCurrent();
  if (!photo) return false;
  const url = await fetchB(encodeURI(`${serverUrl}/photo/${encodeURI(photo)}`));
  await app.setState({ imageEditorSrc: url, imageEditorDisplay: true });
  return true;
}
