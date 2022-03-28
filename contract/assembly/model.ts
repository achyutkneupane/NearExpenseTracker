export class Transaction {
  user: string;
  type: string;
  amount: string;
  dateTime: string;
  description: string;

  constructor(
    user: string,
    type: string,
    amount: string,
    dateTime: string,
    description: string
  ) {
    this.user = user;
    this.type = type;
    this.amount = amount;
    this.dateTime = dateTime;
    this.description = description;
  }
}