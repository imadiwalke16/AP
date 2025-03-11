import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface AuthState {
  user: null | { id: number; email: string; role: string };
  token: string | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  token: null,
  status: "idle",
  error: null,
};

// Login API call
export const login = createAsyncThunk(
  "auth/login",
  async ({ email, password }: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const response = await axios.post("http://10.0.2.2:5245/api/auth/login", { email, password });

      // Store token
      await AsyncStorage.setItem("token", response.data.token);

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

      return response.data; // Expecting { id, email, role }
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch user details");
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
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
