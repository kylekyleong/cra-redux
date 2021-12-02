import { createSlice } from "@reduxjs/toolkit";

const initialState = [
  { id: "0", name: "Kyle Ong" },
  { id: "1", name: "Wilston Jack" },
  { id: "2", name: "Ninja Van" },
];

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
});

export default userSlice.reducer;

export const selectUsers = (state) => state.users;

export const selectUserById = (state, userId) =>
  state.users.find((user) => user.id === userId);
