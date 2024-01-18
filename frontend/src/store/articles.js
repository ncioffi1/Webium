import { csrfFetch, storeCSRFToken } from './csrf';

const RECEIVE_USER = 'users/RECEIVE_USER'
const RECEIVE_ARTICLE = 'articles/RECEIVE_ARTICLE';
const RECEIVE_ARTICLES = 'articles/RECEIVE_ARTICLES';
const REMOVE_ARTICLE = 'articles/REMOVE_ARTICLE';
// const SET_ARTICLES = 'article/setArticles';
// const REMOVE_ARTICLE = 'article/removeArticle';

const receiveUser = (user) => ({
  type: RECEIVE_USER,
  payload: user
});

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

export const selectWriter = (userId) => (state) => {
  if (state.article.writer === null) {
    return null;
  } else {
    return state.article.writer;
  }
};

export const selectArticlesArray = (state) => Object.values(state.articles);

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

const initialState = { article: null};



const articleReducer = (state = {}, action) => {
  let newState = {...state};

  switch (action.type) {
    case RECEIVE_USER:
      newState["writer"] = action.payload.user;
      return newState;

    case RECEIVE_ARTICLE:
      newState[action.payload.article.id] = action.payload.article;
      return newState;

    case RECEIVE_ARTICLES:
      newState = {...action.articles};
      return newState;

    case REMOVE_ARTICLE:
      delete newState[action.articleId];
      return newState;

    default:
      return state;
  }
};


  
export default articleReducer;