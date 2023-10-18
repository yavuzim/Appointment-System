import { configureStore } from '@reduxjs/toolkit';
import birimReducer from '../features/birimler/birimSlice'
export const store = configureStore({
  reducer: {
    birimState:birimReducer
   },
});
