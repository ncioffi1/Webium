import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import './LoginModal.css'

function LoginModal() {
  const [show, setShow] = useState(true);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Modal size="lg" className="testModal" show={show} onHide={handleClose}>
        <Modal.Header closeButton>
        <Modal.Title>Sign up with email</Modal.Title>
        </Modal.Header>
        <Modal.Body>Enter your email address to create an account.</Modal.Body>
        <Modal.Body>Woohoo, you are reading this text in a modal!</Modal.Body>
        <Modal.Body>Woohoo, you are reading this text in a modal!</Modal.Body>
        <Modal.Footer>
        <div className="flexing">
            <Button variant="secondary" onClick={handleClose}>
                Close
            </Button>
            {/* <div className='pad'></div> */}
            <Button variant="primary" onClick={handleClose}>
                Save Changes
            </Button>
        </div>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default LoginModal;