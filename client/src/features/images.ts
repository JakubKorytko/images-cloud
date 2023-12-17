import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { Photo } from '../components/images/PhotoObject.type';

export interface ImagesState {
  list: Photo[],
  selected: number[],
  sortBy: string,
  sortReverse: boolean,
}

const initialState: ImagesState = {
  list: [],
  selected: [],
  sortBy: 'Date',
  sortReverse: true,
};

function sortImagesHelper(images: Photo[], x: string, reverse: boolean = false): Photo[] {
  let sorted: Photo[] = [];
  switch (x.toLowerCase()) {
    case 'size': sorted = images.sort((a: Photo, b: Photo): number => b.size - a.size); break;
    case 'date':
      sorted = images.sort((a: Photo, b: Photo): number => b.date - a.date);
      break;
    case 'name':
      sorted = images.sort((a: Photo, b: Photo): number => a.name.localeCompare(b.name));
      break;
    default:
      return images;
  }
  if (reverse) sorted = sorted.reverse();
  return sorted;
}

export const imagesSlice = createSlice({
  name: 'images',
  initialState,
  reducers: {
    setImages: (state, action: PayloadAction<Photo[]>) => {
      state.list = sortImagesHelper(action.payload, state.sortBy, state.sortReverse);
    },
    setSelected: (state, action: PayloadAction<number[]>) => {
      state.selected = action.payload;
    },
    setSortBy: (state, action: PayloadAction<string>) => {
      state.sortBy = action.payload;
      state.list = sortImagesHelper(state.list, state.sortBy, state.sortReverse);
    },
    setSortReverse: (state, action: PayloadAction<boolean>) => {
      state.sortReverse = action.payload;
      state.list = sortImagesHelper(state.list, state.sortBy, state.sortReverse);
    },
  },
});

export const {
  setImages, setSelected, setSortBy, setSortReverse,
} = imagesSlice.actions;

export default imagesSlice.reducer;
