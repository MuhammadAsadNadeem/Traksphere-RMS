import { createAsyncThunk } from "@reduxjs/toolkit";
import instance from "../../axios";
import { UpdateProfileType, ChangePasswordType } from "../../types/user.types";
import { HttpStatusCode } from "axios";
import { errorReturn } from "../../utils/errorReturn";
import toaster from "../../utils/toaster";


export enum UserApiPathEnum {
    CHANGE_PASSWORD = "api/user/change-password",
    GET_PROFILE = "api/user/get-profile",
    UPDATE_PROFILE = "api/user/update-profile",
    GET_ROUTES = "api/user/get-routes",


}

const changePassword = createAsyncThunk(UserApiPathEnum.CHANGE_PASSWORD,
    async (values: ChangePasswordType, { rejectWithValue }) => {
        try {
            const res = await instance.post(UserApiPathEnum.CHANGE_PASSWORD, values);
            if (res.status === HttpStatusCode.Ok) {
                toaster.success(res.data.message);
                return res.data.data
            }
        } catch (error) {
            return rejectWithValue(errorReturn(error));
        }
    }
);

const updateProfile = createAsyncThunk(UserApiPathEnum.UPDATE_PROFILE,
    async (values: UpdateProfileType, { rejectWithValue }) => {
        try {
            const res = await instance.post(UserApiPathEnum.UPDATE_PROFILE, values)
            if (res.status === HttpStatusCode.Ok) {
                return res.data.data
            }
        } catch (error) {
            return rejectWithValue(errorReturn(error));
        }
    }
);

const getProfile = createAsyncThunk(UserApiPathEnum.GET_PROFILE,
    async (_, { rejectWithValue }) => {
        try {
            const res = await instance.get(UserApiPathEnum.GET_PROFILE)
            if (res.status === HttpStatusCode.Ok) {
                return res.data;
            }
        } catch (error) {
            return rejectWithValue(errorReturn(error));
        }
    }
);

export const fetchAllRoutes = createAsyncThunk(UserApiPathEnum.GET_ROUTES,
    async (_, { rejectWithValue }) => {
        try {
            const res = await instance.get(UserApiPathEnum.GET_ROUTES)

            if (res.status === HttpStatusCode.Ok) {
                return res.data;
            }
        } catch (error) {
            return rejectWithValue(errorReturn(error));
        }
    }
);




export default {
    changePassword,
    getProfile,
    updateProfile,
    fetchAllRoutes,

};
