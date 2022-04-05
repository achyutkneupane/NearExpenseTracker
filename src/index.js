import React, { StrictMode }  from 'react'
import ReactDOM from "react-dom";
import App from './App'
import { initContract } from './utils'
import "regenerator-runtime/runtime";

window.nearInitPromise = initContract()
  .then(() => {
      ReactDOM.render(
        <StrictMode>
          <App />
      </StrictMode>,
        document.querySelector('#root')
      );
  })
  .catch(console.error)