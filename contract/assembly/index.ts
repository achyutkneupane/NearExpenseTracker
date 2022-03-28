import { Context, logging, storage, PersistentVector } from 'near-sdk-as'
import { Transaction} from './model';

@nearBindgen
export class Contract {

  transactions: PersistentVector<Transaction> = new PersistentVector<Transaction>("trans");

  @mutateState()

  addTransaction(type: string, amount: string, dateTime: string, description: string): Transaction {
    let user = Context.sender;
    let trans: Transaction = new Transaction(user,type,amount,dateTime,description);
    logging.log(`Saving transaction ${trans.type} of ${trans.amount} for user ${user}`);
    this.transactions.push(trans);
    return trans;
  }

  getTransactions(user: string): Array<Transaction> | null {
    let getTrans = new Array<Transaction>(this.transactions.length);
    for(let i=0;i<this.transactions.length;i++) {
      if(this.transactions[i].user == user) {
        getTrans[i] = this.transactions[i];
      }
    }
    return getTrans;
  }
}
