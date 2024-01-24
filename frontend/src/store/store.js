import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import articleReducer from './articles';
import sessionReducer from './session';
import thunk from 'redux-thunk';
import modals from './modals';
import modalsReducer from './modals';
import sideModalsReducer from './sidemodals';
import popupModalsReducer from './popupmodals.js';
import commentModalsReducer from './commentmodals.js';
import commentReducer from './comments.js';
import popupModalsCommentReducer from './popupmodalscomment.js';
import clapReducer from './claps.js';
import usersReducer from './users.js';

// import pokemon from './pokemon';
// import items from './items';

const rootReducer = combineReducers({
  users: usersReducer,
  article: articleReducer,
  session: sessionReducer,
  modals: modalsReducer,
  sidemodals: sideModalsReducer,
  popupmodals: popupModalsReducer,
  popupmodalscomment: popupModalsCommentReducer,
  commentmodals: commentModalsReducer,
  comment: commentReducer,
  clap: clapReducer
});

let enhancer;
if (import.meta.env.MODE !== "production") {
  const logger = (await import("redux-logger")).default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}
else {
  enhancer = applyMiddleware(thunk);
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;