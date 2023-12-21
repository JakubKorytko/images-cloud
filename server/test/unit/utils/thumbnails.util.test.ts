import fs from 'fs';

import {
  createFolders, deleteFoldersFromArray, getPath, sampleImage,
} from 'testsData';

import Thumbnails from 'utils/thumbnails.util';

require('dotenv').config();

const foldersToCreate = [
  '_test_thumbnails_util_generate',
  '_test_thumbnails_util_generateAll',
  '_test_thumbnails_util_delete',
];

const foldersToDelete = [
  '_test_thumbnails_util_generate',
  '_test_thumbnails_util_generateAll',
  '_test_thumbnails_util_delete',
];

beforeAll(() => {
  deleteFoldersFromArray(foldersToDelete);
  foldersToCreate.forEach((folder) => {
    createFolders(folder);
  });
});

afterAll(() => {
  deleteFoldersFromArray(foldersToDelete);
});

test('Thumbnail generation', async () => {
  const username = '_test_thumbnails_util_generate';

  const photoPath = getPath(username, 'photos', 'sample.png');
  const thumbPath = getPath(username, 'photos_thumb', 'sample.png');
  const progressiveThumbPath = getPath(username, 'photos_thumb', 'sample.png');

  expect(fs.existsSync(sampleImage)).toBe(true);

  // image sample.png must be included in /src/images/_test_sample/sample.png
  // in case image is missing - https://filesamples.com/samples/image/png/sample_640×426.png
  // if the link is dead and file is missing add new sample image

  fs.copyFileSync(sampleImage, photoPath);

  const thumbnailsCreated = await Thumbnails.generate('sample.png', username);

  expect(thumbnailsCreated.thumbnail).toBe(true);
  expect(thumbnailsCreated.progressive_thumbnail).toBe(true);

  // if thumbnailsCreated.thumbnail && thumbnailsCreated.progressive_thumbnail returns true
  // - both thumbnails should exist, checking just in case

  const thumbExists = fs.existsSync(thumbPath);
  const progressiveExists = fs.existsSync(progressiveThumbPath);

  expect(thumbExists).toBe(true);
  expect(progressiveExists).toBe(true);
});

test('Generate all thumbnails', async () => {
  const username = '_test_thumbnails_util_generateAll';

  const photoPath = getPath(username, 'photos', 'sample.png');
  const thumbPath = getPath(username, 'photos_thumb', 'sample.png');
  const progressiveThumbPath = getPath(username, 'photos_thumb', 'sample.png');

  expect(fs.existsSync(sampleImage)).toBe(true);

  // image sample.png must be included in /src/images/_test_sample/sample.png
  // in case image is missing - https://filesamples.com/samples/image/png/sample_640×426.png
  // if the link is dead and file is missing add new sample image

  fs.copyFileSync(sampleImage, photoPath);

  const res = await Thumbnails.generateAll({ test: true });

  expect(res.all).toBe(true);

  // if thumbnailsCreated.all returns true - all thumbnails should exist, checking just in case

  const thumbExists = fs.existsSync(thumbPath);
  const progressiveExists = fs.existsSync(progressiveThumbPath);

  expect(thumbExists).toBe(true);
  expect(progressiveExists).toBe(true);
});

test('Deleting unused thumbnails', () => {
  const username = '_test_thumbnails_util_delete';

  const thumbPath = getPath(username, 'photos_thumb', 'sample.png');
  const progressiveThumbPath = getPath(username, 'photos_thumb', 'sample.png');

  expect(fs.existsSync(sampleImage)).toBe(true);

  // image sample.png must be included in /src/images/_test_sample/sample.png
  // in case image is missing - https://filesamples.com/samples/image/png/sample_640×426.png
  // if the link is dead and file is missing add new sample image

  fs.copyFileSync(sampleImage, thumbPath);
  fs.copyFileSync(sampleImage, progressiveThumbPath);

  Thumbnails.deleteUnused({ test: true });

  expect(fs.existsSync(thumbPath)).toBe(false);
  expect(fs.existsSync(progressiveThumbPath)).toBe(false);
});
