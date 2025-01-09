import { createAsyncThunk } from "@reduxjs/toolkit";
import instance from "../../axios";
import { ForgotPasswordType, LoginType, SignupType } from "../../types/auth.types";
import { HttpStatusCode } from "axios";
import { errorReturn } from "../../utils/errorReturn";
import toaster from "../../utils/toaster";

export enum AuthApiPAthEnum {
    LOGIN = "api/auth/signin",
    SIGNUP = "api/auth/signup",
    OTP = "api/auth/send-otp",
    FORGOT_PASSWORD = "api/auth/forgot-password",
}

const login = createAsyncThunk(AuthApiPAthEnum.LOGIN, async (values: LoginType, { rejectWithValue }) => {
    try {
        const res = await instance.post(AuthApiPAthEnum.LOGIN, values)
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

const signup = createAsyncThunk(AuthApiPAthEnum.SIGNUP, async (values: SignupType, { rejectWithValue }) => {
    try {
        const res = await instance.post(AuthApiPAthEnum.SIGNUP, values)
        if (res.status === HttpStatusCode.Ok) {
            toaster.success(res.data.message)
            return res.data.data
        }
    } catch (error) {
        return rejectWithValue(errorReturn(error))
    }
})

const sendOtp = createAsyncThunk(AuthApiPAthEnum.OTP, async (email: string, { rejectWithValue }) => {
    try {
        const res = await instance.get(AuthApiPAthEnum.OTP, { params: { email } })
        if (res.status === HttpStatusCode.Ok) {
            toaster.success(res.data.message)
            return
        }
    } catch (error) {
        return rejectWithValue(errorReturn(error))
    }
})


const forgotPassword = createAsyncThunk(AuthApiPAthEnum.FORGOT_PASSWORD, async (values: ForgotPasswordType, { rejectWithValue }) => {
    try {
        const res = await instance.post(AuthApiPAthEnum.FORGOT_PASSWORD, values)
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
    forgotPassword,
}
