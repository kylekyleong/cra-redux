import { useSelector } from "react-redux";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import PostAuthor from "./PostAuthor";
import { selectPostById } from "./postSlice";

export default function SinglePostPage() {
  const { postId } = useParams();
  const post = useSelector((state) => selectPostById(state, postId));
  if (post) {
    return (
      <section>
        <article>
          <h2>{post.title}</h2>
          <p>{post.content}</p>
          <Link to={`/editPost/${post.id.toString()}`}>edit</Link>
          <p>{<PostAuthor userId={post.user}></PostAuthor>}</p>
          <p>{post.date ? post.date : ""}</p>
        </article>
      </section>
    );
  } else {
    return (
      <section>
        <h2>Post not found</h2>
      </section>
    );
  }
}
