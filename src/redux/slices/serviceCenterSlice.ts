import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface ServiceCenter {
  id: number;
  name: string;
  pinCode: string;
  address: string;
  phoneNumber: string;
  brandsSupported: string[];
}

interface ServiceCenterState {
  centers: ServiceCenter[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: ServiceCenterState = {
  centers: [],
  status: "idle",
  error: null,
};

// 🔹 Fetch service centers based on pin code
export const fetchServiceCenters = createAsyncThunk(
  "serviceCenters/fetchByPin",
  async (pinCode: string, { rejectWithValue }) => {
    try {
      const response = await axios.get(`http://10.0.2.2:5245/api/service-centers/by-pin/${pinCode}`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch service centers.");
    }
  }
);

const serviceCenterSlice = createSlice({
  name: "serviceCenters",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchServiceCenters.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchServiceCenters.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.centers = action.payload;
      })
      .addCase(fetchServiceCenters.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      });
  },
});

export default serviceCenterSlice.reducer;
