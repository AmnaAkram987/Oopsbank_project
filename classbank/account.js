export class BankAccount {
    Accountnumber = Math.floor(Math.random() * (9 * Math.pow(10, 10)) + Math.pow(10, 10));
    accountBalance;
    constructor() {
        this.accountBalance = 100;
    }
    transactionHistory = [];
    Debit(amount) {
        let index = String(new Date()).lastIndexOf(':') + 3;
        let date = String(new Date()).slice(0, index);
        this.accountBalance = -amount;
        this.transactionHistory.push({
            amount: amount,
            fee: 0,
            date: date,
            type: 'Debit'
        });
    }
    Credit(amount) {
        let index = String(new Date()).lastIndexOf(':') + 3;
        let date = String(new Date()).slice(0, index);
        if (amount > 100) {
            this.accountBalance += amount - 1;
            this.transactionHistory.push({
                amount: amount,
                fee: 1,
                date: date,
                type: 'Credit'
            });
        }
        else {
            this.accountBalance += amount;
            this.transactionHistory.push({
                amount: amount,
                fee: 0,
                date: date,
                type: 'Credit'
            });
        }
    }
}
