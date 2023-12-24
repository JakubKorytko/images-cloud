import fs from 'fs';

import Folders from 'utils/folders.util';

import {
  createFoldersFromArray, deleteFoldersFromArray, foldersExists, getPath,
} from 'test/testsData';

const foldersToCreate = [
  '_test_folders_util_delete',
  '_test_folders_util_check',
];

const foldersToDelete = [
  '_test_folders_util_create',
  '_test_folders_util_delete',
  '_test_folders_util_check',
];

beforeAll(() => {
  deleteFoldersFromArray(foldersToDelete);
  createFoldersFromArray(foldersToCreate);
});

afterAll(() => {
  deleteFoldersFromArray(foldersToDelete);
});

test('Creating user folders', () => {
  const username = '_test_folders_util_create';

  const firstCreate = Folders.create(username);
  const secondCreate = Folders.create(username);

  // it should create folder at first but shouldn't if already exists

  expect(firstCreate).toBe(true);
  expect(secondCreate).toBe(false);

  const exists = foldersExists(username);

  expect(exists.photos).toBe(true);
  expect(exists.thumbs).toBe(true);
  expect(exists.progressive).toBe(true);
});

test('Deleting user folders', () => {
  const username = '_test_folders_util_create';

  const response = Folders.delete(username);

  expect(response).toBe(true);

  const exists = foldersExists(username);

  expect(exists.photos).toBe(false);
  expect(exists.thumbs).toBe(false);
  expect(exists.progressive).toBe(false);
});

test('Checking if folders exists', () => {
  const username = '_test_folders_util_check';

  const exists = foldersExists(username);
  const existsFs = fs.existsSync(getPath(username));

  expect(exists && existsFs).toBe(true);
});
