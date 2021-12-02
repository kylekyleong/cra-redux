import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { fetchNotification } from "../features/notifications/notificationsSlice";

export default function Navbar() {
  const dispatch = useDispatch();
  const fetchNewNotifications = () => {
    dispatch(fetchNotification());
  };
  return (
    <nav>
      <section>
        <h1>Redux Essentials Example</h1>
        <Link to="/">Home</Link> {" | "}
        <Link to="/posts">Posts</Link> {" | "}
        <Link to="/users">Users</Link> {" | "}
        <Link to="/notifications">Notifications</Link> {" | "}
        <button className="button" onClick={fetchNewNotifications}>
          Refresh Notifications
        </button>
      </section>
      <hr />
    </nav>
  );
}
