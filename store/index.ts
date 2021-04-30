import { configureStore } from "@reduxjs/toolkit";
import sessionReducer from "./modules/session/session_slice";
import logger from "redux-logger";

export const store = configureStore({
    reducer: { session: sessionReducer },
    middleware: [logger],
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
