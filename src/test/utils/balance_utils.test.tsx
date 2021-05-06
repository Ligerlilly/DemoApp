import { calcBalances, BalanceHistory } from "../../utils/balance_utils";

describe("calcBalances", () => {
    const transactions = [
        {
            amount: "50",
            timestamp: "2021-05-03T20:08:31.743Z",
            toAddress: "Alice",
        },
        {
            amount: "12.5",
            fromAddress: "Alice",
            timestamp: "2021-05-03T20:08:31.746Z",
            toAddress: "Bob",
        },
        {
            amount: "1",
            fromAddress: "Alice",
            timestamp: "2021-05-05T00:55:29.015Z",
            toAddress: "Bob",
        },
    ];

    it("correctly calcs balance history from transactions", () => {
        const expected: BalanceHistory[] = [
            {
                balance: 50,
                timestamp: new Date("2021-05-03T20:08:31.743Z"),
            },
            {
                balance: 37.5,
                timestamp: new Date("2021-05-03T20:08:31.746Z"),
            },
            {
                balance: 36.5,
                timestamp: new Date("2021-05-05T00:55:29.015Z"),
            },
        ];
        expect(calcBalances("Alice", transactions)).toEqual(expected);
    });
});

export {};
