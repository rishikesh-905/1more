import { createSlice } from '@reduxjs/toolkit';

export const adminSlice = createSlice({
  name: 'admin',
  initialState: {
    users: [],
    stats: {},
    settings: {},
  },
  reducers: {
    setUsers: (state, action) => {
      state.users = action.payload;
    },
    setStats: (state, action) => {
      state.stats = action.payload;
    },
    setSettings: (state, action) => {
      state.settings = action.payload;
    },
  },
});

export const { setUsers, setStats, setSettings } = adminSlice.actions;
export default adminSlice.reducer;
