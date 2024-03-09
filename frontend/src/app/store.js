import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice"
import postReducer from "../features/post/postSlice"
import eventReducer from "../features/event/eventSlice"

export const store = configureStore({
    reducer:{
        auth:authReducer,
        post:postReducer,
        event:eventReducer,
    }
})