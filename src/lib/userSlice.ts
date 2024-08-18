import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { smartLog } from './utils'; // Import smartLog from utils

// Define the structure for the user object
interface User {
  uid: string;
  email: string | null;
  displayName?: string;
  photoURL?: string;
}

// Define the overall user state structure
export interface UserState {
  user: User | null;
  loading: boolean;
  error: string | null;
  lastLogin: Date | null;
}

// Initial state for the user slice
const initialState: UserState = {
  user: null,
  loading: false,
  error: null,
  lastLogin: null,
};

// Create the user slice
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // Set the user information
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.loading = false;
      state.error = null;
      state.lastLogin = new Date();
      smartLog('User set', { user: action.payload });
    },
    // Update the loading state
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
      smartLog('Loading state updated', { loading: action.payload });
    },
    // Set an error message
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.loading = false;
      smartLog('Error set', { error: action.payload });
    },
    // Clear the user information (logout)
    clearUser: (state) => {
      state.user = null;
      state.loading = false;
      state.error = null;
      state.lastLogin = null;
      smartLog('User cleared');
    },
    // Update specific user fields
    updateUserField: (state, action: PayloadAction<Partial<User>>) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
        smartLog('User field updated', { updatedFields: action.payload });
      } else {
        smartLog('Failed to update user field', { reason: 'User is null' });
      }
    },
  },
});

// Export action creators
export const { setUser, setLoading, setError, clearUser, updateUserField } = userSlice.actions;

// Export the reducer
export default userSlice.reducer;

// Selector to get the current user
export const selectUser = (state: { user: UserState }) => state.user.user;

// Selector to get the loading state
export const selectLoading = (state: { user: UserState }) => state.user.loading;

// Selector to get the error state
export const selectError = (state: { user: UserState }) => state.user.error;

// Selector to get the last login time
export const selectLastLogin = (state: { user: UserState }) => state.user.lastLogin;