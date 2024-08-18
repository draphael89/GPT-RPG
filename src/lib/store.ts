import { configureStore, ThunkAction, Action, Middleware, combineReducers } from '@reduxjs/toolkit';
import { createLogger } from 'redux-logger';
import characterReducer from "./characterSlice";
import userReducer from "./userSlice";
import { ruleEngine } from './ruleEngine';
import { smartLog } from './utils'; // Import smartLog from utils

// Custom logger configuration
const logger = createLogger({
  collapsed: true,
  diff: true,
});

// Create a root reducer
const rootReducer = combineReducers({
  character: characterReducer,
  user: userReducer,
});

// Define the root state type
export type RootState = ReturnType<typeof rootReducer>;

// Helper function to load state from localStorage
function loadState(): Partial<RootState> | undefined {
  try {
    const serializedState = localStorage.getItem('reduxState');
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    smartLog('Failed to load state:', err);
    return undefined;
  }
}

// Helper function to save state to localStorage
function saveState(state: RootState) {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('reduxState', serializedState);
  } catch (err) {
    smartLog('Failed to save state:', err);
  }
}

// Create and configure the Redux store
export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['your/non-serializable/action'],
        ignoredActionPaths: ['meta.arg', 'payload.timestamp'],
        ignoredPaths: ['items.dates'],
      },
      thunk: {
        extraArgument: { /* Your extra argument here */ },
      },
    }).concat(ruleEngine, logger as Middleware),
  devTools: process.env.NODE_ENV !== 'production',
  preloadedState: loadState(),
});

// Subscribe to store changes to save state
store.subscribe(() => {
  saveState(store.getState());
});

// Define types for dispatch and thunks
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

// Export typed hooks
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;