import React, { useEffect } from "react";
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
var moment = require('moment');

function TransactionList() {
  const [currentAmount, setCurrentAmount] = React.useState(0);
  const [allTransactions, setAllTransactions] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  useEffect(() => {
    async function getTransactions() {
      const transList = await contract.getTransactions({
        user: window.accountId,
      });
      let currentAmount = 0;
      if (transList.length == 0) setLoading(false);
        let sortedTrans = transList.sort((a, b) => a.dateTime - b.dateTime);
        transList.forEach((transaction) => {
          if (transaction.type === "Expense") {
            currentAmount -= ~~transaction.amount;
          } else if (transaction.type === "Income") {
            currentAmount += ~~transaction.amount;
          } else {
            currentAmount;
          }
          setAllTransactions(sortedTrans);
          setCurrentAmount(currentAmount);
          setLoading(false);
        });
    }
    getTransactions();
  }, []);

  return (
    <>
      <div
        className="flex flex-col items-center w-full gap-4"
        data-behavior="viewSection"
      >
        <h5 className="text-2xl">
          Current Amount:{" "}
          {loading ? (
            <span className="text-gray-500">Fetching....</span>
          ) : (
            currentAmount
          )}
        </h5>
        <div className="w-2/3">
          {loading ? (
            <div className="flex flex-col items-center w-full gap-4">
              <h5 className="text-2xl">Loading...</h5>
            </div>
          ) : ( allTransactions.length == 0 ? (<h5 className='text-xl text-red-800'>No Transactions</h5>) : (
            <Table className="w-full text-sm text-left text-gray-800 dark:text-gray-400">
              <Thead className="text-xs text-white uppercase bg-black dark:bg-gray-700 dark:text-gray-400">
                <Tr>
                  <Th scope="col" className="px-6 py-3">
                    Date
                  </Th>
                  <Th scope="col" className="px-6 py-3">
                    Time
                  </Th>
                  <Th scope="col" className="px-6 py-3">
                    Description
                  </Th>
                  <Th scope="col" className="px-6 py-3">
                    Amount
                  </Th>
                  <Th scope="col" className="px-6 py-3">
                    Type
                  </Th>
                </Tr>
              </Thead>
              <Tbody>
                {allTransactions &&
                  allTransactions.map((transaction, index) => {
                    const { type, amount, description, dateTime } = transaction;
                    return (
                      <Tr
                        key={index}
                        className={
                          "border-b border-gray-300" +
                          (type == "Expense" ? " bg-red-200" : " bg-green-200")
                        }
                      >
                        <Td
                          scope="row"
                          className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap"
                        >
                          {moment(dateTime*1).format("YYYY-MM-DD")}
                        </Td>
                        <Td
                          scope="row"
                          className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap"
                        >
                          {moment(dateTime*1).format("hh:mm:ss A")}
                        </Td>
                        <Td className="px-6 py-4">{description}</Td>
                        <Td className="px-6 py-4">{amount}</Td>
                        <Td className="px-6 py-4">{type}</Td>
                      </Tr>
                    );
                  })}
              </Tbody>
            </Table>
          ))}
        </div>
      </div>
    </>
  );
}

export default TransactionList;
