import { RECEIVE_ARTICLE } from "./articles";


export const selectWriter = (userId) => (state) => {
    // console.log("=====");
    // console.log(state.users[userId]);
    if (state.users[userId] === null) {
      return null;
    } else {
      return state.users[userId];
    }
  };


const usersReducer = (state = {}, action) => {
    Object.freeze(state);

    const newState = { ...state };

    switch (action.type) {
        case RECEIVE_ARTICLE:
            newState[action.payload.author.id] = action.payload.author;
            return newState;
        default:
            return state;
    }

};

export default usersReducer;