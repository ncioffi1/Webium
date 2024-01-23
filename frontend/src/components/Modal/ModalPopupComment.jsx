

import './ModalPopupComment.css'

function ModalPopupComment({ children }) {
    return (
      <div id="modal-side-pc">
        <div id="modal-background-side-pc" />
        <div id="pHolder-pc">
            <div id="modal-content-popup-pc">
            {children}
            </div>
        </div>
      </div>
    );
  }
  
  export default ModalPopupComment;