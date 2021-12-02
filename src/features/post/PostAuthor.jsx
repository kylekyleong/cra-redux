import { useSelector } from "react-redux";

export default function PostAuthor(props) {
  const author = useSelector((state) =>
    state.users.find((user) => user.id === props.userId)
  );

  return <>by {author ? author.name : "Unknown author"}</>;
}
