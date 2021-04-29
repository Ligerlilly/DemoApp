import { Session, initialSessionState } from "./session_state";
import { receiveSession } from "./session_actions";
import { createReducer } from "@reduxjs/toolkit";

export const sessionReducer = createReducer(initialSessionState, (builder) => {
    builder
        .addCase(receiveSession, (state, action) => action.payload)
        .addDefaultCase((state, action) => initialSessionState);
});
