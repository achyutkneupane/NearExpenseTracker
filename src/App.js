import "regenerator-runtime/runtime";

const nearAPI = require("near-api-js");
const { connect, KeyPair, keyStores, utils, WalletConnection } = nearAPI;
import React, { useEffect } from 'react';
import "./global.css";

import nearLogo from './assets/logo-white.svg'

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

import AddTransaction from "./components/AddTransaction";
import TransactionList from "./components/TransactionList";

export default function App() {

  const [showAddTransaction, setShowAddTransaction] = React.useState(false);
  const [showTransactionList, setShowTransactionList] = React.useState(true);
  const [signedIn, setSignedIn] = React.useState(window.walletConnection.isSignedIn());

  useEffect(() => {
  }, []);

  if (signedIn) {
    return (
      <main className="w-screen h-screen">
        <div className="pt-24 pb-8 text-center">
          <h1 className="mb-4 text-4xl">
            Transactions for <span className="text-blue-900 font-bolder">
              <a href={"https://explorer.testnet.near.org/accounts/"+window.accountId}  target="_blank">{window.accountId}</a>
            </span>
          </h1>
          <div className="flex items-center justify-center gap-2">
            <button
              id="sign-out-button"
              type="button"
              onClick={async () => {
                const near = await connect(config);
                const wallet = new WalletConnection(near);
                wallet.signOut();
                setSignedIn(false);
              }}
              className="text-white bg-[#050708] hover:bg-[#050708]/90 focus:ring-4 focus:outline-none focus:ring-[#050708]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#050708]/50 dark:hover:bg-[#050708]/30 mr-2 mb-2 h-12"
            >
              <img src={ nearLogo } className="w-6" />
              Sign Out
            </button>
            {!showAddTransaction && (
            <button
              type="button"
              onClick={() => {setShowAddTransaction(true); setShowTransactionList(false)}}
              className="text-white bg-[#050708] hover:bg-[#050708]/90 focus:ring-4 focus:outline-none focus:ring-[#050708]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#050708]/50 dark:hover:bg-[#050708]/30 mr-2 mb-2 h-12"
            >
              Add Transaction
            </button>
            )}
            {showAddTransaction && (
            <button
              type="button"
              id="cancel-form"
              onClick={() => {setShowAddTransaction(false); setShowTransactionList(true)}}
              className="text-white bg-[#050708] hover:bg-[#050708]/90 focus:ring-4 focus:outline-none focus:ring-[#050708]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#050708]/50 dark:hover:bg-[#050708]/30 mr-2 mb-2 h-12"
            >
              Cancel
            </button>
            )}
          </div>
          {showAddTransaction && <AddTransaction setShowAddTransaction={setShowAddTransaction} setShowTransactionList={setShowTransactionList} />}
          {showTransactionList && <TransactionList />}
        </div>
      </main>
    );
  }

  // if not signed in, return early with sign-in prompt
  if (!signedIn) {
    return (
      <>
        <main className="flex flex-col items-center justify-center w-screen h-screen ">
          <div className="text-center">
            <h1 className="mb-4 text-4xl">NEAR Expense Tracker</h1>
            <div className="flex items-center justify-center gap-2">
              <button
                id="sign-in-button"
                type="button"
                onClick={async () => {
                    const nearConfig = getConfig(process.env.NODE_ENV || "testnet");
                    const near = await connect(config);
                    const wallet = new WalletConnection(near);
                    await wallet.requestSignIn(nearConfig.contractName, "NEAR Expense Tracker");
                }}
                className="text-white bg-[#050708] hover:bg-[#050708]/90 focus:ring-4 focus:outline-none focus:ring-[#050708]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#050708]/50 dark:hover:bg-[#050708]/30 mr-2 mb-2 h-12"
              >
                <img src={nearLogo} className="w-6" />
                Sign in with NEAR
              </button>
            </div>
          </div>
        </main>
      </>
    );
  }

  return <>
  
    <div class="flex justify-center -mt-16 gap-8">
        <div>
            <a class="github-button" href="https://github.com/achyutkneupane" data-color-scheme="no-preference: dark; light: light; dark: dark;" data-size="large" data-show-count="true" aria-label="Follow @achyutkneupane on GitHub">Follow @achyutkneupane</a>
        </div>
        <div>
            <a class="github-button" href="https://github.com/achyutkneupane/NearExpenseTracker" data-color-scheme="no-preference: dark; light: light; dark: dark;" data-icon="octicon-star" data-size="large" data-show-count="true" aria-label="Star achyutkneupane/NearExpenseTracker on GitHub">Star</a>
        </div>
    </div>
    </>;
}
