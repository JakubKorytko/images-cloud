import axios, {AxiosProgressEvent} from 'axios';
import Token from './token.util';
import fetchB from './fetchBlob.util';
import download from './download.util';
import {Photo} from '../components/images/PhotoObject.type';

const serverUrl = process.env.REACT_APP_SERVER_URL;

const axiosIstance = axios.create({ baseURL: serverUrl });

export async function fetchImages(): Promise<Photo[]> {
  const requestHeaders: HeadersInit = new Headers();
  requestHeaders.set('Authorization', `Bearer ${Token.value}`);
  const list = await fetch(`${serverUrl}/photos`, {
    headers: requestHeaders,
  });
  const json = await list.json();
  return json;
}

export async function deleteImage(photo: string): Promise<boolean> {
  const requestHeaders: HeadersInit = new Headers();
  requestHeaders.set('Authorization', `Bearer ${Token.value}`);

  await fetch(`${serverUrl}/delete/${encodeURI(photo)}`, { headers: requestHeaders });
  return true;
}

export async function deleteImages(images: Photo[], selected: number[]): Promise<void> {

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
  });

}

export async function sendImage(file: File, progressFunc: (data: AxiosProgressEvent) => void): Promise<boolean> {
  const form = new FormData();
  form.append('name', file.name);
  form.append('image', file);
  const res = await axiosIstance.post(`${serverUrl}/upload`, form, {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${Token.value}`,
    },
    "onUploadProgress": progressFunc,
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

export async function downloadImage(name: string): Promise<boolean> {
  if (!name) return false;

  const url = await fetchB(encodeURI(`${serverUrl}/photo/${encodeURI(name)}`));

  await download(url, name);
  return true;
}

export async function editImageUrl(name: string): Promise<string> {
  return await fetchB(encodeURI(`${serverUrl}/photo/${encodeURI(name)}`));
}
