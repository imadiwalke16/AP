import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchServiceHistory } from "/Users/aditya/CDKScreen/AP/src/utils/api.ts"; // Corrected import

// Async thunk to fetch service history
export const fetchServiceHistoryThunk = createAsyncThunk(
  "serviceHistory/fetchServiceHistory",
  async (vehicleId: number, { rejectWithValue }) => {
    try {
      const data = await fetchServiceHistory(vehicleId);
      return data;
    } catch (error) {
      let errorMessage = "Failed to fetch service history";
      if (error instanceof Error) {
        errorMessage = error.message;
      } else if (typeof error === "object" && error !== null && "response" in error) {
        errorMessage = (error as any).response?.data || errorMessage;
      }
      return rejectWithValue(errorMessage);
    }
  }
);

const serviceHistorySlice = createSlice({
  name: "serviceHistory",
  initialState: {
    list: [],
    loading: false,
    error: null as string | null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchServiceHistoryThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchServiceHistoryThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchServiceHistoryThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

// Selectors
export const selectServiceHistory = (state: any) => state.serviceHistory.list;
export const selectLoading = (state: any) => state.serviceHistory.loading;

export default serviceHistorySlice.reducer;
