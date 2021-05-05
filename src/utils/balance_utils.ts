import { Transaction } from "../../store/modules/jobcoin/jobcoin_slice";

interface BalanceHistory {
    readonly balance: number;
    readonly timestamp: Date;
}

export const calcBalances = (
    jobcoinAddress: string,
    transactions: ReadonlyArray<Transaction>
) => {
    if (transactions?.length === undefined || transactions.length === 0) {
        return [];
    }

    let balance = parseInt(transactions[0].amount, 10);
    const balanceHistory: BalanceHistory[] = [
        {
            balance: parseInt(transactions[0].amount, 10),
            timestamp: new Date(transactions[0].timestamp),
        },
    ];
    transactions.slice(1).forEach((transaction) => {
        if (transaction.toAddress === jobcoinAddress) {
            balance += parseInt(transaction.amount, 10);
            balanceHistory.push({
                balance,
                timestamp: new Date(transaction.timestamp),
            });
            return;
        }

        balance -= parseInt(transaction.amount, 10);
        balanceHistory.push({
            balance,
            timestamp: new Date(transaction.timestamp),
        });
    });

    return balanceHistory;
};
