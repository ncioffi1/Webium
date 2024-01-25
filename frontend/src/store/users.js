import { csrfFetch, storeCSRFToken } from './csrf';
import { RECEIVE_ARTICLE } from "./articles";

const RECEIVE_USER= 'users/RECEIVE_USER';
const RECEIVE_USERS= 'users/RECEIVE_USERS';

const receiveUser = (user) => ({
  type: RECEIVE_USER,
  payload: user
});
const receiveUsers = (users) => ({
  type: RECEIVE_USERS,
  payload: users
})

export const fetchUser = (userId) => async(dispatch) => {
  const response = await csrfFetch(`/api/users/${userId}`)

  if (response.ok) {
    const user = await response.json();
    dispatch(receiveUser(user));
  }
}

export const fetchUsers = () => async(dispatch) => {
  const response = await csrfFetch(`/api/users/`);

  console.log("RESPONSE:");
  console.log(response);
  if (response.ok) {
    const users = await response.json();
    console.log("USERS:");
    console.log(users);
    dispatch(receiveUsers(users));
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
        case RECEIVE_USERS:
            newState["users"] = action.payload.users;
            return newState;
        case RECEIVE_ARTICLE:
            newState[action.payload.author.id] = action.payload.author;
            return newState;
        default:
            return state;
    }

};

export default usersReducer;