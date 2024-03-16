import { combineReducers, configureStore } from "@reduxjs/toolkit";

import { bookingsReducer } from "./bookings";

const appReducer = combineReducers({
  bookings: bookingsReducer,
});

const store = configureStore({
  reducer: appReducer,
  middleware: (gdb) =>
    gdb({
      serializableCheck: false,
    }),
  devTools: process.env.NODE_ENV !== "production",
});

export default store;
