import { createSlice } from '@reduxjs/toolkit';

const staffSlice = createSlice({
    name: 'staff',
    initialState: {
        isStaff: false,
    },
    reducers: {
        setIsStaff: (state, action) => {
            state.isStaff = action.payload;
        },
    },
});

export const { setIsStaff } = staffSlice.actions;
export default staffSlice.reducer;