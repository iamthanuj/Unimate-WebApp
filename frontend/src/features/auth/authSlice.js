import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "./authService";

const user = JSON.parse(localStorage.getItem("user"));

const initialState = {
  user: user ? user : null,
  admin:"",
  adminSuccess:false,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
  friendList: [],
  allUsersAdmin:[],
};

//register User
export const register = createAsyncThunk(
  "auth/register",
  async (user, thunkAPI) => {
    try {
      return await authService.register(user);
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

//login user
export const login = createAsyncThunk("auth/login", async (user, thunkAPI) => {
  try {
    return await authService.login(user);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

//login admin
export const adminLogin = createAsyncThunk(
  "auth/adminlogin",
  async (admin, thunkAPI) => {
    try {
      return await authService.adminLogin(admin);
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

//logout user
export const logout = createAsyncThunk("auth/logout", async () => {
  await authService.logout();
});


//add friend
export const addRemoveFriend = createAsyncThunk(
  "auth/addFriend",
  async (friendData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await authService.addRemoveFriend(friendData, token);
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


//get admin all users
//get all events
export const getAdminAllUsers = createAsyncThunk(
  "auth/allusers",
  async (_, thunkAPI) => {
    try {
      return await authService.getAdminAllUsers();
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


//get admin all users
//get all events
export const adminDeleteUser = createAsyncThunk(
  "auth/deleteUser",
  async (userId, thunkAPI) => {
    try {
      return await authService.adminDeleteUser(userId);
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




//update user profile
export const updateProfile = createAsyncThunk(
  "auth/updateprofile",
  async (userData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await authService.updateUserProfile(userData, token);
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





export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder

      //register cases
      .addCase(register.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
      })

      //login cases
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
      })

      //logout case
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
      })

      //addfriend case
      .addCase(addRemoveFriend.fulfilled, (state, action) => {
        state.user.friends = action.payload;
        console.log(state.user);
      })

      .addCase(addRemoveFriend.rejected, (state, action) => {
        console.log(action.payload);
      })


      //admin login
      .addCase(adminLogin.fulfilled, (state,action)=>{
        state.adminSuccess = true;
        state.admin = action.payload.username
      })

      .addCase(adminLogin.rejected, (state, action)=>{
        state.adminSuccess = false;
        state.message = action.payload;
      })


      //get alla users admin
      .addCase(getAdminAllUsers.fulfilled, (state, action)=>{
        state.isSuccess = true;
        state.isError = false;
        state.isLoading = false;
        state.allUsersAdmin = action.payload;
      })


       //user delete  by admin
       .addCase(adminDeleteUser.fulfilled, (state, action)=>{
        console.log(action.payload)
        state.isSuccess = true;
        state.allUsersAdmin = state.allUsersAdmin.filter(
          (user)=> user._id !== action.payload.id 
        )
      })

      .addCase(adminDeleteUser.rejected, (state, action)=>{
        state.isError = true;
        state.isSuccess= false;
        state.isLoading = false,
        state.message = action.payload;
      })


        //user profile update
        .addCase(updateProfile.fulfilled, (state, action)=>{
          console.log(action.payload)
          state.isSuccess = true;
        })
  
        .addCase(updateProfile.rejected, (state, action)=>{
          state.isError = true;
          state.isSuccess= false;
          state.isLoading = false,
          state.message = action.payload;
        })
  

  },
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;
