import { Transaction } from "../../store/modules/jobcoin/jobcoin_slice";

interface BalanceHistory {
    readonly balance: number;
    readonly timestamp: Date;
}

export const calcBalances = (
    jobcoinAddress: string,
    transactions: ReadonlyArray<Transaction>
) => {
    // if transactions undefined or empty, return empty array
    if (transactions?.length === undefined || transactions.length === 0) {
        return [];
    }

    // the first transaction contains initial balance amount
    let balance = parseInt(transactions[0].amount, 10);

    // seed balanceHistory with inital balance
    const balanceHistory: BalanceHistory[] = [
        {
            balance: parseInt(transactions[0].amount, 10),
            timestamp: new Date(transactions[0].timestamp),
        },
    ];

    transactions.slice(1).forEach((transaction) => {
        // determin if transaction is a deposit
        if (transaction.toAddress === jobcoinAddress) {
            balance += parseInt(transaction.amount, 10);
            balanceHistory.push({
                balance,
                timestamp: new Date(transaction.timestamp),
            });
            return;
        }

        // transaction is a withdrawal
        balance -= parseInt(transaction.amount, 10);
        balanceHistory.push({
            balance,
            timestamp: new Date(transaction.timestamp),
        });
    });

    return balanceHistory;
};
