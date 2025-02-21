import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
    fetchCounts, fetchAllBusStops, fetchAllUsers, fetchAllDrivers, addNewDriver, editDriverById, deleteDriverById, addNewStop,
    editStopById,
    deleteStopById,
} from "./adminThunk";
import { CountsResponse, BusStopResponse, UserResponse, DriverResponse } from "../../types/admin.types";

interface AdminState {
    counts: CountsResponse | null | undefined;
    busStops: BusStopResponse[];
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
            .addCase(fetchAllDrivers.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchAllDrivers.fulfilled, (state, action) => {
                state.drivers = action.payload;
                state.loading = false;
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
                if (!action.payload?.id) return;
                const index = state.drivers.findIndex(d => d.id === action.payload.id);
                if (index !== -1) {
                    state.drivers[index] = action.payload;
                }
                state.loading = false;
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
                state.drivers = state.drivers.filter(driver => driver.id !== action.payload);
                state.loading = false;
            })
            .addCase(deleteDriverById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            .addCase(fetchAllBusStops.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchAllBusStops.fulfilled, (state, action: PayloadAction<BusStopResponse[]>) => {
                state.loading = false;
                state.busStops = action.payload;
            })

            .addCase(fetchAllBusStops.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(addNewStop.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addNewStop.fulfilled, (state, action) => {
                state.busStops.push(action.payload);
                state.loading = false;
            })
            .addCase(addNewStop.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            .addCase(editStopById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(editStopById.fulfilled, (state, action) => {
                if (!action.payload?.id) return;
                const index = state.busStops.findIndex(d => d.id === action.payload.id);
                if (index !== -1) {
                    state.drivers[index] = action.payload;
                }
                state.loading = false;
            })
            .addCase(editStopById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(deleteStopById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteStopById.fulfilled, (state, action) => {
                state.busStops = state.busStops.filter(stop => stop.id !== action.payload);
                state.loading = false;
            })
            .addCase(deleteStopById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export const { setLoading, setCounts, setBusStops, setUsers, setDrivers, setError } = adminSlice.actions;
export default adminSlice.reducer;