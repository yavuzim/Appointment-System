import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import birimReducer from '../features/birimler/birimSlice'
import yoneticiReducer from '../features/yoneticiler/yoneticiSlice'
export const store = configureStore({
  reducer: {
    birimState:birimReducer,
    yoneticiState:yoneticiReducer
   },
   middleware:(getDefaultMiddleware)=>
   getDefaultMiddleware({serializableCheck:false})
});
