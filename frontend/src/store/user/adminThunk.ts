import { createAsyncThunk } from "@reduxjs/toolkit";
import instance from "../../axios";
import { HttpStatusCode } from "axios";
import { errorReturn } from "../../utils/errorReturn";
import { setCounts, setLoading, setUsers } from "./adminSlice";
import { BusStopResponse, CountsResponse, UpdateUserType, UserResponse } from "../../types/admin.types";
import toaster from "../../utils/toaster";
import { DriverType, UpdateDriverType } from "../../types/driver.types";
import { UpdateBusStopType } from "../../types/stop.types";



export enum AdminApiPathEnum {
    COUNTS = "api/admin/get-counts",
    BUS_STOPS = "api/admin/get-stops",
    FETCH_USERS = "api/admin/get-users",
    UPDATE_USER = "api/admin/update-user",
    DELETE_USER = "api/admin/delete-user",
    ADD_Driver = "api/admin/add-driver",
    FETCH_DRIVERS = "api/admin/get-drivers",
    UPDATE_DRIVER = "api/admin/update-driver",
    DElETE_DRIVER = "api/admin/delete-driver",
    ADD_STOP = "api/admin/add-stop",
    UPDATE_STOP = "api/admin/update-stop",
    DElETE_STOP = "api/admin/delete-stop",
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
                params: { id: userId },
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
                params: { id: userId },
            });
            if (res.status === HttpStatusCode.Ok) {
                return userId;
            }
        } catch (error) {
            return rejectWithValue(errorReturn(error));
        }
    }
);

export const addNewDriver = createAsyncThunk(AdminApiPathEnum.ADD_Driver,
    async (values: DriverType, { rejectWithValue }) => {
        try {
            const res = await instance.post(AdminApiPathEnum.ADD_Driver, values);
            if (res.status === HttpStatusCode.Ok) {
                toaster.success(res.data.message);
                return res.data.data;
            }
        } catch (error) {
            return rejectWithValue(errorReturn(error));
        }
    }
);


export const fetchAllDrivers = createAsyncThunk(AdminApiPathEnum.FETCH_DRIVERS,
    async (_, { rejectWithValue }) => {
        try {
            const res = await instance.get(AdminApiPathEnum.FETCH_DRIVERS)
            if (res.status === HttpStatusCode.Ok) {
                return res.data;
            }
        } catch (error) {
            return rejectWithValue(errorReturn(error));
        }
    }
);

export const editDriverById = createAsyncThunk(
    AdminApiPathEnum.UPDATE_DRIVER,
    async ({ userId, values }: { userId: string; values: UpdateDriverType }, { rejectWithValue }) => {
        try {
            const res = await instance.put(AdminApiPathEnum.UPDATE_DRIVER, values, {
                params: { id: userId },
            });

            if (res.status === HttpStatusCode.Ok) {
                return res.data?.data;
            } else {

                throw new Error("Failed to update driver");
            }
        } catch (error) {
            return rejectWithValue(errorReturn(error));
        }
    }
);

export const deleteDriverById = createAsyncThunk(
    AdminApiPathEnum.DElETE_DRIVER,
    async (userId: string, { rejectWithValue }) => {
        try {
            const res = await instance.delete(AdminApiPathEnum.DElETE_DRIVER, {
                params: { id: userId },
            });
            if (res.status === HttpStatusCode.Ok) {
                return userId;
            }
        } catch (error) {
            return rejectWithValue(errorReturn(error));
        }
    }
);

export const fetchAllBusStops = createAsyncThunk<BusStopResponse[]>(
    AdminApiPathEnum.BUS_STOPS,
    async (_, { rejectWithValue }) => {
        try {
            const res = await instance.get<BusStopResponse[]>(AdminApiPathEnum.BUS_STOPS);
            if (res.status === HttpStatusCode.Ok) {
                return res.data.map(stop => ({
                    id: stop.id,
                    stopName: stop.stopName,
                    latitude: stop.latitude,
                    longitude: stop.longitude,
                }));
            }
            return rejectWithValue('Failed to fetch bus stops');
        } catch (error) {
            return rejectWithValue(errorReturn(error));
        }
    }
);


export const addNewStop = createAsyncThunk(AdminApiPathEnum.ADD_STOP,
    async (values: UpdateBusStopType, { rejectWithValue }) => {
        try {
            const res = await instance.post(AdminApiPathEnum.ADD_STOP, values);
            console.log(res);
            if (res.status === HttpStatusCode.Ok) {
                toaster.success(res.data.message);
                return res.data.data;
            }
        } catch (error) {
            return rejectWithValue(errorReturn(error));
        }
    }
);

export const editStopById = createAsyncThunk(
    AdminApiPathEnum.UPDATE_STOP,
    async ({ userId, values }: { userId: string; values: UpdateBusStopType }, { rejectWithValue }) => {
        try {
            const res = await instance.put(AdminApiPathEnum.UPDATE_STOP, values, {
                params: { id: userId },
            });
            if (res.status === HttpStatusCode.Ok) {
                return res.data.data;
            }
        } catch (error) {
            return rejectWithValue(errorReturn(error));
        }
    }
);

export const deleteStopById = createAsyncThunk(
    AdminApiPathEnum.DElETE_STOP,
    async (userId: string, { rejectWithValue }) => {
        try {
            const res = await instance.delete(AdminApiPathEnum.DElETE_STOP, {
                params: { id: userId },
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
    fetchAllUsers,
    editUserById,
    deleteUserById,
    addNewDriver,
    fetchAllDrivers,
    editDriverById,
    deleteDriverById,
    fetchAllBusStops,
    addNewStop,
    editStopById,
    deleteStopById,


}