import { csrfFetch, storeCSRFToken } from './csrf';

const RECEIVE_USER = 'users/RECEIVE_USER'
const RECEIVE_USERS = 'users/RECEIVE_USERS'
const RECEIVE_ARTICLE = 'articles/RECEIVE_ARTICLE';
const CREATE_ARTICLE = 'articles/CREATE_ARTICLE';
const CLEAR_CREATE = 'articles/CLEAR_CREATE';
const EDIT_ARTICLE = 'articles/EDIT_ARTICLE';
const CLEAR_EDIT = 'articles/CLEAR_EDIT';
const CLEAR_WRITERS = 'articles/CLEAR_WRITERS';
const RECEIVE_ARTICLES = 'articles/RECEIVE_ARTICLES';
const REMOVE_ARTICLE = 'articles/REMOVE_ARTICLE';
// const SET_ARTICLES = 'article/setArticles';
// const REMOVE_ARTICLE = 'article/removeArticle';

const receiveUser = (user) => ({
  type: RECEIVE_USER,
  payload: user
});

const receiveUsers = (users) => ({
  type: RECEIVE_USERS,
  payload: users
})

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

const clearWriters = () => ({
  type: CLEAR_WRITERS,
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

export const clearArticleWriters = () => async(dispatch) => {
  dispatch(clearWriters());
}

export const selectWriter = (userId) => (state) => {
  if (state.article.writer === null) {
    return null;
  } else {
    return state.article.writer;
  }
};

export const selectWriters = (userId) => (state) => {
  if (state.article.writers === null) {
    return null;
  } else {
    return state.article.writers;
  }
};

export const selectArticlesArray = () => (state) => {
  if (state.article.articles === null) {
    return null;
  } else {
    return state.article.articles;
    // console.log("=====");
    // console.log(state.article);

    // let aFilter = Object.keys(state.article)
    //   .filter((key) => {
    //     let k2 = parseInt(key);
    //     return Number.isNaN(k2) === false;
    //   })
    //   .reduce((cur, key) => 
    //   { return Object.assign(cur, { [key]: state.article[key] })}, {});

    // return Object.values(aFilter);
  }
}

export const fetchWriter = (userId) => async(dispatch) => {
  const response = await csrfFetch(`/api/users/${userId}`)

  if (response.ok) {
    const user = await response.json();
    dispatch(receiveUser(user));
  }
}

export const fetchWriters = (writerIds) => async(dispatch) => {
  let users = [];
  // console.log(writerIds);
  for (let i = 0; i < writerIds.length; i++) {
    let response = await csrfFetch(`/api/users/${writerIds[i]}`)

    if (response.ok) {
      const user = await response.json();
      users.push(user);
    }
  }
  // console.log("! ! ! ===== ! ! !");
  // console.log(users);
  if (users.length === writerIds.length) {
    // console.log("ready.");
    dispatch(receiveUsers(users));
  }
  // dispatch(receiveUsers(users));
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

export const postArticle = ({ title, content, photo }) => async dispatch => {
  console.log(title);
  console.log(content);
  console.log(photo);
  console.log("===========");
  const formData = new FormData();
  formData.append('article[title]', title);
  formData.append('article[content]', content);
  if (photo) {
    formData.append('article[photo]', photo);
  }
  console.log("===========");
  console.log(formData);
  console.log("===========");

  const response = await csrfFetch("/api/articles/", {
    method: "POST",
    body: formData
    // body: JSON.stringify({ title, content, photo })
  });
  const article = await response.json();
  dispatch(createArticle(article));
  return response;
};

export const updateArticle = ({ articleId, title, content, photo }) => async dispatch => {
  const formData = new FormData();
  formData.append('article[title]', title);
  formData.append('article[content]', content);
  if (photo) {
    formData.append('article[photo]', photo);
  }

  const response = await csrfFetch(`/api/articles/${articleId}`, {
    method: "PATCH",
    body: formData
    // body: JSON.stringify({ title, content, photo })
  });

  const article = await response.json();
  dispatch(editArticle(article));
  return response;
};

export const deleteArticle = (articleId) => async dispatch => {
  const response = await csrfFetch(`/api/articles/${articleId}`, {
    method: "DELETE"
  });

  const message = await response.json();
  dispatch(removeArticle(articleId));
  return message;
}



const articleReducer = (state = {}, action) => {
  let newState = {...state};

  switch (action.type) {
    case RECEIVE_USER:
      newState["writer"] = action.payload.user;
      return newState;

    case RECEIVE_USERS:
      // console.log("!!!====!!!")
      // console.log(action.payload);
      newState["writers"] = action.payload;
      return newState;
      // return newState;

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

    case CLEAR_WRITERS:
      newState["writers"] = undefined;
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