import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
// import logo from "./logo.svg";
// import { Counter } from "./features/counter/Counter";
import "./App.css";
import Navbar from "./app/Navbar";
import EditPostForm from "./features/post/EditPostForm";
import PostsList from "./features/post/PostsList";
import SinglePostPage from "./features/post/SinglePostPage";
import UsersList from "./features/user/UsersList";
import UserPage from "./features/user/UserPage";
import NotificationsList from "./features/notifications/NotificationsList";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />
        <Routes>
          <Route
            index
            path="/"
            element={
              <section>
                <h2>Welcome to the Redux Essentials example app!</h2>
              </section>
            }
          />
          <Route path="posts" element={<PostsList />} />
          <Route path="posts/:postId" element={<SinglePostPage />} />
          <Route path="editPost/:postId" element={<EditPostForm />} />
          <Route path="users" element={<UsersList />} />
          <Route path="users/:userId" element={<UserPage />} />
          <Route path="notifications" element={<NotificationsList />} />
          <Route
            path="*"
            element={
              <div>
                <p>There's nothing here!</p>
              </div>
            }
          ></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
