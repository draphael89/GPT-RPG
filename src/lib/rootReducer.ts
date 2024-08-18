import { combineReducers } from '@reduxjs/toolkit';
import characterReducer from './characterSlice';
import userReducer from './userSlice';

const rootReducer = combineReducers({
  character: characterReducer,
  user: userReducer,
  // Add other reducers here as needed
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;