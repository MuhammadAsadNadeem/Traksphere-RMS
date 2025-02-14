import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import authThunk from "./authThunk";
import userThunk from "./userThunk";
import { ProfileType, RouteType } from "../../types/user.types";

type useSliceType = {
    token: string | null;
    profile: ProfileType | null;
    isSuperUser: boolean | null;
    isLoading: boolean,
    routes: RouteType[],
    error: string | null;
};


const initialState: useSliceType = {
    token: localStorage.getItem("token") || null,
    profile: null,
    isSuperUser: null,
    routes: [],
    isLoading: false,
    error: null,
};

export const userSlice = createSlice({
    name: "userSlice",
    initialState,
    reducers: {
        logout: (state) => {
            state.token = null;
            state.profile = null;
            state.routes = [];
            localStorage.removeItem("token");
        },
    },
    extraReducers: (builder) => {
        builder.addCase(authThunk.login.fulfilled, (state, { payload }) => {
            if (!payload) {
                return;
            }
            state.token = payload.token;
            // state.user = payload.user;
        });

        builder.addCase(userThunk.updateProfile.fulfilled, (state, { payload }) => {
            if (!payload) {
                return;
            }
            state.profile = payload;
        });

        builder.addCase(userThunk.getProfile.fulfilled, (state, { payload }) => {
            if (!payload) {
                return;
            }
            state.profile = payload;
        })
        builder.addCase(authThunk.checkUserRole.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuperUser = action.payload;
        })

        // builder.addCase(userThunk.fetchAllRoutes.pending, (state) => {
        //     state.isLoading = true
        // })
        builder.addCase(userThunk.fetchAllRoutes.fulfilled, (state, action: PayloadAction<RouteType[]>) => {
            state.isLoading = false
            state.routes = action.payload;
        });



    },
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;