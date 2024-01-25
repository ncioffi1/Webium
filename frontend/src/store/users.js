import { csrfFetch, storeCSRFToken } from './csrf';
import { RECEIVE_ARTICLE } from "./articles";

const RECEIVE_USER= 'users/RECEIVE_USER';

const receiveUser = (user) => ({
  type: RECEIVE_USER,
  payload: user
});

export const fetchUser = (userId) => async(dispatch) => {
  const response = await csrfFetch(`/api/users/${userId}`)

  if (response.ok) {
    const user = await response.json();
    dispatch(receiveUser(user));
  }
}

export const selectWriter = (userId) => (state) => {
    // console.log("=====");
    // console.log(state.users[userId]);
    if (state.users[userId] === null) {
      return null;
    } else {
      return state.users[userId];
    }
  };

// export const 


const usersReducer = (state = {}, action) => {
    Object.freeze(state);

    const newState = { ...state };

    switch (action.type) {
        case RECEIVE_USER:
            newState["user"] = action.payload.user;
            newState["followers"] = action.payload.followers;
            newState["following"] = action.payload.following;
            return newState;
        case RECEIVE_ARTICLE:
            newState[action.payload.author.id] = action.payload.author;
            return newState;
        default:
            return state;
    }

};

export default usersReducer;