import { configureStore } from '@reduxjs/toolkit';
import authSlice from './slices/authSlice.js';
import reposSlice from './slices/reposSlice.js';
import repoSlice from './slices/repoSlice.js';

export default configureStore({
  reducer: {
    auth: authSlice,
    repos: reposSlice,
    repo: repoSlice,
  },
});
