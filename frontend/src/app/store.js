import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/userSlice";
import {adminSlice} from "../features/adminSlice"

export default configureStore({
  reducer: {
    user: userReducer,
    admin: adminSlice.reducer,
  },
});

