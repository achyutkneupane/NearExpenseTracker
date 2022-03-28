export class Transaction {
    user: string;
    type: Transaction.Type;
    amount: number;
    dateTime: Date;
    description: string;

    constructor(user: string,type: Transaction.Type, amount: number, dateTime: Date, description: string) {
        this.user = user;
        this.type = type;
        this.amount = amount;
        this.dateTime = dateTime;
        this.description = description;
    }
}
export namespace Transaction {
    export enum Type {
        Expense,
        Income
    }
}