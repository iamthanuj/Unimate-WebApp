import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import eventService from "./eventService";

const initialState = {
  events: [],
  isErrorEvent: false,
  isSuccessEvent: false,
  isLoadingEvent: false,
  messageEvent: "",
};


//create event
export const createEvent = createAsyncThunk(
  "events/create",
  async (eventData, thunkAPI) => {
    try {
      return await eventService.createEvent(eventData);
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



//get all events
export const getEvents = createAsyncThunk(
  "events/getevents",
  async (_d, thunkAPI) => {
    try {
      return await eventService.getEvents();
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
    builder.
    
    // create event
    addCase(createEvent.fulfilled, (state, action) => {
      state.isSuccessEvent = true;
      state.isLoadingEvent = false;
      state.isErrorEvent = false;
      state.events = [...state.events, action.payload];;
    })


    .addCase(createEvent.rejected, (state,action)=>{
      state.isSuccessEvent = false;
      state.isLoadingEvent=false;
      state.isErrorEvent = true;
      state.messageEvent = action.payload;
    })

    .addCase(getEvents.fulfilled, (state, action)=>{
      state.isSuccessEvent = true;
      state.isErrorEvent = false;
      state.isLoadingEvent = false;
      state.events = action.payload;
    })

    .addCase(getEvents.rejected, (state, action)=>{
      state.isSuccessEvent = false;
      state.isErrorEvent = true;
      state.isLoadingEvent = false;
      state.messageEvent = action.payload;
    })
  },
});

export const { eventReset } = eventSlice.actions;
export default eventSlice.reducer;
