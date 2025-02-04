import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchCounts, fetchBusStops, fetchAllUsers, fetchAllDrivers, addNewDriver, editDriverById, deleteDriverById } from "./adminThunk";
import { CountsResponse, BusStopResponse, UserResponse, DriverResponse } from "../../types/admin.types";

interface AdminState {
    counts: CountsResponse | null | undefined;
    busStops: BusStopResponse[] | undefined;
    users: UserResponse[] | undefined;
    drivers: DriverResponse[];
    loading: boolean;
    error: string | null;
}

const initialState: AdminState = {
    counts: null,
    busStops: [],
    users: [],
    drivers: [],
    loading: false,
    error: null,
};

const adminSlice = createSlice({
    name: "admin",
    initialState,
    reducers: {
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload;
        },
        setCounts: (state, action: PayloadAction<CountsResponse>) => {
            state.counts = action.payload;
        },
        setBusStops: (state, action: PayloadAction<BusStopResponse[]>) => {
            state.busStops = action.payload;
        },
        setUsers: (state, action: PayloadAction<UserResponse[]>) => {
            state.users = action.payload;
        },
        setDrivers: (state, action: PayloadAction<DriverResponse[]>) => {
            state.drivers = action.payload;
        },
        setError: (state, action: PayloadAction<string | null>) => {
            state.error = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCounts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchCounts.fulfilled, (state, action) => {
                state.loading = false;
                state.counts = action.payload;
            })
            .addCase(fetchCounts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(fetchBusStops.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchBusStops.fulfilled, (state, action) => {
                state.loading = false;
                state.busStops = action.payload;
            })
            .addCase(fetchBusStops.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(fetchAllUsers.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchAllUsers.fulfilled, (state, action) => {
                state.loading = false;
                state.users = action.payload;
            })
            .addCase(fetchAllUsers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(fetchAllDrivers.fulfilled, (state, action) => {
                state.drivers = action.payload
                state.loading = false;
            })
            .addCase(fetchAllDrivers.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchAllDrivers.rejected, (state, action) => {
                state.error = action.payload as string;
                state.loading = false;
            })
            .addCase(addNewDriver.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addNewDriver.fulfilled, (state, action) => {
                state.loading = false;
                state.drivers.push(action.payload);
            })
            .addCase(addNewDriver.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(editDriverById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(editDriverById.fulfilled, (state, action) => {
                if (!action.payload || !action.payload.id) {
                    return;
                }

                const updatedDriver = action.payload;
                state.drivers = state.drivers.map(driver =>
                    driver.id === updatedDriver.id ? updatedDriver : driver
                );
            })
            .addCase(editDriverById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(deleteDriverById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteDriverById.fulfilled, (state, action) => {
                state.loading = false;
                state.drivers = state.drivers.filter(driver => driver.id !== action.payload);
            })
            .addCase(deleteDriverById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export const { setLoading, setCounts, setBusStops, setUsers, setDrivers, setError } = adminSlice.actions;
export default adminSlice.reducer;