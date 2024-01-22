import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux';
import App from './App.jsx'
import './index.css'
import configureStore from './store/store.js';
import { csrfFetch, restoreCSRF } from './store/csrf.js';
import * as sessionActions from './store/session.js';
import * as modalActions from './store/modals.js';
import * as sidemodalActions from './store/sidemodals.js';
import * as articleActions from './store/articles.js';
import * as popupmodalActions from './store/popupmodals.js';

const store = configureStore();

if (import.meta.env.MODE !== "production") {
  restoreCSRF();
  window.store = store;
  window.csrfFetch = csrfFetch;
  window.sessionActions = sessionActions;
  window.modalActions = modalActions;
  window.sidemodalActions = sidemodalActions;
  window.popupmodalActions = popupmodalActions;
  window.articleActions = articleActions;
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
)
