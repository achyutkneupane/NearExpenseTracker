import moment from "moment";
import React from "react";

function AddTransaction({setShowAddTransaction,setShowTransactionList}) {
  const [showFormError, setShowFormError] = React.useState(false);
  const [waitingResponse, setWaitingResponse] = React.useState(false);

  function dateTimeValue(date, time) {
    const returnDateTime = moment(`${date} ${time}`, "YYYY-MM-DDThh:mm:ss A").format("x");
    return returnDateTime.toString();
  }

  const addTransactionFunc = async (event) => {
    setWaitingResponse(true);
    event.preventDefault();

    const { description, amount, type, date, time } = event.target.elements;

    if (!description || !amount || !date || !time || !type) {
      setShowFormError(true);
      return;
    }
    const transaction = {
      description: description.value,
      amount: amount.value,
      type: type.value,
      dateTime: dateTimeValue(date.value, time.value),
    };
    try {
      await window.contract.addTransaction(transaction);
    } catch (e) {
      console.error(e);
    }

    document.querySelector("#description").value = "";
    document.querySelector("#amount").value = "";
    document.querySelector("#type").value = "Expense";
    document.querySelector("#date").value = "";
    document.querySelector("#time").value = "";
    
    setWaitingResponse(false);
    setShowAddTransaction(false);
    setShowTransactionList(true);
  }

  return (
    <>
      <div
        className="flex flex-col items-center w-full"
      >
        <form onSubmit={addTransactionFunc} className="flex flex-col w-1/3 gap-4 mb-8">
          <div className="w-full">
            <label
              htmlFor="date"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Date
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg
                  className="w-5 h-5 text-gray-500 dark:text-gray-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </div>
              <input
                type="text"
                id="date"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 pl-10"
                placeholder="Enter Date"
                defaultValue={moment().format("YYYY-MM-DD")}
                required
              />
            </div>
              <span className={"text-gray-400 text-sm"}>
                In format: YYYY-MM-DD
              </span>
          </div>
          <div className="w-full">
            <label
              htmlFor="time"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Time
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg
                  className="w-5 h-5 text-gray-500 dark:text-gray-400"
                  fillRule={"evenodd"}
                  clipRule={'evenodd'}
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M12 0c6.623 0 12 5.377 12 12s-5.377 12-12 12-12-5.377-12-12 5.377-12 12-12zm0 1c6.071 0 11 4.929 11 11s-4.929 11-11 11-11-4.929-11-11 4.929-11 11-11zm0 11h6v1h-7v-9h1v8z"/>
                </svg>
              </div>
              <input
                type="text"
                id="time"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 pl-10"
                placeholder="Enter Time"
                defaultValue={moment().format("hh:mm:ss A")}
                required
              />
            </div>
            
            <span className={"text-gray-400 text-sm"}>
                In format: HH:MM:SS AM/PM
              </span>
          </div>
          <div className="w-full">
            <label
              htmlFor="amount"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Amount
            </label>
            <input
              type="text"
              id="amount"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Enter Amount"
              required
            />
          </div>
          <div className="w-full">
            <label
              htmlFor="type"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Type
            </label>
            <select
              id="type"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option value="Expense">Expense</option>
              <option value="Income">Income</option>
            </select>
          </div>
          <div className="w-full">
            <label
              htmlFor="description"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Description
            </label>
            <input
              type="text"
              id="description"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Enter Description"
              required
            />
          </div>
          {/* This is for future update. I am not being able to add donations and also I am not getting proper support from community
            <div className="w-full">
                <label htmlFor="donation"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Donate (optional)</label>
                <input type="text" id="donation"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Enter Donation Amount (in NEAR)" required>
            </div> */}
          <div className="w-full text-center">
            {showFormError && (
              <span
                className="font-bold text-red-800"
              >Please enter all fields</span>
            )}
          </div>
          <div className="flex justify-center w-full">
            <input
              type="submit"
              id="add-transaction"
              className="text-white bg-[#050708] hover:bg-[#050708]/90 focus:ring-4 focus:outline-none focus:ring-[#050708]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#050708]/50 dark:hover:bg-[#050708]/30 mr-2 mb-2 h-12 cursor-pointer"
              disabled={waitingResponse}
              value={waitingResponse ? "Adding..." : "+Add"}
            />
          </div>
        </form>
      </div>
    </>
  );
}

export default AddTransaction;