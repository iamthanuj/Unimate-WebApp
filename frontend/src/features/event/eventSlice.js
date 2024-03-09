import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import eventService from "./eventService";

const initialState = {
  events: [],
  isErrorEvent: false,
  isSuccessEvent: false,
  isLoadingEvent: false,
  messageEvent: "",
};

export const createEvent = createAsyncThunk(
  "events/create",
  async (eventData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await eventService.createEvent(eventData, token);
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

export const eventSlice = createSlice({
  name: "event",
  initialState,
  reducers: {
    eventReset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder

    .addCase(createEvent.fulfilled, (state,action)=>{
        console.log(action.payload)
    })
  },
});

export const { eventReset } = eventSlice.actions;
export default eventSlice.reducer;
