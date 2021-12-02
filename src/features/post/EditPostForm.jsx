import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { postUpdated, selectPostById } from "./postSlice";

export default function EditPostForm(props) {
  const { postId } = useParams();
  const post = useSelector((state) => selectPostById(state, postId));
  const [title, setTitle] = useState(post.title);
  const [content, setContent] = useState(post.content);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <>
      <h2>Edit Post</h2>
      <h3>{title}</h3>
      <p>{content}</p>
      <form
        action="/"
        onSubmit={(e) => {
          e.preventDefault();
          dispatch(postUpdated({ id: postId, title, content }));
          navigate("/posts");
        }}
      >
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />{" "}
        <br />
        <textarea
          cols="30"
          rows="10"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        ></textarea>
        <br />
        <button type="Submit">Post</button>
      </form>
    </>
  );
}
