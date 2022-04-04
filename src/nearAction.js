import "regenerator-runtime/runtime";

const nearAPI = require("near-api-js");
const { connect, KeyPair, keyStores, utils, WalletConnection } = nearAPI;

import getConfig from './config'
import { initContract ,login, logout } from './utils'
const { networkId } = getConfig(process.env.NODE_ENV || 'development')

const keyStore = new keyStores.BrowserLocalStorageKeyStore();
  const config = {
    networkId: "testnet",
    keyStore,
    nodeUrl: "https://rpc.testnet.near.org",
    walletUrl: "https://wallet.testnet.near.org",
    helperUrl: "https://helper.testnet.near.org",
    explorerUrl: "https://explorer.testnet.near.org",
  };

let allTransactions;


// This is for future update. I am not being able to add donations and also I am not getting proper support from community

// async function sendDonation(donation) {
//   const donationAmount = nearAPI.utils.format.parseNearAmount(donation);
//   console.log(
//     "Sending donation of " + donation + " NEAR and " + donationAmount
//   );
//   const sender = window.accountId;
//   const receiver = "achyut.testnet";
//   const networkId = "testnet";
//   const near = await connect(config);
//   const senderAccount = await near.account(sender);
//   const result = await senderAccount.sendMoney(receiver, donationAmount);

//   const transactionLink = `https://explorer.${networkId}.near.org/transactions/${result.transaction.hash}`;
//   console.log(
//     `Transaction sent successfully. Transaction link: ${transactionLink}`
//   );
// }

// Displaying the signed in flow container and fill in account-specific data

// Signed In
document.querySelectorAll("[data-behavior=account-id]").forEach((el) => {
  el.innerHTML = `<a href="https://explorer.testnet.near.org/accounts/${window.accountId}" target="_blank">${window.accountId}</a>`;
});

fetchTrans();
async function fetchTrans() {
  allTransactions = await contract.getTransactions({ user: window.accountId });
  let currentAmount = 0;
  const dataContainer = document.querySelector(
    "[data-behavior=data-container]"
  );
  dataContainer.innerHTML = "";
  allTransactions.forEach((transaction) => {
    if (transaction.type === "Expense") {
      currentAmount -= ~~transaction.amount;
    } else if (transaction.type === "Income") {
      currentAmount += ~~transaction.amount;
    } else {
      currentAmount;
    }
    const { type, amount, description, dateTime } = transaction;
    const newRow = document.createElement("tr");
    newRow.innerHTML = `
      <td>${dateTime}</td>
      <td>${description}</td>
      <td>${amount}</td>
      <td>${type}</td>
    `;
    dataContainer.appendChild(newRow);
  });
  document.querySelector("[data-behavior=current-amount]").innerText =
    currentAmount;
}

function addTransactionForm() {
  document.querySelector("[data-behavior=addTransForm]").style.display = "flex";
  document.querySelector("[data-behavior=viewSection]").style.display = "none";
  document.querySelector("#show-form").style.display = "none";
  document.querySelector("#cancel-form").style.display = "block";
}
function viewList() {
  document.querySelector("[data-behavior=form-error]").innerText = "";
  document.querySelector("[data-behavior=addTransForm]").style.display = "none";
  document.querySelector("[data-behavior=viewSection]").style.display = "flex";
  document.querySelector("#show-form").style.display = "block";
  document.querySelector("#cancel-form").style.display = "none";
}

const submitButton = document.querySelector("#add-transaction");

// submitButton.onclick = async (event) => {
//   event.preventDefault();
//   const description = document.querySelector("#description").value;
//   const amount = document.querySelector("#amount").value;
//   const type = document.querySelector("#type").value;
//   const dateTime = document.querySelector("#dateTime").value;
//   // const donation = document.querySelector("#donation").value;

//   if (!description || !amount || !dateTime || !type) {
//     document.querySelector("[data-behavior=form-error]").innerText =
//       "Please enter all fields";
//     return;
//   }
//   const transaction = {
//     description: description,
//     amount: amount,
//     type: type,
//     dateTime: dateTime,
//   };
//   submitButton.style.display = "none";
//   document.querySelector("#waitingButton").style.display = "flex";

//   const response = await contract.addTransaction(transaction);

//   document.querySelector("#description").value = "";
//   document.querySelector("#amount").value = "";
//   document.querySelector("#type").value = "Expense";
//   document.querySelector("#dateTime").value = "";

//   submitButton.style.display = "flex";
//   document.querySelector("#waitingButton").style.display = "none";
//   viewList();
//   await fetchTrans();
// };

// document.querySelector("#sign-out-button").onclick = async () => {
//   const near = await connect(config);
//   const wallet = new WalletConnection(near);
//   wallet.signOut();
// };
// document.querySelector("#show-form").onclick = () => {
//   addTransactionForm();
// };

// document.querySelector("#cancel-form").onclick = () => {
//   viewList();
// };


// Signed Out
// document.querySelector("#sign-in-button").onclick = async () => {
//   const nearConfig = getConfig(process.env.NODE_ENV || "testnet");
//   const near = await connect(config);
//   const wallet = new WalletConnection(near);
//   wallet.requestSignIn(nearConfig.contractName, "NEAR Expense Tracker");
// };