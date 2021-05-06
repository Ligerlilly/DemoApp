import { Alert } from "react-native";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { jobcoinClient, TransactionParams } from "./jobcoin_client";

export interface Transaction {
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
    "jobcoin/fetchByJobcoinAddress",
    async (jobcoinAdress: string) => {
        const response = await jobcoinClient.fetchJobcoinAddress(jobcoinAdress);
        return response.data;
    }
);

export const sendCoinToAddress = createAsyncThunk(
    "jobcoin/sendCoinToAddress",
    async (transactionParams: TransactionParams) => {
        const response = await jobcoinClient.sendCoinToAddress(
            transactionParams
        );

        return response.data;
    }
);

export const jobcoinSlice = createSlice({
    name: "jobcoin",
    initialState: initialJobcoinState as JobCoin,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(
            fetchByJobcoinAddress.fulfilled,
            (state, { payload }) => {
                return payload;
            }
        ),
            builder.addCase(fetchByJobcoinAddress.rejected, (state, action) => {
                Alert.alert("jobcoin fetch failed");
            });
        builder.addCase("LOGOUT", (state, action) => initialJobcoinState);
    },
});

export default jobcoinSlice.reducer;
