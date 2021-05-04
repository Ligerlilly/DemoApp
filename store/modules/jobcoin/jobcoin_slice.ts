import { Alert } from "react-native";
import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { jobcoinClient } from "./jobcoin_client";

interface Transaction {
    readonly amount: string;
    readonly timestamp: string;
    readonly toAddress: string;
}

interface JobCoin {
    readonly balance: string;
    readonly transactions: ReadonlyArray<Transaction>;
}

export const initialJobcoinState: JobCoin = {
    balance: "",
    transactions: [],
};

export const fetchByJobcoinAddress = createAsyncThunk(
    "session/fetchByJobcoinAddress",
    async (jobcoinAdress: string) => {
        const response = await jobcoinClient.fetchJobcoinAddress(jobcoinAdress);
        return response.data;
    }
);

export const jobcoinSlice = createSlice({
    name: "session",
    initialState: initialJobcoinState as JobCoin,
    reducers: {
        receiveSession: {
            reducer: (state, action: PayloadAction<JobCoin>) => action.payload,
            prepare: (jobcoin: JobCoin) => {
                return {
                    payload: jobcoin,
                };
            },
        },
    },
    extraReducers: (builder) => {
        builder.addCase(
            fetchByJobcoinAddress.fulfilled,
            (state, { payload }) => {
                console.log(payload);

                return payload;
            }
        ),
            builder.addCase(fetchByJobcoinAddress.rejected, (state, action) => {
                //   if (action.payload) {
                //     // Since we passed in `MyKnownError` to `rejectValue` in `updateUser`, the type information will be available here.
                //     state.error = action.payload.errorMessage
                //   } else {
                //     state.error = action.error
                //   }
                Alert.alert("We're sorry something went wrong");
            });
    },
});

export const { receiveSession } = jobcoinSlice.actions;
export default jobcoinSlice.reducer;
