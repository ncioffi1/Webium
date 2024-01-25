import { csrfFetch, storeCSRFToken } from './csrf';

const SHOW_MODAL = 'sidemodal/showSidebarModal';
const HIDE_MODAL = 'sidemodal/hideSidebarModal';

export const showSidebarModal = (modalType) => ({
  type: SHOW_MODAL,
  modalType
});

export const hideSidebarModal = () => ({
  type: HIDE_MODAL
});


function sideModalsReducer(state = { type: null }, action) {
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
  
export default sideModalsReducer;