import { createAsyncThunk } from "@reduxjs/toolkit";
import instance from "../../axios";
import { ForgotPasswordType, LoginType, SignupType } from "../../types/auth.types";
import { HttpStatusCode } from "axios";
import { errorReturn } from "../../utils/errorReturn";
import toaster from "../../utils/toaster";
import { SignUpPart2 } from "../../types/user.types";

export enum AuthApiPathEnum {
    LOGIN = "api/auth/signin",
    SIGNUP = "api/auth/signup",
    SIGNUP_PART2 = "api/auth/complete-signup",
    OTP = "api/auth/send-otp",
    FORGOT_PASSWORD = "api/auth/forgot-password",
}

const login = createAsyncThunk(AuthApiPathEnum.LOGIN, async (values: LoginType, { rejectWithValue }) => {
    try {
        const res = await instance.post(AuthApiPathEnum.LOGIN, values)
        if (res.status === HttpStatusCode.Ok) {
            if (res.data.data?.token) {
                localStorage.setItem("token", res.data.data?.token)
            }
            toaster.success(res.data.message)
            return res.data.data
        }
    } catch (error) {
        return rejectWithValue(errorReturn(error))
    }
})

const signup = createAsyncThunk(AuthApiPathEnum.SIGNUP, async (values: SignupType, { rejectWithValue }) => {
    try {
        const res = await instance.post(AuthApiPathEnum.SIGNUP, values)
        if (res.status === HttpStatusCode.Ok) {
            toaster.success(res.data.message)
            return res.data.data
        }
    } catch (error) {
        return rejectWithValue(errorReturn(error))
    }
})

const completeSignup = createAsyncThunk(AuthApiPathEnum.SIGNUP_PART2,
    async (values: SignUpPart2, { rejectWithValue }) => {
        try {
            const res = await instance.post(AuthApiPathEnum.SIGNUP_PART2, values);
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


const sendOtp = createAsyncThunk(AuthApiPathEnum.OTP, async (email: string, { rejectWithValue }) => {
    try {
        const res = await instance.get(AuthApiPathEnum.OTP, { params: { email } })
        if (res.status === HttpStatusCode.Ok) {
            toaster.success(res.data.message)
            return
        }
    } catch (error) {
        return rejectWithValue(errorReturn(error))
    }
})


const forgotPassword = createAsyncThunk(AuthApiPathEnum.FORGOT_PASSWORD, async (values: ForgotPasswordType, { rejectWithValue }) => {
    try {
        const res = await instance.post(AuthApiPathEnum.FORGOT_PASSWORD, values)
        if (res.status === HttpStatusCode.Ok) {
            toaster.success(res.data.message)
            return
        }
    } catch (error) {
        return rejectWithValue(errorReturn(error))
    }
})

export default {
    login,
    signup,
    sendOtp,
    completeSignup,
    forgotPassword,
}
