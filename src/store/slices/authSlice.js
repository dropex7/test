import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    login: localStorage.getItem('login') ?? '',
    token: localStorage.getItem('token') ?? '',
  },
  reducers: {
    setAuthState: (state, action) => {
      const { login, token } = action.payload;
      state.login = login;
      state.token = token;
      localStorage.setItem('login', login);
      localStorage.setItem('token', token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    },
  },
});

export const { setAuthState } = authSlice.actions;

export default authSlice.reducer;
