import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import formReducer from "./formSlice"; // Add this line to import formReducer

const store = configureStore({
  reducer: {
    users: userReducer,
    form: formReducer, // Combining the user and form reducers
  },
});

// Types for root state and dispatch, based on the configured store
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
