

const RECEIVE_CLAP = 'claps/RECEIVE_CLAP';
const RECEIVE_CLAPS = 'claps/RECEIVE_CLAPS';
const REMOVE_CLAP = 'claps/REMOVE_CLAP';

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

export const fetchClap = (clapId) => async(dispatch) => {
    const response = await csrfFetch(`/api/claps/${clapId}`)

    if (response.ok) {
        const clap = await response.json();
        dispatch(receiveClap(clap));
    }
}

export const fetchClaps = () => async(dispatch) => {
    const response = await csrfFetch(`/api/claps/`)
    // console.log("!!!!=====!!!!!");
    // console.log("fetch");
    
    if (response.ok) {
    const claps = await response.json();
    dispatch(receiveClaps(claps));
    }
}

const clapReducer = (state = {}, action) => {
    let newState = {...state};
  
    switch (action.type) {
        case RECEIVE_CLAP:
            console.log(action.payload);
            // newState.comment.comments[action.payload.comment.id]
            // newState[action.payload.comment.id] = action.payload.article;
            return newState;
    
        case RECEIVE_CLAPS:
            newState = {...action.payload};
            return newState;
    
        case REMOVE_CLAP:
            // newState["delete"] = true;
            delete newState[action.commentId];
            return newState;
        default:
            return state;
    }
  };

  export default clapReducer;