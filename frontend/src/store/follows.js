import { csrfFetch, storeCSRFToken } from './csrf';

const RECEIVE_FOLLOW = 'follows/RECEIVE_FOLLOW';
const RECEIVE_FOLLOWS = 'follows/RECEIVE_FOLLOWS';
const REMOVE_FOLLOW = 'follows/REMOVE_FOLLOW';
const CLEAR_CREATE = 'follows/CLEAR_CREATE';
const CLEAR_DELETE = 'follows/CLEAR_DELETE';

const receiveFollow = (follow) => ({
    type: RECEIVE_FOLLOW,
    payload: follow
});
const receiveFollows = (follows) => ({
    type: RECEIVE_FOLLOWS,
    payload: follows
});
const removeFollow = (followId) => ({
    type: REMOVE_FOLLOW,
    payload: followId
});
const clearCreate = () => ({
    type: CLEAR_CREATE,
    payload: null
});
const clearDelete = () => ({
    type: CLEAR_DELETE,
    payload: null
});

export const clearCreatedFollow = () => async(dispatch) => {
    dispatch(clearCreate());
}

export const clearDeletedFollow = () => async(dispatch) => {
    dispatch(clearDelete());
}

export const postFollow = ({follower_id, following_id}) => async dispatch => {
    // console.log("POSTING FOLLOW");
    // console.log(following_id);
    // console.log(follower_id);
    const response = await csrfFetch("/api/follows/", {
        method: "POST",
        body: JSON.stringify({ following_id, follower_id })
      });

    const myFollow = await response.json();
    dispatch(receiveFollow(myFollow));
    return response;
}
export const deleteFollow = (followId) => async dispatch => {
    const response = await csrfFetch(`/api/follows/${followId}`, {
        method: "DELETE"
    });

    const message = await response.json();
    dispatch(removeFollow(followId));
    return message;
}

const followReducer = (state = {}, action) => {
    Object.freeze(state);

    const newState = { ...state };

    switch (action.type) {
        case RECEIVE_FOLLOW:
            newState["create"] = true;
            newState["follow"] = action.payload;
            return newState;
        case CLEAR_CREATE:
            newState["create"] = null;
            return newState;
        case CLEAR_DELETE:
            newState["delete"] = null;
            return newState;
        case REMOVE_FOLLOW: 
            newState["delete"] = true;
            newState["follow"] = null;
            return newState;
        // case RECEIVE_FOLLOWS:
        //     // newState["users"] = action.payload.users;
        //     return newState;
        default:
            return state;
    }

};

export default followReducer;

