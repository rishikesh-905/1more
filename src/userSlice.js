import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    email: null,
    name: null,
    username: null
  },
  reducers: {
    login: (state, action) => {
      state.email = action.payload.email;
      state.name = action.payload.name;
      state.username = action.payload.username;
    },
    logout: (state) => {
      state.email = null;
      state.name = null;
      state.username = null;
    },
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
