import { Context, logging } from 'near-sdk-as'
import { Transaction, transactions} from './model';

@nearBindgen
export class Contract {

  addTransaction(type: string, amount: string, dateTime: string, description: string): void {
    let user = Context.sender;
    let trans: Transaction = new Transaction(user,type,amount,dateTime,description);
    logging.log(`Saving transaction ${trans.type} of ${trans.amount} for user ${user}`);
    transactions.push(trans);
  }

  getTransactions(user: string = Context.sender): Array<Transaction> | null {
    const getTrans: Array<Transaction> = [];
    for(let i=0;i<transactions.length;i++) {
      if(transactions[i].user == user) {
        getTrans.push(transactions[i]);
      }
    }
    return getTrans;
  }
}
