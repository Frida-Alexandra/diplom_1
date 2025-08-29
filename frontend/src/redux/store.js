import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./slices/authSlice";
import fileReducer from "./slices/fileSlice";
import adminReducer from "./slices/adminSlice";
import userReducer from "./slices/userSlice";
import storageReducer from "./slices/storageSlice";
import staffReducer from "./slices/staffSlice";
import sessionReducer from "./slices/sessionSlice.js";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        file: fileReducer,
        admin: adminReducer,
        user: userReducer,
        storage: storageReducer,
        staff: staffReducer,
        session: sessionReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});