/*
 * This is an example of an AssemblyScript smart contract with two simple,
 * symmetric functions:
 *
 * 1. setGreeting: accepts a greeting, such as "howdy", and records it for the
 *    user (account_id) who sent the request
 * 2. getGreeting: accepts an account_id and returns the greeting saved for it,
 *    defaulting to "Hello"
 *
 * Learn more about writing NEAR smart contracts with AssemblyScript:
 * https://docs.near.org/docs/develop/contracts/as/intro
 *xw
 */

import { Context, logging, storage, PersistentVector } from 'near-sdk-as'
import { Transaction } from './model';

@nearBindgen
export class Contract {

  transactions: PersistentVector<Transaction> = new PersistentVector<Transaction>("trans");

  @mutateState()

  addTransaction(type: Transaction.Type, amount: number, dateTime: Date, description: string): Transaction {
    let user = Context.sender;
    let trans: Transaction = new Transaction(user,type,amount,dateTime,description);
    logging.log(`Saving transaction "+${trans.type}+" of "+${trans.amount}" for user "${user}"`);
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
