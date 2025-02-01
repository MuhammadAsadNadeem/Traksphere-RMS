import { createAsyncThunk } from "@reduxjs/toolkit";
import instance from "../../axios";
import { HttpStatusCode } from "axios";
import { errorReturn } from "../../utils/errorReturn";
import { setCounts, setBusStops, setLoading, setUsers } from "./adminSlice";
import { BusStopResponse, CountsResponse, UpdateUserType, UserResponse } from "../../types/admin.types";

export enum AdminApiPathEnum {
    COUNTS = "api/admin/get-counts",
    BUS_STOPS = "api/admin/get-stops",
    FETCH_USERS = "api/admin/get-users",
    UPDATE_USER = "api/admin/update-user",
    DELETE_USER = "api/admin/delete-user"
}


export const fetchCounts = createAsyncThunk(
    AdminApiPathEnum.COUNTS,
    async (_, { dispatch, rejectWithValue }) => {
        dispatch(setLoading(true));
        try {
            const res = await instance.get<CountsResponse>(AdminApiPathEnum.COUNTS);
            if (res.status === HttpStatusCode.Ok) {
                dispatch(setCounts(res.data));
                return res.data;
            }
        } catch (error) {
            return rejectWithValue(errorReturn(error));
        } finally {
            dispatch(setLoading(false));
        }
    }
);


export const fetchBusStops = createAsyncThunk(
    AdminApiPathEnum.BUS_STOPS,
    async (_, { dispatch, rejectWithValue }) => {
        dispatch(setLoading(true));
        try {
            const res = await instance.get<BusStopResponse[]>(AdminApiPathEnum.BUS_STOPS);
            if (res.status === HttpStatusCode.Ok) {
                const busStops: BusStopResponse[] = res.data.map((stop) => ({
                    id: stop.id,
                    stopName: stop.stopName,
                    latitude: stop.latitude,
                    longitude: stop.longitude,
                }));
                dispatch(setBusStops(busStops));
                return busStops;
            }
        } catch (error) {
            return rejectWithValue(errorReturn(error));
        } finally {
            dispatch(setLoading(false));
        }
    }
);


export const fetchAllUsers = createAsyncThunk(
    AdminApiPathEnum.FETCH_USERS,
    async (params: Partial<UserResponse>, { dispatch, rejectWithValue }) => {
        dispatch(setLoading(true));
        try {
            const res = await instance.get<UserResponse[]>(AdminApiPathEnum.FETCH_USERS, { params });
            if (res.status === HttpStatusCode.Ok) {
                const users: UserResponse[] = res.data.map((user) => ({
                    id: user.id,
                    fullName: user.fullName,
                    email: user.email,
                    registrationNumber: user.registrationNumber,
                    departmentName: user.departmentName,
                    phoneNumber: user.phoneNumber,
                    routeNumber: user.routeNumber,
                    gender: user.gender,
                    stopArea: user.stopArea,
                }));
                dispatch(setUsers(users));
                return users;
            }
        } catch (error) {
            return rejectWithValue(errorReturn(error));
        } finally {
            dispatch(setLoading(false));
        }
    }
);


export const editUserById = createAsyncThunk(
    AdminApiPathEnum.UPDATE_USER,
    async ({ userId, values }: { userId: string; values: UpdateUserType }, { rejectWithValue }) => {
        try {
            const res = await instance.put(AdminApiPathEnum.UPDATE_USER, values, {
                params: { id: userId }, // Pass userId as a query parameter
            });
            if (res.status === HttpStatusCode.Ok) {
                return res.data.data;
            }
        } catch (error) {
            return rejectWithValue(errorReturn(error));
        }
    }
);

export const deleteUserById = createAsyncThunk(
    AdminApiPathEnum.DELETE_USER,
    async (userId: string, { rejectWithValue }) => {
        try {
            const res = await instance.delete(AdminApiPathEnum.DELETE_USER, {
                params: { id: userId }, // Pass userId as a query parameter
            });
            if (res.status === HttpStatusCode.Ok) {
                return userId;
            }
        } catch (error) {
            return rejectWithValue(errorReturn(error));
        }
    }
);


export default {
    fetchCounts,
    fetchBusStops,
    fetchAllUsers,
    editUserById,
    deleteUserById,
}