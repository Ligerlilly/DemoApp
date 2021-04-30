import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Session {
    readonly username: string;
    readonly password: string;
}

export const initialSessionState: Session = {
    username: "",
    password: "",
};

export const sessionSlice = createSlice({
    name: "session",
    initialState: initialSessionState as Session,
    reducers: {
        receiveSession: {
            reducer: (state, action: PayloadAction<Session>) => action.payload,
            prepare: (session: Session) => {
                return {
                    payload: {
                        ...session,
                    },
                };
            },
        },
    },
});

export const { receiveSession } = sessionSlice.actions;
export default sessionSlice.reducer;
