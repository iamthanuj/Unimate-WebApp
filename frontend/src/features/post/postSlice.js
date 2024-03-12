import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import postService from "./postService";

const initialState = {
  posts: [],
  allPosts: [],
  adminPosts:[],
  isErrorPost: false,
  isSuccessPost: false,
  isLoadingPost: false,
  messagePost: "",
  // updatedPost:[]
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
  async (postId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await postService.deletePost(postId, token);
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
export const likePost = createAsyncThunk("posts/like", async (id, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token;
    return await postService.likePost(id, token);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

//comment post
export const commentPost = createAsyncThunk(
  "posts/comment",
  async (commentData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await postService.commentPost(commentData, token);
    } catch (error) {
      (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);



//comment post
export const getAllPostsAdmin = createAsyncThunk(
  "posts/adminposts",
  async (_, thunkAPI) => {
    try {
      return await postService.getAllAdminPosts();
    } catch (error) {
      (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);



// Delete user post by admin
export const adminDeletePost = createAsyncThunk(
  "posts/deleteadmin",
  async (postId, thunkAPI) => {
    try {
      return await postService.adminDeletePost(postId);
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




export const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    postReset: (state) => initialState,
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
        state.isLoadingPost = true;
      })

      .addCase(getPosts.fulfilled, (state, action) => {
        state.isLoadingPost = false;
        state.isSuccessPost = true;
        state.posts = action.payload;
      })

      .addCase(getPosts.rejected, (state, action) => {
        state.isLoadingPost = false;
        state.isErrorPost = true;
        state.messagePost = action.payload;
      })

      //get all posts

      .addCase(getAllPosts.pending, (state) => {
        state.isLoadingPost = true;
      })

      .addCase(getAllPosts.fulfilled, (state, action) => {
        state.isLoadingPost = false;
        state.isSuccessPost = true;
        state.allPosts = action.payload;
      })

      .addCase(getAllPosts.rejected, (state, action) => {
        state.isLoadingPost = false;
        state.isSuccessPost = false;
        state.isErrorPost = true;
        state.messagePost = action.payload;
      })

      //Like posts
      .addCase(likePost.fulfilled, (state, action) => {
        const updatedPost = state.allPosts.map((post) => {
          if (post._id === action.payload._id) return action.payload;
          return post;
        });
        state.allPosts = updatedPost;

        const updateUserPost = state.posts.map((post) => {
          if (post._id === action.payload._id) return action.payload;
          return post;
        });
        state.posts = updateUserPost;
      })

      //comment posts
      .addCase(commentPost.fulfilled, (state, action) => {
        const updatedPost = state.allPosts.map((post) => {
          if (post._id === action.payload._id) return action.payload;
          return post;
        });
        state.allPosts = updatedPost;
      })

      //delete post
      .addCase(deletePost.fulfilled, (state, action)=>{
        state.isSuccessPost = true;
        state.allPosts = state.allPosts.filter(
          (post)=> post._id !== action.payload.id 
        )
      })

      .addCase(deletePost.rejected, (state, action)=>{
        state.isErrorPost = true;
        state.isSuccessPost= false;
        state.isLoadingPost = false,
        state.messagePost = action.payload;
      })


      //getAdmin all posts
      .addCase(getAllPostsAdmin.fulfilled, (state, action) => {
        state.isLoadingPost = false;
        state.isSuccessPost = true;
        state.adminPosts = action.payload;
      })

      .addCase(getAllPostsAdmin.rejected, (state, action)=>{
        state.isErrorPost = true;
        state.isSuccessPost= false;
        state.isLoadingPost = false,
        state.messagePost = action.payload;
      })


      //delete post by admin
      .addCase(adminDeletePost.fulfilled, (state, action)=>{
        state.isSuccessPost = true;
        state.adminPosts = state.adminPosts.filter(
          (post)=> post._id !== action.payload.id 
        )
      })

      .addCase(adminDeletePost.rejected, (state, action)=>{
        state.isErrorPost = true;
        state.isSuccessPost= false;
        state.isLoadingPost = false,
        state.messagePost = action.payload;
      })

  },
});

export const { postReset } = postSlice.actions;
export default postSlice.reducer;
