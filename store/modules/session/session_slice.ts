import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Session {
    readonly jobcoinAddress: string;
}

export const initialSessionState: Session = {
    jobcoinAddress: "",
};

export const sessionSlice = createSlice({
    name: "session",
    initialState: initialSessionState as Session,
    reducers: {
        receiveSession: {
            reducer: (state, action: PayloadAction<Session>) => action.payload,
            prepare: (session: Session) => {
                return {
                    payload: session,
                };
            },
        },
    },
    extraReducers: (builder) => {
        builder.addCase("LOGOUT", (state, action) => initialSessionState);
    },
});

export const { receiveSession } = sessionSlice.actions;
export default sessionSlice.reducer;
