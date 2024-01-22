import { useState, useEffect, useRef, createRef  } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import ModalPopup from '../Modal/ModalPopup';
import ModalSide from '../Modal/ModalSide';
import Modal from '../Modal/Modal';

import * as popupmodalActions from '../../store/popupmodals.js'
// import * as sidemodalActions from '../../store/sidemodals.js'
import * as sessionActions from '../../store/session.js';


import "./PopupModal.css";
import { Navigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { NavLink, useParams } from 'react-router-dom';
import * as articleActions from "../../store/articles";

function PopupModal() {

    const sessionUser = useSelector(state => state.session.user);
    const dispatch = useDispatch();
    const { articleId } = useParams();
    const popupmodalType = useSelector(state => state.popupmodals.type);
    const [editing, setEditing] = useState(false);
    const [deleting, setDeleting] = useState(false);
    // const sidemodalType = useSelector(state => state.sidemodals.type);

    let modalRef = createRef();

    useEffect(() => {
        if (popupmodalType) {
            document.addEventListener("click", handleHide, {capture: true});
        } else {
            document.removeEventListener("click", handleHide, {capture: true});
        }
    }, [popupmodalType])

    function handleHide(e) {
        e.preventDefault();
        if (e.target.className.includes('popup')) {
            return;
        }

        if(modalRef.current && modalRef.current.contains(e.target)) {
            return;
        }
        // console.log("clicked");
        document.removeEventListener('click', handleHide, {capture: true});
        dispatch(popupmodalActions.hidePopupModal());
    }

    function handleEdit(e) {
        e.preventDefault();
        setEditing(true);
    }

    function handleDelete(e) {
        e.preventDefault();
        console.log('delete');
        dispatch(articleActions.deleteArticle(articleId));
        setDeleting(true);
        // delete article
        // go back to index
    }

    if (editing) {
        // console.log("WORK!");
        return <Navigate to={`/articles/${articleId}/edit`} replace={true}></Navigate>
    }
    
    if (deleting) {
        return <Navigate to={`/`} replace={true}></Navigate>
    }

    if (!popupmodalType) {
        return null;
    } else {
        return (
        <>
            <ModalPopup>
                <div ref={modalRef} className="modal-backdrop-popup"></div>
                <div className='modal-text-holder1-popup'>
                    <p onClick={(e) => handleEdit(e)} className='modal-text1B-popup'>Edit Story</p>
                    <p onClick={(e) => handleDelete(e)} className='modal-text1-popup'>Delete Story</p>
                </div>
            </ModalPopup>
        </>
        );
    }
}

export default PopupModal;