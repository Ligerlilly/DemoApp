import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";

/**
 * Reduders
 */
import sessionReducer from "./modules/session/session_slice";
import jobcoinReducer from "./modules/jobcoin/jobcoin_slice";

/**
 * Store
 */
export const store = configureStore({
    reducer: { session: sessionReducer, jobcoin: jobcoinReducer },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

/**
 * Exported types
 */
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
