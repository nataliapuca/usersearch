import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import tasksReducer from "./slices/taskSlice";

import formReducer from "./slices/userFormSlice";
import userFormReducer from "./slices/taskFormSlice";

const store = configureStore({
  reducer: {
    users: userReducer,
    tasks: tasksReducer,
    userForm: formReducer,
    taskForm: userFormReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
