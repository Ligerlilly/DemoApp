import { AxiosResponse, AxiosError } from "axios";
const axios = require("axios").default;

export interface TransactionParams {
    readonly fromAddress: string;
    readonly toAddress: string;
    readonly amount: string;
}

export const jobcoinClient = {
    fetchJobcoinAddress: (jobcoinAddress: string) => {
        return axios
            .get(
                `http://jobcoin.gemini.com/thicken-bronchial/api/addresses/${jobcoinAddress}`
            )
            .then(function (response: AxiosResponse) {
                // handle success
                console.log(response);
                return response;
            })
            .catch(function (error: AxiosError) {
                // handle error
                console.log(error);
            });
    },
    sendCoinToAddress: (transactionParams: TransactionParams) => {
        return axios
            .post(
                "http://jobcoin.gemini.com/thicken-bronchial/api/transactions",
                {
                    ...transactionParams,
                }
            )
            .then(function (response: AxiosResponse) {
                // handle success
                console.log(response);
                return response;
            })
            .catch(function (error: AxiosError) {
                // handle error
                console.log(error);
            });
    },
};
