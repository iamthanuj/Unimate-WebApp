import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import postService from "./postService";

const initialState = {
  posts: [],
  allPosts:[],
  isErrorPost: false,
  isSuccessPost: false,
  isLoadingPost: false,
  messagePost: "",
  isLiked : false,
  updatedPost:[]
};

// Create new post
export const createPost = createAsyncThunk(
  "posts/create",
  async (postData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await postService.createPost(postData, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get user posts
export const getPosts = createAsyncThunk(
  "posts/getUserAll",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await postService.getUserPosts(token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);


// Get all posts
export const getAllPosts = createAsyncThunk(
  "posts/getAllPosts",
  async (_, thunkAPI) => {
    try {
      return await postService.getAllPosts();
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);


// Delete user post
export const deletePost = createAsyncThunk(
  "posts/delete",
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await postService.deletePost(id, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);



//like post
export const likePost = createAsyncThunk(
  "posts/like",
  async(id, thunkAPI)=>{
    try {
      const token = thunkAPI.getState().auth.user.token;
      console.log(token)
      return await postService.likePost(id,token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }

  }
)



export const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    postReset: (state) => initialState,

    toggleLike(state, action) {
      const postId = action.payload;
      state.posts[postId] = !state.posts[postId];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createPost.pending, (state) => {
        state.isLoadingPost = true;
      })

      .addCase(createPost.fulfilled, (state, action) => {
        state.isLoadingPost = false;
        state.isSuccessPost = true;
        state.posts.push(action.payload);
      })

      .addCase(createPost.rejected, (state, action) => {
        state.isLoadingPost = false;
        state.isSuccessPost = false;
        state.isErrorPost = true;
        state.messagePost = action.payload;
      })

      //get posts
      .addCase(getPosts.pending, (state) => {
        state.isLoadingPost = true
      })

      .addCase(getPosts.fulfilled, (state, action) => {
        state.isLoadingPost = false
        state.isSuccessPost = true
        state.posts = action.payload
      })

      .addCase(getPosts.rejected, (state, action) => {
        state.isLoadingPost = false
        state.isErrorPost = true
        state.messagePost = action.payload
      })

      //get all posts

      .addCase(getAllPosts.pending, (state)=>{
        state.isLoadingPost = true
      })

      .addCase(getAllPosts.fulfilled, (state,action)=>{
        state.isLoadingPost = false
        state.isSuccessPost = true
        state.allPosts = action.payload
      })

      .addCase(getAllPosts.rejected, (state, action)=>{
        state.isLoadingPost = false
        state.isErrorPost = true
        state.messagePost = action.payload
      })

      .addCase(likePost.fulfilled, (state,action)=>{
        state.isLiked = true
        state.updatedPost = action.payload
      })
  },
});



export const { postReset,toggleLike } = postSlice.actions
export default postSlice.reducer