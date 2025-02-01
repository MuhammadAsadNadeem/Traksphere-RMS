import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchCounts, fetchBusStops, fetchAllUsers } from "../../store/thunks/adminThunk";
import { CountsResponse, BusStopResponse, UserResponse } from "../../types/admin.types";

interface AdminState {
    counts: CountsResponse | null | undefined;
    busStops: BusStopResponse[] | undefined;
    users: UserResponse[] | undefined;
    loading: boolean;
    error: string | null;
}

const initialState: AdminState = {
    counts: null,
    busStops: [],
    users: [],
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
            });
    },
});

export const { setLoading, setCounts, setBusStops, setUsers, setError } = adminSlice.actions;
export default adminSlice.reducer;
