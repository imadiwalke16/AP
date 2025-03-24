import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchNotifications, markNotificationAsRead } from "../../utils/api";

// Define Notification Type
interface Notification {
  id: number;
  title: string;
  message: string;
  createdAt: string;
  isRead: boolean;
}

// Define State Type
interface NotificationState {
  notifications: Notification[];
  loading: boolean;
  error: string | null;
}

// Async Thunk: Fetch Notifications
export const fetchNotificationsThunk = createAsyncThunk(
  "notifications/fetch",
  async (userId: number, { rejectWithValue }) => {
    try {
      const data: Notification[] = await fetchNotifications(userId);
      return data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Failed to fetch notifications");
    }
  }
);

// Async Thunk: Mark Notification as Read
export const markNotificationAsReadThunk = createAsyncThunk(
  "notifications/markRead",
  async (notificationId: number, { rejectWithValue }) => {
    try {
      await markNotificationAsRead(notificationId);
      return notificationId;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Failed to mark notification as read");
    }
  }
);

// Initial State
const initialState: NotificationState = {
  notifications: [],
  loading: false,
  error: null,
};

// Create Slice
const notificationSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch Notifications
      .addCase(fetchNotificationsThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchNotificationsThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.notifications = action.payload;
      })
      .addCase(fetchNotificationsThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Mark Notification as Read
      .addCase(markNotificationAsReadThunk.fulfilled, (state, action) => {
        const index = state.notifications.findIndex(n => n.id === action.payload);
        if (index !== -1) {
          state.notifications[index].isRead = true;  // ✅ Directly update state
        }
      });
      
      
  },
});

export default notificationSlice.reducer;
