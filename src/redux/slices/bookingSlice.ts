import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { submitBooking } from "../../utils/api"; // Import the API function

interface BookingState {
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: BookingState = {
  status: "idle",
  error: null,
};

// 🔹 Async thunk to submit the booking
export const confirmBooking = createAsyncThunk(
  "booking/confirm",
  async (bookingData: any, { rejectWithValue }) => {
    try {
      return await submitBooking(bookingData);
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

const bookingSlice = createSlice({
  name: "booking",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(confirmBooking.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(confirmBooking.fulfilled, (state) => {
        state.status = "succeeded";
      })
      .addCase(confirmBooking.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      });
  },
});

export default bookingSlice.reducer;
