import { configureStore } from '@reduxjs/toolkit';
import characterReducer from './characterSlice';
import userReducer from './userSlice';

export const store = configureStore({
  reducer: {
    character: characterReducer,
    user: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;