import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchNotification = createAsyncThunk(
  "notification/fetchNotification",
  // other arguments:
  async (notification, { getState, dispatch }) => {
    // return notification: https://redux.js.org/tutorials/essentials/part-6-performance-normalization#thunk-arguments
    return selectNotifications(getState());
  }
);

const notificationSlice = createSlice({
  name: "notifications",
  initialState: [
    {
      user: "2",
      message: "Hi, how are you",
      date: new Date().toString(),
      isNew: true,
      read: false,
    },
    {
      user: "1",
      message: "Im fine thank you.",
      date: new Date().toString(),
      isNew: true,
      read: false,
    },
    {
      user: "2",
      message: "Suzzy baka",
      date: new Date().toString(),
      isNew: true,
      read: false,
    },
  ],
  reducers: {
    allNotificationsRead(state, action) {
      state.forEach((notification) => {
        notification.read = true;
      });
    },
  },
  extraReducers: {
    [fetchNotification.fulfilled]: (state, action) => {
      state.push(...action.payload);
      state.forEach((notification) => {
        // Any notifications we've read are no longer new
        notification.isNew = !notification.read;
      });
      state.sort((a, b) => b.date.localeCompare(a.date));
    },
  },
});

export default notificationSlice.reducer;

export const { allNotificationsRead } = notificationSlice.actions;

export const selectNotifications = (state) => state.notifications;
