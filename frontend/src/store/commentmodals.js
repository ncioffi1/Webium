
import { csrfFetch, storeCSRFToken } from './csrf';

const SHOW_MODAL = 'commentmodal/showCommentModal';
const HIDE_MODAL = 'commentmodal/hideCommentModal';

export const showCommentModal = (modalType) => ({
  type: SHOW_MODAL,
  modalType
});

export const hideCommentModal = () => ({
  type: HIDE_MODAL
});


function commentModalsReducer(state = { type: null }, action) {

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
  
export default commentModalsReducer;