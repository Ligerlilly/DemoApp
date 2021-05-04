import { AxiosResponse, AxiosError } from "axios";
const axios = require("axios").default;

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
};
