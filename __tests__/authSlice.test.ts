import authReducer, { login, fetchUserDetails, verifyOTP } from "/Users/aditya/AP/src/redux/slices/authSlice.ts";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { configureStore } from "@reduxjs/toolkit";

// Mock AsyncStorage
jest.mock("@react-native-async-storage/async-storage", () => ({
  setItem: jest.fn(),
  getItem: jest.fn(),
  removeItem: jest.fn(),
}));

// Mock axios
jest.mock("axios");

const mockUser = { id: 1, email: "test@example.com", role: "user", name: "Test User", phoneNumber: "1234567890" };
const mockToken = "dummy_token";

// Helper function to create a test store
const createTestStore = () => {
  return configureStore({ reducer: authReducer });
};


describe("login async action", () => {
    it("should handle login success", async () => {
      (axios.post as jest.Mock).mockResolvedValueOnce({ data: { token: mockToken } });
      (AsyncStorage.setItem as jest.Mock).mockResolvedValueOnce(null);
  
      const store = createTestStore();
      const result = await store.dispatch(login({ email: "test@example.com", password: "password" }) as any);
  
      const state = store.getState();
      expect(result.type).toBe("auth/login/fulfilled");
      expect(state.token).toBe(mockToken);
      expect(state.status).toBe("succeeded");
    });
  
    it("should handle login failure", async () => {
      (axios.post as jest.Mock).mockRejectedValueOnce({ response: { data: { message: "Invalid credentials" } } });
  
      const store = createTestStore();
      const result = await store.dispatch(login({ email: "test@example.com", password: "wrong" }) as any);
  
      const state = store.getState();
      expect(result.type).toBe("auth/login/rejected");
      expect(state.error).toBe("Invalid credentials");
      expect(state.status).toBe("failed");
    });
  
    it("should set status to loading when login is pending", () => {
      const store = createTestStore();
      const action = { type: "auth/login/pending" };
  
      store.dispatch(action);
      const state = store.getState();
      expect(state.status).toBe("loading");
    });
  });

  

  describe("fetchUserDetails async action", () => {
    it("should handle successful user details fetch", async () => {
      (AsyncStorage.getItem as jest.Mock).mockResolvedValueOnce(mockToken);
      (axios.get as jest.Mock).mockResolvedValueOnce({ data: mockUser });
  
      const store = createTestStore();
      const result = await store.dispatch(fetchUserDetails() as any);
  
      const state = store.getState();
      expect(result.type).toBe("auth/fetchUserDetails/fulfilled");
      expect(state.user).toEqual(mockUser);
      expect(state.status).toBe("succeeded");
    });
  
    it("should handle no token found", async () => {
      (AsyncStorage.getItem as jest.Mock).mockResolvedValueOnce(null);
  
      const store = createTestStore();
      const result = await store.dispatch(fetchUserDetails() as any);
  
      const state = store.getState();
      expect(result.type).toBe("auth/fetchUserDetails/rejected");
      expect(state.error).toBe("No token found");
    });
  
    it("should handle API failure", async () => {
      (AsyncStorage.getItem as jest.Mock).mockResolvedValueOnce(mockToken);
      (axios.get as jest.Mock).mockRejectedValueOnce({ response: { data: { message: "Fetch failed" } } });
  
      const store = createTestStore();
      const result = await store.dispatch(fetchUserDetails() as any);
  
      const state = store.getState();
      expect(result.type).toBe("auth/fetchUserDetails/rejected");
      expect(state.error).toBe("Fetch failed");
    });
  });
  describe("verifyOTP async action", () => {
    it("should handle successful OTP verification", async () => {
      (axios.post as jest.Mock).mockResolvedValueOnce({ data: { verified: true } });
  
      const store = createTestStore();
      const result = await store.dispatch(verifyOTP({ otp: "123456" }) as any);
  
      const state = store.getState();
      expect(result.type).toBe("auth/verifyOTP/fulfilled");
      expect(state.otpVerified).toBe(true);
    });
  
    it("should handle OTP verification failure", async () => {
      (axios.post as jest.Mock).mockRejectedValueOnce({ response: { data: { message: "Invalid OTP" } } });
  
      const store = createTestStore();
      const result = await store.dispatch(verifyOTP({ otp: "000000" }) as any);
  
      const state = store.getState();
      expect(result.type).toBe("auth/verifyOTP/rejected");
      expect(state.error).toBe("Invalid OTP");
    });
  });
    