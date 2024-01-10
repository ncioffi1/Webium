import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux';
import App from './App.jsx'
import './index.css'
// import configureStore from './store';

// const store = configureStore();

// if (import.meta.env.MODE !== "production") {
//   window.store = store;
// }

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* <h1> HELLO!</h1> */}
    <App />
  </React.StrictMode>,
)
