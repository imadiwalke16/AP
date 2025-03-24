import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import serviceCenterReducer from "./slices/serviceCenterSlice";
import serviceTypeReducer from "./slices/serviceTypeSlice";  // ✅ Added
import vehicleReducer from "./slices/vehicleSlice";
import transportReducer from "./slices/transportSlice";
import notificationReducer from "./slices/NotificationSlice"
export const store = configureStore({
  reducer: {
    auth: authReducer,
    serviceCenters: serviceCenterReducer,
    serviceTypes: serviceTypeReducer,  // ✅ Added
    vehicles: vehicleReducer,
    transport: transportReducer, // ✅ Added transport slice
    notifications: notificationReducer,


  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
