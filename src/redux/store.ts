import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import serviceCenterReducer from "/Users/aditya/Projects/AP/src/redux/slices/serviceCenterSlice.ts";
export const store = configureStore({
  reducer: {
    auth: authReducer,
    serviceCenters: serviceCenterReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
