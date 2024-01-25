import { csrfFetch, storeCSRFToken } from './csrf';

const SHOW_MODAL = 'popupmodal/showPopupModal';
const HIDE_MODAL = 'popupmodal/hidePopupModal';

export const showPopupModal = (modalType) => ({
  type: SHOW_MODAL,
  modalType
});

export const hidePopupModal = () => ({
  type: HIDE_MODAL
});


function popupModalsReducer(state = { type: null }, action) {
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
  
export default popupModalsReducer;