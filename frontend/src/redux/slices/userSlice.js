import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    currentStorageUser: null,
  },
  reducers: {
    setUser: (state, action) => {
      state.currentStorageUser = action.payload;
    },
    clearUser: (state) => {
      state.currentStorageUser = null;
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export const selectCurrentUser = (state) => state.user.currentStorageUser;
export default userSlice.reducer;