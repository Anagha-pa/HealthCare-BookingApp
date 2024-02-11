import { createSlice } from '@reduxjs/toolkit';
import jwt_decode from 'jwt-decode';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: null,
    token: localStorage.getItem('token') || null,
    is_auth: false,
  },
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
      state.is_auth = action.payload !== null;
    },

    login: (state, action) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.is_auth = false;
      localStorage.removeItem('token');
    },
    signup: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { login, logout, signup, setToken } = userSlice.actions;
export const selectUser = (state) => state.user.user;


export default userSlice.reducer;
