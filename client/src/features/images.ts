import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { Image } from '../components/images/ImageObject.type';

export interface ImagesState {
  list: Image[],
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

function sortImagesHelper(images: Image[], x: string, reverse: boolean = false): Image[] {
  let sorted: Image[] = [];
  switch (x.toLowerCase()) {
    case 'size': sorted = images.sort((a: Image, b: Image): number => b.size - a.size); break;
    case 'date':
      sorted = images.sort((a: Image, b: Image): number => b.date - a.date);
      break;
    case 'name':
      sorted = images.sort((a: Image, b: Image): number => a.name.localeCompare(b.name));
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
    setImages: (state, action: PayloadAction<Image[]>) => {
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
