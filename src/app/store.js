import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import { setupListeners } from '@reduxjs/toolkit/query';
import { vesselSlice } from '../features/vessel/vesselSlice';
import { portSlice } from '../features/port/portSlice';
import { carrierSlice } from '../features/carrier/carrierSlice';

const rootReducer = combineReducers({
	[vesselSlice.reducerPath]: vesselSlice.reducer,
  [portSlice.reducerPath]: portSlice.reducer,
  [carrierSlice.reducerPath]: carrierSlice.reducer,
})

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      vesselSlice.middleware,
      portSlice.middleware,
      carrierSlice.middleware,
    ),
});

setupListeners(store.dispatch);