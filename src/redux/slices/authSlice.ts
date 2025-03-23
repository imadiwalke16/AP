import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface AuthState {
  user: null | { id: number; email: string; role: string; name: string; phoneNumber: string };
  token: string | null;
  otpVerified: boolean;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  token: null,
  otpVerified: false,
  status: "idle",
  error: null,
};

// Login API call
export const login = createAsyncThunk(
  "auth/login",
  async ({ email, password }: { email: string; password: string }, { dispatch, rejectWithValue }) => {
    try {
      const response = await axios.post("http://10.0.2.2:5245/api/auth/login", { email, password });

      // Store token
      await AsyncStorage.setItem("token", response.data.token);

      // Fetch user details after login
      dispatch(fetchUserDetails());

      return { token: response.data.token };
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Login failed");
    }
  }
);

// Fetch user details API call
export const fetchUserDetails = createAsyncThunk(
  "auth/fetchUserDetails",
  async (_, { rejectWithValue }) => {
    try {
      const token = await AsyncStorage.getItem("token");

      if (!token) {
        return rejectWithValue("No token found");
      }

      const response = await axios.get("http://10.0.2.2:5245/api/auth/me", {
        headers: { Authorization: `Bearer ${token}` },
      });

      return response.data; // Expecting { id, email, role, name, phoneNumber }
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch user details");
    }
  }
);

// OTP Verification Action
export const verifyOTP = createAsyncThunk(
  "auth/verifyOTP",
  async ({ otp }: { otp: string }, { rejectWithValue }) => {
    try {
      const response = await axios.post("http://10.0.2.2:5245/api/auth/verify-otp", { otp });

      if (response.data.verified) {
        return true; // OTP is correct
      } else {
        return rejectWithValue("Invalid OTP");
      }
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "OTP verification failed");
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.otpVerified = false;
      AsyncStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.token = action.payload.token;
        state.otpVerified = false;
      })
      .addCase(login.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      })
      .addCase(fetchUserDetails.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUserDetails.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload; // ✅ Store user details in state
      })
      .addCase(fetchUserDetails.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      })
      .addCase(verifyOTP.fulfilled, (state) => {
        state.otpVerified = true;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
