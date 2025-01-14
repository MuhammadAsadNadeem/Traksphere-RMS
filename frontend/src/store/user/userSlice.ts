import { createSlice } from "@reduxjs/toolkit";
import authThunk from "./authThunk";
import userThunk from "./userThunk";
import { ProfileType } from "../../types/user.types";

type useSliceType = {
    token: string | null,
    profile: ProfileType | null,
}

const initialState: useSliceType = {
    token: localStorage.getItem("token") || null,
    profile: null,
}

export const userSlice = createSlice({
    name: "userSlice",
    initialState,
    reducers: {
        logout: (state) => {
            state = initialState
            return state
        }
    },
    extraReducers: (builder) => {
        builder.addCase(authThunk.login.fulfilled, (state, { payload }) => {
            if (!payload) {
                return;
            }
            state.token = payload.token
        })
        builder.addCase(userThunk.updateProfile.fulfilled, (state, { payload }) => {
            if (!payload) {
                return;
            }
            state.profile = payload
        })
        builder.addCase(userThunk.getProfile.fulfilled, (state, { payload }) => {
            if (!payload) {
                return;
            }
            state.profile = payload
        })
    },
});

export const { logout } = userSlice.actions
export default userSlice.reducer