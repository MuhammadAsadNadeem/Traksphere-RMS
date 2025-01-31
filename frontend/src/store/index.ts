import { configureStore } from "@reduxjs/toolkit"
import userSlice from "./thunks/userSlice";
import adminSlice from "./thunks/adminSlice"
const store = configureStore({
    reducer: {
        userSlice,
        adminSlice,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false,
    }),
})

export type AppDispathchType = typeof store.dispatch;
export type RootStateType = ReturnType<typeof store.getState>;

export default store;