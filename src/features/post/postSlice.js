import {
  createAsyncThunk,
  createSlice,
  nanoid,
  createSelector,
} from "@reduxjs/toolkit";

export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  const response = await fetch("https://api.sampleapis.com/coffee/hot");
  return response.json();
});

export const addNewPost = createAsyncThunk(
  "posts/addNewPost",
  async (initialPost, { getState, dispatch }) => {
    return {
      ...initialPost,
      id: nanoid(),
      date: new Date().toString(),
      reactions: {
        thumbsUp: 0,
        hooray: 0,
        heart: 0,
        rocket: 0,
        eyes: 0,
      },
    };
  }
);

// const postsAdapter = createEntityAdapter({
//   sortComparer: (a, b) => b.date.localeCompare(a.date)
// })

// const initialState = postsAdapter.getInitialState({
//   status: 'idle',
//   error: null
// })

export const postSlide = createSlice({
  name: "post",
  initialState: {
    posts: [],
    status: "idle",
    error: null,
  },
  reducers: {
    postAdded: {
      reducer(state, action) {
        state.posts.push(action.payload);
      },
      prepare(title, content, userId) {
        return {
          payload: {
            id: nanoid(),
            title,
            content,
            user: userId,
            date: new Date().toString(),
            reactions: {
              thumbsUp: 0,
              hooray: 0,
              heart: 0,
              rocket: 0,
              eyes: 0,
            },
          },
        };
      },
    },
    postUpdated(state, action) {
      const { id, title, content } = action.payload;
      const oldPost = state.posts.find((post) => post.id === id);
      if (oldPost) {
        oldPost.title = title;
        oldPost.content = content;
      }
    },
    reactionAdded(state, action) {
      const { postId, reaction } = action.payload;
      const oldPost = state.posts.find((post) => post.id === postId);
      if (oldPost) {
        oldPost.reactions[reaction]++;
      }
    },
  },
  // Add extra reducer from outside the configure
  extraReducers(builder) {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.posts = state.posts.concat(
          action.payload.map((post) => {
            return {
              id: nanoid(),
              title: post.title,
              content: post.description,
              date: new Date().toString(),
              reactions: {
                thumbsUp: 0,
                hooray: 0,
                heart: 0,
                rocket: 0,
                eyes: 0,
              },
            };
          })
        );
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addNewPost.fulfilled, (state, action) => {
        state.posts.push(action.payload);
      });
  },
});

export default postSlide.reducer;

export const { postAdded, postUpdated, reactionAdded } = postSlide.actions;

export const selectPosts = (state) => state.posts.posts;

export const selectPostById = (state, postId) =>
  state.posts.posts.find((post) => post.id === postId);

// memoized selector
export const selectPostsByUser = createSelector(
  [selectPosts, (state, userId) => userId], // arguments for the callbcaks
  (posts, userId) => posts.filter((post) => post.user === userId)
);
