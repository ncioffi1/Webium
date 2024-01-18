import { csrfFetch, storeCSRFToken } from './csrf';

const RECEIVE_USER = 'users/RECEIVE_USER'
const RECEIVE_ARTICLE = 'articles/RECEIVE_ARTICLE';
const CREATE_ARTICLE = 'articles/CREATE_ARTICLE';
const CLEAR_CREATE = 'articles/CLEAR_CREATE';
const EDIT_ARTICLE = 'articles/EDIT_ARTICLE';
const CLEAR_EDIT = 'articles/CLEAR_EDIT';
const RECEIVE_ARTICLES = 'articles/RECEIVE_ARTICLES';
const REMOVE_ARTICLE = 'articles/REMOVE_ARTICLE';
// const SET_ARTICLES = 'article/setArticles';
// const REMOVE_ARTICLE = 'article/removeArticle';

const receiveUser = (user) => ({
  type: RECEIVE_USER,
  payload: user
});

const createArticle = (article) => ({
  type: CREATE_ARTICLE,
  payload: article
});

const clearCreate = () => ({
  type: CLEAR_CREATE,
  payload: null
});

const editArticle = (article) => ({
  type: EDIT_ARTICLE,
  payload: article
});

const clearEdit = () => ({
  type: CLEAR_EDIT,
  payload: null
})

const receiveArticle = (article) => ({
  type: RECEIVE_ARTICLE,
  payload: article
});

const receiveArticles = (articles) => ({
  type: RECEIVE_ARTICLES,
  payload: articles
})

const removeArticle = (articleId) => ({
  type: REMOVE_ARTICLE,
  payload: articleId
});

// export const selectArticle = (articleId) => async dispatch => {
//   const response = await csrfFetch("/api/session", {
//     method: "POST",
//     body: JSON.stringify({ email, password })
//   });
//   const data = await response.json();
//   dispatch(setUser(data.user));
//   return response;
// };

export const selectArticle = (articleId) => (state) => {
  if (state.article[articleId] === undefined) {
      return null;
  } else {
      return state.article[articleId];
  }
};

export const selectCreatedArticle = () => (state) => {
  if (state.article.create === null) {
    return null;
  } else {
    return state.article.create;
  }
}

export const selectEditedArticle = () => (state) => {
  if (state.article.edit === null) {
    return null;
  } else {
    return state.article.edit;
  }
}

export const clearCreatedArticle = () => async(dispatch) => {
  dispatch(clearCreate());
}

export const clearEditedArticle = () => async(dispatch) => {
  dispatch(clearEdit());
}

export const selectWriter = (userId) => (state) => {
  if (state.article.writer === null) {
    return null;
  } else {
    return state.article.writer;
  }
};

export const selectArticlesArray = () => (state) => {
  if (state.article === null) {
    return null;
  } else {
    // console.log(state.article);
    // console.log(Object.values(state.article));
    return Object.values(state.article);
  }
}

export const fetchWriter = (userId) => async(dispatch) => {
  const response = await csrfFetch(`/api/users/${userId}`)

  if (response.ok) {
    const user = await response.json();
    dispatch(receiveUser(user));
  }
}
 
export const fetchArticle = (articleId) => async(dispatch) => {
  const response = await csrfFetch(`/api/articles/${articleId}`)

  if (response.ok) {
    const article = await response.json();
    dispatch(receiveArticle(article));
  }
}

export const fetchArticles = () => async(dispatch) => {
  const response = await csrfFetch(`/api/articles/`)

  if (response.ok) {
    const articles = await response.json();
    dispatch(receiveArticles(articles));
  }
}

const initialState = { article: null};

export const postArticle = ({ title, content }) => async dispatch => {
  const response = await csrfFetch("/api/articles/", {
    method: "POST",
    body: JSON.stringify({ title, content })
  });
  const article = await response.json();
  dispatch(createArticle(article));
  return response;
};

export const updateArticle = ({ articleId, title, content }) => async dispatch => {
  const response = await csrfFetch(`/api/articles/${articleId}`, {
    method: "PATCH",
    body: JSON.stringify({ title, content })
  });

  const article = await response.json();
  dispatch(editArticle(article));
  return response;
};



const articleReducer = (state = {}, action) => {
  let newState = {...state};

  switch (action.type) {
    case RECEIVE_USER:
      newState["writer"] = action.payload.user;
      return newState;

    case CREATE_ARTICLE:
      newState["create"] = action.payload.article;
      return newState;

    case EDIT_ARTICLE:
      newState["edit"] = action.payload.article;
      return newState;

    case CLEAR_CREATE:
      newState["create"] = null;
      return newState;

    case CLEAR_EDIT:
      newState["edit"] = null;
      return newState;

    case RECEIVE_ARTICLE:
      newState[action.payload.article.id] = action.payload.article;
      return newState;

    case RECEIVE_ARTICLES:
      newState = {...action.payload};
      return newState;

    case REMOVE_ARTICLE:
      delete newState[action.articleId];
      return newState;

    default:
      return state;
  }
};


  
export default articleReducer;