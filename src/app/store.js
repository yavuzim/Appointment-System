import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import birimReducer from '../features/birimler/birimSlice'
import yoneticiReducer from '../features/yoneticiler/yoneticiSlice'
import kullaniciReducer from '../features/kullanicilar/kullaniciSlice'
export const store = configureStore({
  reducer: {
    birimState:birimReducer,
    yoneticiState:yoneticiReducer,
    kullaniciState: kullaniciReducer
   },
   middleware:(getDefaultMiddleware)=>
   getDefaultMiddleware({serializableCheck:false})
});
