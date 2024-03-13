import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import mentorService from "./mentorService";

const initialState = {
  mentors: [],
  isErrorMentor: false,
  isSuccessMentor: false,
  isLoadingMentor: false,
  messageMentor: "",
};

// Create mentor
export const createMentor = createAsyncThunk(
  "mentors/create",
  async (mentorData, thunkAPI) => {
    try {
      return await mentorService.createMentor(mentorData);
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

// Get all mentors
export const getMentors = createAsyncThunk(
  "mentors/getMentors",
  async (_, thunkAPI) => {
    try {
      return await mentorService.getMentors();
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

//edit mentor
export const updateMentor = createAsyncThunk(
  "mentors/update",
  async (updatedMentor, thunkAPI) => {
    try {
      return await mentorService.updateMentor(updatedMentor);
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

// Delete mentor
export const deleteMentor = createAsyncThunk(
  "mentors/delete",
  async (mentorId, thunkAPI) => {
    try {
      return await mentorService.deleteMentor(mentorId);
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

export const mentorSlice = createSlice({
  name: "mentor",
  initialState,
  reducers: {
    mentorReset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      // Create mentor
      .addCase(createMentor.fulfilled, (state, action) => {
        state.isSuccessMentor = true;
        state.isLoadingMentor = false;
        state.isErrorMentor = false;
        state.mentors = [...state.mentors, action.payload];
      })
      .addCase(createMentor.rejected, (state, action) => {
        state.isSuccessMentor = false;
        state.isLoadingMentor = false;
        state.isErrorMentor = true;
        state.messageMentor = action.payload;
      })
      // Get all mentors
      .addCase(getMentors.fulfilled, (state, action) => {
        state.isSuccessMentor = true;
        state.isLoadingMentor = false;
        state.isErrorMentor = false;
        state.mentors = action.payload;
      })
      .addCase(getMentors.rejected, (state, action) => {
        state.isSuccessMentor = false;
        state.isLoadingMentor = false;
        state.isErrorMentor = true;
        state.messageMentor = action.payload;
      })

      //update events
      .addCase(updateMentor.fulfilled, (state, action) => {
        state.isSuccessMentor = true;
        state.isErrorMentor = false;
        state.isLoadingMentor = false;

        const updatedMentor = state.mentors.map((mentor) => {
          if (mentor._id === action.payload._id) return action.payload;
          return mentor;
        });
        state.mentors = updatedMentor;
      })

      .addCase(updateMentor.rejected, (state, action) => {
        state.isSuccessMentor = false;
        state.isErrorMentor = true;
        state.isLoadingMentor = false;
        state.messageMentor = action.payload;
      })

      .addCase(updateMentor.pending, (state, action) => {
        state.isLoadingMentor = true;
      })

      // Delete mentor
      .addCase(deleteMentor.fulfilled, (state, action) => {
        state.isSuccessMentor = true;
        state.isLoadingMentor = false;
        state.isErrorMentor = false;
        state.mentors = state.mentors.filter(
          (mentor) => mentor._id !== action.payload.id
        );
      })
      .addDefaultCase((state) => state);
  },
});

export const { mentorReset } = mentorSlice.actions;
export default mentorSlice.reducer;
