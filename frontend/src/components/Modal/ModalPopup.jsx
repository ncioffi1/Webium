
import './ModalSide.css'

function ModalPopup({ children }) {
    return (
      <div id="modal-side">
        <div id="modal-background-side" />
        <div id="pHolder">
            <div id="modal-content-popup">
            {children}
            </div>
        </div>
      </div>
    );
  }
  
  export default ModalPopup;