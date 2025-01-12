import { createAsyncThunk } from "@reduxjs/toolkit";
import instance from "../../axios";
import { Profile, ChangePasswordType } from "../../types/user.types";
import { HttpStatusCode } from "axios";
import { errorReturn } from "../../utils/errorReturn";
import toaster from "../../utils/toaster";


export enum UserApiPathEnum {
    CHANGE_PASSWORD = "api/user/change-password",
    PROFILE = "api/user/profile",
}



const changePassword = createAsyncThunk(UserApiPathEnum.CHANGE_PASSWORD,
    async (values: ChangePasswordType, { rejectWithValue }) => {
        try {
            const res = await instance.post(UserApiPathEnum.CHANGE_PASSWORD, values);
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


const profile = createAsyncThunk(UserApiPathEnum.PROFILE,
    async (values: Profile, { rejectWithValue }) => {
        try {
            const res = await instance.get(UserApiPathEnum.PROFILE, {
                params: values,
            })
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

    changePassword,
    profile,
};
