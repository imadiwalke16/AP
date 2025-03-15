import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getServiceTypesByServiceCenter } from "/Users/aditya/CDKScreen/AP/src/utils/api.ts";  // ✅ Import from `api.ts`

interface ServiceType {
  id: number;
  name: string;
  price: number;
}

interface ServiceTypeState {
  services: ServiceType[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: ServiceTypeState = {
  services: [],
  status: "idle",
  error: null,
};

// ✅ Fetch service types using API function from `api.ts`
export const fetchServiceTypes = createAsyncThunk(
  "serviceTypes/fetchByServiceCenter",
  async (serviceCenterId: number, { rejectWithValue }) => {
    try {
      return await getServiceTypesByServiceCenter(serviceCenterId);
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

const serviceTypeSlice = createSlice({
  name: "serviceTypes",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchServiceTypes.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchServiceTypes.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.services = action.payload;
      })
      .addCase(fetchServiceTypes.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      });
  },
});

export default serviceTypeSlice.reducer;
