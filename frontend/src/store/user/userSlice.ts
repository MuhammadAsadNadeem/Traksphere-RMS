import { createSlice } from "@reduxjs/toolkit";
import authThunk from "./authThunk";

type useSliceType = {
    token: string | null,
}

const initialState: useSliceType = {
    token: localStorage.getItem("token") || null,
}

export const userSlice = createSlice({
    name: "userSlice",
    initialState,
    reducers: {
        logout: () => {
            return initialState
        }
    },
    extraReducers: (builder) => {
        builder.addCase(authThunk.login.fulfilled, (state, { payload }) => {
            if (!payload) {
                return;
            }
            state.token = payload.token
        })
    },
});

export const { logout } = userSlice.actions
export default userSlice.reducer