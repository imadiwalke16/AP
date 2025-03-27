import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import serviceCenterReducer from "./slices/serviceCenterSlice";
import serviceTypeReducer from "./slices/serviceTypeSlice";
import vehicleReducer from "./slices/vehicleSlice";
import transportReducer from "./slices/transportSlice";
import notificationReducer from "./slices/NotificationSlice";
import serviceHistoryReducer from "./slices/serviceHistorySlice"; // ✅ Added service history slice

export const store = configureStore({
  reducer: {
    auth: authReducer,
    serviceCenters: serviceCenterReducer,
    serviceTypes: serviceTypeReducer,
    vehicles: vehicleReducer,
    transport: transportReducer,
    notifications: notificationReducer,
    serviceHistory: serviceHistoryReducer, // ✅ Registered in store
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
