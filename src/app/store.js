import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counterSlice";
import postReducer from "../features/post/postSlice";
import userReducer from "../features/user/userSlice";
import notificationReducer from "../features/notifications/notificationsSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    posts: postReducer,
    users: userReducer,
    notifications: notificationReducer,
  },
});
