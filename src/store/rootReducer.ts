import { combineReducers } from '@reduxjs/toolkit';
import galleryReducer from './slices/gallerySlice';
import { createSelectorHook } from 'react-redux';

const rootReducer = combineReducers({
  gallery: galleryReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export const useTypedSelector = createSelectorHook<RootState>();

export default rootReducer;
