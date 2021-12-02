import { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { addNewPost } from "./postSlice";
// import { postAdded } from "./postSlice";

export default function AddPostForm() {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [userId, setUserId] = useState("0");
  const users = useSelector((state) => state.users);
  const [addRequestStatus, setAddRequestStatus] = useState("idle");
  const canSave =
    [title, content, userId].every(Boolean) && addRequestStatus === "idle";
  return (
    <form
      action="#"
      onSubmit={async (e) => {
        if (canSave) {
          try {
            e.preventDefault();
            setAddRequestStatus("pending");
            // dispatch(postAdded(title, content, userId));
            // add unwrap to dispatch to return as promise, at the same time can obtain the error of the dispatch error using try catch
            await dispatch(
              addNewPost({ title, content, user: userId })
            ).unwrap();
            setTitle("");
            setContent("");
          } catch (err) {
            console.error("Failed to save the post: ", err);
          } finally {
            setAddRequestStatus("idle");
          }
        }
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
      <select value={userId} onChange={(e) => setUserId(e.target.value)}>
        {users.map((user) => (
          <option value={user.id} key={user.id}>
            {user.name}
          </option>
        ))}
      </select>
      <br />
      <button type="Submit">Post</button>
    </form>
  );
}
