import React, { useEffect } from "react";

function TransactionList() {
  const [currentAmount, setCurrentAmount] = React.useState(0);
  const [allTransactions, setAllTransactions] = React.useState([]);

  useEffect(() => {
    async function getTransactions() {
        const transList = await contract.getTransactions({
            user: window.accountId,
          });
          let currentAmount = 0;
          transList.forEach((transaction) => {
            if (transaction.type === "Expense") {
              currentAmount -= ~~transaction.amount;
            } else if (transaction.type === "Income") {
              currentAmount += ~~transaction.amount;
            } else {
              currentAmount;
            }
            setAllTransactions(transList);
            setCurrentAmount(currentAmount);
          });
    }
    getTransactions();

  }, []);

  return (
    <>
      <div
        className="w-full flex flex-col items-center gap-4"
        data-behavior="viewSection"
      >
        <h5 className="text-2xl">Current Amount: {currentAmount}</h5>
        <table className="bg-black text-white overflow-y-auto w-2/3">
          <thead className="border-b border-white text-center">
            <tr>
              <th scope="col">Date</th>
              <th scope="col">Description</th>
              <th scope="col">Amount</th>
              <th scope="col">Type</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {allTransactions.map((transaction,index) => {
                const { type, amount, description, dateTime } = transaction;
                return (
                    <tr key={index} className={ type === "Expense" ? "bg-red-600" : "bg-green-600"}>
                        <td>{dateTime}</td>
                        <td>{description}</td>
                        <td>{amount}</td>
                        <td>{type}</td>
                    </tr>
                );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default TransactionList;
