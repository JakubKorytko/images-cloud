import axios, { AxiosProgressEvent } from 'axios';
import Token from './token.util';
import fetchB from './fetchBlob.util';
import download from './download.util';
import { Photo } from '../components/images/PhotoObject.type';

const serverUrl = process.env.REACT_APP_SERVER_URL;

const axiosInstance = axios.create({ baseURL: serverUrl });

export async function fetchImages(): Promise<Photo[]> {
  const requestHeaders: HeadersInit = new Headers();
  requestHeaders.set('Authorization', `Bearer ${Token.value}`);
  const list = await fetch(`${serverUrl}/photos`, {
    headers: requestHeaders,
  });
  return list.json();
}

export async function deleteImage(photo: string): Promise<boolean> {
  const requestHeaders: HeadersInit = new Headers();
  requestHeaders.set('Authorization', `Bearer ${Token.value}`);

  await fetch(`${serverUrl}/delete/${encodeURI(photo)}`, { headers: requestHeaders });
  return true;
}

export async function deleteImages(images: Photo[], selected: number[]): Promise<boolean> {
  const names: string[] = [];
  selected.forEach((id: number): void => {
    const selectedNames = images.map((img: Photo): string | undefined => {
      if (img.imageId === id) return img.name;
      return undefined;
    });
    const filteredNames = selectedNames.filter((x: string | undefined) => x);
    if (filteredNames[0] !== undefined) names.push(filteredNames[0]);
  });

  const requestHeaders: HeadersInit = new Headers();
  requestHeaders.set('Authorization', `Bearer ${Token.value}`);

  const config = {
    headers: requestHeaders,
  };

  const url = (name: string): string => `${serverUrl}/delete/${encodeURI(name)}`;

  const promises = names.map(async (photoName): Promise<Response> => fetch(url(photoName), config));
  const res = await Promise.all(promises);

  return res.every((response): boolean => response.ok);
}

export async function sendImage(
  file: File,
  progressFunc: (data: AxiosProgressEvent) => void,
): Promise<boolean> {
  const form = new FormData();
  form.append('name', file.name);
  form.append('image', file);
  const res = await axiosInstance.post(`${serverUrl}/upload`, form, {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${Token.value}`,
    },
    onUploadProgress: progressFunc,
  }).then(() => true)
    .catch(() => false);
  return Boolean(res);
}

export async function downloadImage(name: string): Promise<boolean> {
  if (!name) return false;

  const url = await fetchB(encodeURI(`${serverUrl}/photo/${encodeURI(name)}`));

  await download(url, name);
  return true;
}

export async function editImageUrl(name: string): Promise<string> {
  return fetchB(encodeURI(`${serverUrl}/photo/${encodeURI(name)}`));
}
