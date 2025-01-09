import { configureStore } from "@reduxjs/toolkit"
import userSlice from "./user/userSlice";

const store = configureStore({
    reducer: {
        userSlice,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false,
    }),
})

export type AppDispathchType = typeof store.dispatch;
export type RootStateType = ReturnType<typeof store.getState>;

export default store;