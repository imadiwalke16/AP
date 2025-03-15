import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getUserVehicles } from "../../utils/api"; // Ensure correct API import

export const getVehicles = createAsyncThunk(
  "vehicles/getVehicles",
  async (userId: number, { rejectWithValue }) => {
    try {
      const data = await getUserVehicles(userId); // API should return an array of vehicles
      return data;
    } catch (error: any) {
      return rejectWithValue(error?.response?.data?.message || "Failed to fetch vehicles");
    }
  }
);

const vehicleSlice = createSlice({
  name: "vehicles",
  initialState: {
    list: [] as any[], // Ensures list is an array
    selectedVehicle: null as any, // Ensures correct typing
    loading: false,
    error: null as string | null, // Fixes 'unknown' type error
  },
  reducers: {
    selectVehicle: (state, action) => {
      state.selectedVehicle = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getVehicles.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getVehicles.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(getVehicles.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string; // Type assertion fix
      });
  },
});

export const { selectVehicle } = vehicleSlice.actions;
export default vehicleSlice.reducer;
