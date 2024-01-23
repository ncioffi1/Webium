import { csrfFetch, storeCSRFToken } from './csrf';

const RECEIVE_COMMENT= 'comments/RECEIVE_COMMENT';
const RECEIVE_COMMENTS = 'comments/RECEIVE_COMMENTS';
const REMOVE_COMMENT = 'comments/REMOVE_COMMENT';
const RECEIVE_COMMENTERS = 'users/RECEIVE_COMMENTERS'
const CREATE_COMMENT = 'comments/CREATE_COMMENT';
const EDITING_COMMENT = 'comments/EDITING_COMMENT';
const CLEAR_CREATE = 'comments/CLEAR_CREATE';
const CLEAR_DELETE = 'comments/CLEAR_DELETE';

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
});

const createComment = (comment) => ({
    type: CREATE_COMMENT,
    payload: comment
});

const clearCreate = () => ({
    type: CLEAR_CREATE,
    payload: null
});

const clearDelete = () => ({
    type: CLEAR_DELETE,
    payload: null
});
const clearEdit = () => ({
    type: CLEAR_EDIT,
    payload: null
})

const setEditingComment = (commentId) => ({
    type: EDITING_COMMENT,
    payload: commentId
})

export const clearCreatedComment = () => async(dispatch) => {
  dispatch(clearCreate());
}
export const clearDeletedComment = () => async(dispatch) => {
  dispatch(clearDelete());
}
export const clearEditingComment = () => async(dispatch) => {
  dispatch(clearEdit());
}

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

export const editingComment = (commentId) => async(dispatch) => {
    dispatch(setEditingComment(commentId));
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
    // console.log("!!!!=====!!!!!");
    // console.log("fetch");
    
    if (response.ok) {
    const comments = await response.json();
    dispatch(receiveComments(comments));
    }
}

export const postComment = ({ comment, userId, articleId, parentCommentId }) => async dispatch => {
    let commentbody = comment;
    let user_id = userId;
    let article_id = articleId;
    let parent_comment_id = parentCommentId;
    const response = await csrfFetch("/api/comments/", {
      method: "POST",
      body: JSON.stringify({ commentbody, user_id, article_id, parent_comment_id })
    });
    const myComment = await response.json();
    dispatch(createComment(myComment));
    console.log(response);
    return response;
  };

export const deleteComment = (commentId) => async dispatch => {
    // console.log("HIT!");
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
        case CLEAR_CREATE:
            newState["create"] = null;
            return newState;

        case CLEAR_DELETE:
            newState["delete"] = null;
            return newState;

        case EDITING_COMMENT:
            newState["editing"] = action.payload;
            return newState;

        case CREATE_COMMENT: 
            newState.comments[action.payload.comment.id] = action.payload.comment;
            newState["create"] = action.payload;
            return newState;

        case RECEIVE_COMMENT:
            console.log(action.payload);
            // newState.comment.comments[action.payload.comment.id]
            // newState[action.payload.comment.id] = action.payload.article;
            return newState;
    
        case RECEIVE_COMMENTS:
            newState = {...action.payload};
            return newState;
    
        case REMOVE_COMMENT:
            newState["delete"] = true;
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