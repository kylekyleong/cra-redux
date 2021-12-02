import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import AddPostForm from "./AddPostForm";
import { fetchPosts, selectPosts } from "./postSlice";
import ReactionButtons from "./ReactionButtons";

export default function PostsList() {
  const posts = useSelector(selectPosts);
  const dispatch = useDispatch();
  const postStatus = useSelector((state) => state.posts.status);
  const error = useSelector((state) => state.posts.error);

  useEffect(() => {
    if (postStatus === "idle") {
      dispatch(fetchPosts());
    }
  }, [postStatus, dispatch]);

  let content;

  if (postStatus === "loading") {
    content = <p>Loading...</p>;
  } else if (postStatus === "succeeded") {
    content = posts.map((post) => (
      <article key={post.id}>
        <Link to={`/posts/${post.id.toString()}`}>
          <h3>{post.title}</h3>
        </Link>
        <p>{post.content.substring(0, 10)}</p>
        <ReactionButtons post={post}></ReactionButtons>
      </article>
    ));
  } else if (postStatus === "failed") {
    content = <p>{error}</p>;
  }

  return (
    <div>
      <h2>Posts</h2>
      {content}
      <br />
      <AddPostForm></AddPostForm>
    </div>
  );
}
