import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { selectUsers } from "./userSlice";

export default function UsersList() {
  const users = useSelector(selectUsers);
  return (
    <>
      <h2>Users</h2>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            <Link to={`/users/${user.id}`}>{user.name}</Link>
          </li>
        ))}
      </ul>
    </>
  );
}
