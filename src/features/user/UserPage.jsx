import { useSelector } from "react-redux";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { selectPostsByUser } from "../post/postSlice";
import { selectUserById } from "./userSlice";

export default function UserPage() {
  const { userId } = useParams();
  const user = useSelector((state) => selectUserById(state, userId));
  const postsByUser = useSelector((state) => selectPostsByUser(state, userId));
  return (
    <>
      <pre>{JSON.stringify(user, null, 2)}</pre>
      <ul>
        {postsByUser.map((post) => (
          <li key={post.id}>
            <Link to={`/posts/${post.id}`}>{post.title}</Link>
          </li>
        ))}
      </ul>
    </>
  );
}
