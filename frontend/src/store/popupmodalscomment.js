import { csrfFetch, storeCSRFToken } from './csrf';

const SHOW_MODAL = 'popupmodalcomment/showPopupModal';
const HIDE_MODAL = 'popupmodalcomment/hidePopupModal';

export const showPopupModalComment = (modalType) => ({
  type: SHOW_MODAL,
  modalType
});

export const hidePopupModalComment = () => ({
  type: HIDE_MODAL
});


function popupModalsCommentReducer(state = { type: null }, action) {
    switch (action.type) {
      case SHOW_MODAL: {
        return { type: action.modalType };
      }
      case HIDE_MODAL:
        return { type: null };
      default:
        return state;
    }
}
  
export default popupModalsCommentReducer;