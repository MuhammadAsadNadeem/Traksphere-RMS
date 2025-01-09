import { createAsyncThunk } from "@reduxjs/toolkit";
import instance from "../../axios";
import { ProfileType, ChangePasswordType } from "../../types/user.types";
import { HttpStatusCode } from "axios";
import { errorReturn } from "../../utils/errorReturn";
import toaster from "../../utils/toaster";


export enum UserApiPathEnum {
    updateProfile = "api/auth/complete-signup",
    changePassword = "api/user/change-password",
}


const updateProfile = createAsyncThunk(UserApiPathEnum.updateProfile,
    async (values: ProfileType, { rejectWithValue }) => {
        try {
            const res = await instance.post(UserApiPathEnum.updateProfile, values);
            if (res.status === HttpStatusCode.Ok) {
                if (res.data.data?.token) {
                    localStorage.setItem("token", res.data.data?.token);
                }
                toaster.success(res.data.message);
                return res.data.data;
            }
        } catch (error) {
            return rejectWithValue(errorReturn(error));
        }
    }
);

const changePassword = createAsyncThunk(UserApiPathEnum.changePassword,
    async (values: ChangePasswordType, { rejectWithValue }) => {
        try {
            const res = await instance.post(UserApiPathEnum.changePassword, values);
            if (res.status === HttpStatusCode.Ok) {
                if (res.data.data?.token) {
                    localStorage.setItem("token", res.data.data?.token);
                }
                toaster.success(res.data.message);
                return res.data.data;
            }
        } catch (error) {
            return rejectWithValue(errorReturn(error));
        }
    }
);

export default {
    updateProfile,
    changePassword,
};
