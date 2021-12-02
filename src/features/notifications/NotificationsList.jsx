import { useLayoutEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { selectUsers } from "../user/userSlice";
import {
  allNotificationsRead,
  selectNotifications,
} from "./notificationsSlice";

export default function NotificationsList() {
  const notifications = useSelector(selectNotifications);
  const dispatch = useDispatch();
  const users = useSelector(selectUsers);

  useLayoutEffect(() => {
    dispatch(allNotificationsRead());
  });

  return (
    <>
      <h3>Notifications</h3>
      {notifications.map((notification) => {
        const user = users.find((user) => user.id === notification.user) || {
          name: "Unknown User",
        };
        return (
          <div>
            <div>
              <b>{user.name}</b>: {notification.message}
            </div>
            <div>{notification.date}</div>
          </div>
        );
      })}
    </>
  );
}
