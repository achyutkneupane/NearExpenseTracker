import React, { StrictMode } from 'react'
import { createRoot } from "react-dom/client";
import App from './App'
import { initContract } from './utils'
import "regenerator-runtime/runtime";

const nearAPI = require("near-api-js");
const { connect, KeyPair, keyStores, utils, WalletConnection } = nearAPI;
require("dotenv").config();

import getConfig from "./config";
const { networkId } = getConfig(process.env.NODE_ENV || "development");

const keyStore = new keyStores.BrowserLocalStorageKeyStore();
const config = {
  networkId: networkId,
  keyStore,
  nodeUrl: "https://rpc.testnet.near.org",
  walletUrl: "https://wallet.testnet.near.org",
  helperUrl: "https://helper.testnet.near.org",
  explorerUrl: "https://explorer.testnet.near.org",
};

let allTransactions;

window.nearInitPromise = initContract()
  .then(() => {
      createRoot(document.querySelector('#root')).render(
      <StrictMode>
        <App />
      </StrictMode>
      )
  })
  .catch(console.error)