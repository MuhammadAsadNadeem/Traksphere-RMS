import { createAsyncThunk } from "@reduxjs/toolkit";
import instance from "../../axios";
import { HttpStatusCode } from "axios";
import { errorReturn } from "../../utils/errorReturn";
import { setCounts, setBusStops, setLoading, setUsers } from "./adminSlice";
import { BusStopResponse, CountsResponse, UserResponse } from "../../types/admin.types";

export enum AdminApiPathEnum {
    COUNTS = "api/admin/get-counts",
    BUSSTOPS = "api/admin/get-stops",
    FETCHUSERS = "api/admin/get-users",
    UPDATEUSER = "api/admin/update-user",
    DELETEUSER = "api/admin/delete-user"

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
    AdminApiPathEnum.BUSSTOPS,
    async (_, { dispatch, rejectWithValue }) => {
        dispatch(setLoading(true));
        try {
            const res = await instance.get<BusStopResponse[]>(AdminApiPathEnum.BUSSTOPS);
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


export const fetchUsers = createAsyncThunk(
    AdminApiPathEnum.FETCHUSERS,
    async (params: UserResponse, { dispatch, rejectWithValue }) => {
        dispatch(setLoading(true));
        try {
            const res = await instance.get<UserResponse[]>(AdminApiPathEnum.FETCHUSERS, {
                params: {
                    id: params.id,
                    email: params.email,
                    fullName: params.fullName,
                    registrationNumber: params.registrationNumber,
                    departmentName: params.departmentName,
                    phoneNumber: params.phoneNumber,
                    routeNumber: params.routeNumber,
                    gender: params.gender,
                    stopArea: params.stopArea,
                },
            });

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



export default {
    fetchCounts,
    fetchBusStops,
    fetchUsers,
};