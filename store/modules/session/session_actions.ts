import { createAction, nanoid } from "@reduxjs/toolkit";
import { Session } from "./session_state";

export const receiveSession = createAction(
    "RECEIVE_SESSION",
    function prepare(session: Session) {
        return {
            payload: {
                ...session,
            },
        };
    }
);
