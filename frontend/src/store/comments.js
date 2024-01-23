import { csrfFetch, storeCSRFToken } from './csrf';

const RECEIVE_COMMENT= 'comments/RECEIVE_COMMENT';
const RECEIVE_COMMENTS = 'comments/RECEIVE_COMMENTS';
const REMOVE_COMMENT = 'comments/REMOVE_COMMENT';
const RECEIVE_COMMENTERS = 'users/RECEIVE_COMMENTERS'


const receiveComment = (comment) => ({
    type: RECEIVE_COMMENT,
    payload: comment
});

const receiveComments = (comments) => ({
    type: RECEIVE_COMMENTS,
    payload: comments
})

const removeComment = (articleId) => ({
    type: REMOVE_COMMENT,
    payload: articleId
});

const receiveCommenters = (users) => ({
    type: RECEIVE_COMMENTERS,
    payload: users
  })


export const selectArticle = (articleId) => (state) => {
    if (state.comment[commentId] === undefined) {
        return null;
    } else {
        return state.comment[commentId];
    }
};

export const selectCommentsArray = () => (state) => {
    if (state.comment.comments === null) {
      return null;
    } else {
      return state.comment.comments;
    }
}

export const selectWriters = () => (state) => {
    if (state.comment.writers === null) {
      return null;
    } else {
      return state.comment.writers;
    }
};

export const fetchWriters = (writerIds) => async(dispatch) => {
    let users = [];
    for (let i = 0; i < writerIds.length; i++) {
      let response = await csrfFetch(`/api/users/${writerIds[i]}`)
        
      if (response.ok) {
        const user = await response.json();
        users.push(user);
      }
    }
    if (users.length === writerIds.length) {
      dispatch(receiveCommenters(users));
    }
  }

export const fetchComment = (commentId) => async(dispatch) => {
    const response = await csrfFetch(`/api/comments/${commentId}`)

    if (response.ok) {
    const comment = await response.json();
    dispatch(receiveComment(comment));
    }
}

export const fetchComments = () => async(dispatch) => {
    const response = await csrfFetch(`/api/comments/`)

    if (response.ok) {
    const comments = await response.json();
    dispatch(receiveComments(comments));
    }
}

export const deleteComment = (commentId) => async dispatch => {
    const response = await csrfFetch(`/api/comments/${commentId}`, {
        method: "DELETE"
    });

    const message = await response.json();
    dispatch(removeComment(commentId));
    return message;
}

const commentReducer = (state = {}, action) => {
    let newState = {...state};
  
    switch (action.type) {
        case RECEIVE_COMMENT:
            console.log(action.payload);
            // newState[action.payload.comment.id] = action.payload.article;
            return newState;
    
        case RECEIVE_COMMENTS:
            newState = {...action.payload};
            return newState;
    
        case REMOVE_COMMENT:
            delete newState[action.commentId];
            return newState;

        case RECEIVE_COMMENTERS: 
            newState["writers"] = action.payload;
            return newState;
  
      default:
        return state;
    }
  };

  export default commentReducer;