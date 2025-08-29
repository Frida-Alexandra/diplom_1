import { createSlice } from '@reduxjs/toolkit';

const storageSlice = createSlice({
    name: 'storage',
    initialState: {
        currentStorageUser: null,
    },
    reducers: {
        setCurrentStorageUser: (state, action) => {
            state.currentStorageUser = action.payload;
        },
    },
});

export const { setCurrentStorageUser } = storageSlice.actions;
export default storageSlice.reducer;