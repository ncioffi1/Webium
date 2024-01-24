
import { RECEIVE_ARTICLE } from "./articles";

const RECEIVE_CLAP = 'claps/RECEIVE_CLAP';
const RECEIVE_CLAPS = 'claps/RECEIVE_CLAPS';
const REMOVE_CLAP = 'claps/REMOVE_CLAP';
const CREATE_CLAP = 'claps/CREATE_CLAP';
const CLEAR_CLAPPED = 'claps/CLEAR_CLAPPED';

const receiveClap = (clap) => ({
    type: RECEIVE_CLAP,
    payload: clap
});

const receiveClaps = (claps) => ({
    type: RECEIVE_CLAPS,
    payload: claps
})

const removeClap = (clapId) => ({
    type: REMOVE_CLAP,
    payload: clapId
});

const createClap = (clap) => ({
    type: CREATE_CLAP,
    payload: clap
});

const clearingClapped = () => ({
    type: CLEAR_CLAPPED,
    payload: null
})

export const clearClapped = () => async(dispatch) => {
    dispatch(clearingClapped());
}

export const fetchClap = (clapId) => async(dispatch) => {
    const response = await csrfFetch(`/api/claps/${clapId}`)

    if (response.ok) {
        const clap = await response.json();
        dispatch(receiveClap(clap));
    }
}

export const fetchClaps = () => async(dispatch) => {
    const response = await csrfFetch(`/api/claps/`)
    
    if (response.ok) {
    const allClaps = await response.json();
    console.log(allClaps);
    dispatch(receiveClaps(allClaps));
    }
}

export const postClap = ({ userId, articleId, commentId }) => async dispatch => {
    let user_id = userId;
    let article_id = articleId;
    let comment_id = commentId;
    const response = await csrfFetch("/api/claps/", {
      method: "POST",
      body: JSON.stringify({ user_id, article_id, comment_id })
    });

    const myClap = await response.json();
    dispatch(createClap(myClap));
    // console.log(response);
    return response;
  };

const clapReducer = (state = {}, action) => {
    let newState = {...state};
  
    switch (action.type) {
        case RECEIVE_ARTICLE:
            newState["articleClaps"] = {...action.payload.claps};
            // newState["articleClaps"] = {...action.payload.claps};
            return newState;

        case RECEIVE_CLAP:
            console.log(action.payload);
            // newState.comment.comments[action.payload.comment.id]
            // newState[action.payload.comment.id] = action.payload.article;
            return newState;
    
        case RECEIVE_CLAPS:
            // newState = {...action.payload};
            newState["allClaps"] = {...action.payload.claps};
            return newState;
    
        case REMOVE_CLAP:
            // newState["delete"] = true;
            delete newState[action.commentId];
            return newState;

        case CREATE_CLAP:
            console.log("======");
            console.log(newState);
            newState.articleClaps[action.payload.clap.id] = action.payload.clap;
            newState["clapped"] = action.payload;
            return newState;
        
        case CLEAR_CLAPPED:
            newState["clapped"] = null;
            return newState;

        default:
            return state;
    }
  };

  export default clapReducer;