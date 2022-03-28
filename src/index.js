import 'regenerator-runtime/runtime'

import { initContract, login, logout } from './utils'

import getConfig from './config'
const { networkId } = getConfig(process.env.NODE_ENV || 'development')

let allTransactions

// const submitButton = document.querySelector('form button')

// document.querySelector('form').onsubmit = async (event) => {
//   event.preventDefault()

//   // get elements from the form using their id attribute
//   const { fieldset, transactions } = event.target.elements

//   // disable the form while the value gets updated on-chain
//   fieldset.disabled = true

//   try {
//     // make an update call to the smart contract
//     await window.contract.addTransaction({
//       // pass the value that the user entered in the greeting field
//       type: transactions.type,
//       amount: transactions.amount,
//       description: transactions.description,
//       dateTime: transactions.dateTime,
//     })
//   } catch (e) {
//     alert(
//       'Something went wrong! ' +
//       'Maybe you need to sign out and back in? ' +
//       'Check your browser console for more info.'
//     )
//     throw e
//   } finally {
//     // re-enable the form, whether the call succeeded or failed
//     fieldset.disabled = false
//   }

//   // disable the save button, since it now matches the persisted value
//   submitButton.disabled = true

//   // update the greeting in the UI
//   await fetchTrans()

//   // // show notification
//   // document.querySelector('[data-behavior=notification]').style.display = 'block'

//   // // remove notification again after css animation completes
//   // // this allows it to be shown again next time the form is submitted
//   // setTimeout(() => {
//   //   document.querySelector('[data-behavior=notification]').style.display = 'none'
//   // }, 11000)
// }

// document.querySelector('input#greeting').oninput = (event) => {
//   if (event.target.value !== currentGreeting) {
//     submitButton.disabled = false
//   } else {
//     submitButton.disabled = true
//   }
// }

document.querySelector('#sign-in-button').onclick = login
document.querySelector('#sign-out-button').onclick = logout

// Display the signed-out-flow container
function signedOutFlow() {
  document.querySelector('#signed-out-flow').style.display = 'block'
}

// Displaying the signed in flow container and fill in account-specific data
function signedInFlow() {
  console.log("signed In");
  document.querySelector('#signed-in-flow').style.display = 'block'

  document.querySelectorAll('[data-behavior=account-id]').forEach(el => {
    el.innerText = window.accountId
  })


  fetchTrans()
}

// update global currentGreeting variable; update DOM with it
async function fetchTrans() {
  console.log(contract);
  allTransactions = await contract.getTransactions({ accountId: window.accountId })
  // document.querySelectorAll('[data-behavior=expense_tracker]').forEach(el => {
  //   // set divs, spans, etc
  //   el.innerText = currentGreeting

  //   // set input elements
  //   el.value = currentGreeting
  // })
}

// `nearInitPromise` gets called on page load
window.nearInitPromise = initContract()
  .then(() => {
    if (window.walletConnection.isSignedIn()) signedInFlow()
    else signedOutFlow()
  })
  .catch(console.error)
