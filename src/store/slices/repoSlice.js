import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import api from '@utils/API.js';

export const fetchRepo = createAsyncThunk(
  'repos/fetchRepo',
  async (repoName, { getState, rejectWithValue }) => {
    try {
      const { auth } = getState();
      const response = await api.get(
        `https://api.github.com/repos/${auth.login}/${repoName}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const repoSlice = createSlice({
  name: 'repo',
  initialState: {
    data: null,
    loading: false,
    error: null,
  },
  reducers: {
    resetRepoData: (state) => {
      state.data = null;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRepo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRepo.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchRepo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetRepoData } = repoSlice.actions;
export default repoSlice.reducer;
