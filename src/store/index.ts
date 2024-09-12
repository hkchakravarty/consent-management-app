import { configureStore } from "@reduxjs/toolkit";
import consentSlice from "./consentSlice";

export const store = configureStore({
  reducer: {
    consent: consentSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
