
import './ModalSide.css'

function ModalSide({ children }) {
    return (
      <div id="modal-side">
        <div id="modal-background-side" />
        <div id="modal-content-side">
          {children}
        </div>
      </div>
    );
  }
  
  export default ModalSide;