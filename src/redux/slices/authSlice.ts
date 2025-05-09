import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface AuthState {
  user: null | { id: number; email: string; role: string; name: string; phoneNumber: string };
  token: string | null;
  sessionToken: string | null;
  themeConfig: { navbarColor: string } | null;
  logoUrl: string | null;
  backgroundImageUrl: string | null; // New field for background image
  otpVerified: boolean;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  token: null,
  sessionToken: null,
  themeConfig: { navbarColor: "#000" },
  logoUrl: null,
  backgroundImageUrl: null, // Initialize new field
  otpVerified: false,
  status: "idle",
  error: null,
};

// Login API call
export const login = createAsyncThunk(
  "auth/login",
  async ({ email, password, sessionToken }: { email: string; password: string; sessionToken: string }, { dispatch, rejectWithValue }) => {
    try {
      const response = await axios.post("http://10.0.2.2:5245/api/auth/login", { email, password, sessionToken });
      await AsyncStorage.setItem("token", response.data.token);
      dispatch(fetchUserDetails());
      return { token: response.data.token };
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Login failed");
    }
  }
);

// Fetch user details
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
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch user details");
    }
  }
);

// OTP Verification
export const verifyOTP = createAsyncThunk(
  "auth/verifyOTP",
  async ({ otp }: { otp: string }, { rejectWithValue }) => {
    try {
      const response = await axios.post("http://10.0.2.2:5245/api/auth/verify-otp", { otp });
      if (response.data.verified) {
        return true;
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
      state.sessionToken = null;
      state.themeConfig = { navbarColor: "#000" };
      state.logoUrl = null;
      state.otpVerified = false;
      AsyncStorage.removeItem("token");
    },
    setSessionToken: (state, action) => {
      state.sessionToken = action.payload;
    },
    setThemeConfig: (state, action) => {
      state.themeConfig = action.payload;
    },
    setLogoUrl: (state, action) => {
      state.logoUrl = action.payload;
    },
    setBackgroundImageUrl: (state, action) => {
      state.backgroundImageUrl = action.payload; // New reducer
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
        state.user = action.payload;
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

export const { logout, setSessionToken, setThemeConfig, setLogoUrl, setBackgroundImageUrl } = authSlice.actions;
export default authSlice.reducer;