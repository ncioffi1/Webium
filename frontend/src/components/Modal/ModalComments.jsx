

import './ModalComments.css'

function ModalComments({ children }) {
    return (
      <div id="modal-comments">
        <div id="modal-background-comments" />
        <div id="modal-content-comments">
          {children}
        </div>
      </div>
    );
  }
  
  export default ModalComments;