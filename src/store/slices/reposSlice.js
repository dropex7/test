import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import api from '@utils/API.js';

export const fetchRepos = createAsyncThunk(
  'repos/fetchRepos',
  async (_, { getState, rejectWithValue }) => {
    try {
      const { auth } = getState();
      const response = await api.get(
        `https://api.github.com/users/${auth.login}/repos`,
        {
          headers: {
            'If-None-Match': '',
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const reposSlice = createSlice({
  name: 'repos',
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRepos.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRepos.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchRepos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const {} = reposSlice.actions;

export default reposSlice.reducer;
