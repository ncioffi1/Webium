
import { useState, useEffect, useRef, createRef  } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import ModalPopupComment from '../Modal/ModalPopupComment';
import ModalSide from '../Modal/ModalSide';
import Modal from '../Modal/Modal';

import * as popupModalCommentActions from '../../store/popupmodalscomment.js';
import * as commentActions from '../../store/comments.js';
// import * as sidemodalActions from '../../store/sidemodals.js'
import * as sessionActions from '../../store/session.js';


import "./PopupModal.css";
import { Navigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { NavLink, useParams } from 'react-router-dom';
import * as articleActions from "../../store/articles";

function PopupModalComment(props) {

    const sessionUser = useSelector(state => state.session.user);
    const dispatch = useDispatch();
    const { articleId } = useParams();
    const popupmodalType = useSelector(state => state.popupmodalscomment.type);
    // const popupmodalId = useSelector
    const [editing, setEditing] = useState(false);
    const [deleting, setDeleting] = useState(false);
    // const sidemodalType = useSelector(state => state.sidemodals.type);

    let modalRef = createRef();

    useEffect(() => {
        if (popupmodalType) {
            console.log(popupmodalType);
            document.addEventListener("click", handleHide, {capture: true});
        } else {
            document.removeEventListener("click", handleHide, {capture: true});
        }
    }, [popupmodalType])

    // useEffect(() => {
    //     console.log(popupmodalType);
    // }, [])

    function handleHide(e) {
        e.preventDefault();
        if (e.target.className.includes('popup')) {
            return;
        }
        // if (e.target.className.includes('comment')){

        // }

        if(modalRef.current && modalRef.current.contains(e.target)) {
            return;
        }
        // console.log("clicked");
        document.removeEventListener('click', handleHide, {capture: true});
        dispatch(popupModalCommentActions.hidePopupModalComment());
    }

    function handleEdit(e) {
        e.preventDefault();
        console.log('edit comment');
        console.log(props);
        dispatch(commentActions.editingComment(props.comment));
        dispatch(popupModalCommentActions.hidePopupModalComment());
        // setEditing(true);
    }

    function handleDelete(e) {
        e.preventDefault();
        console.log('delete comment');
        dispatch(commentActions.deleteComment(props.id));
        dispatch(popupModalCommentActions.hidePopupModalComment());
        // setDeleting(true);
        // dispatch(articleActions.deleteArticle(articleId));
        // setDeleting(true);
        
    }

    if (editing) {
        // console.log("WORK!");
        return <Navigate to={`/articles/${articleId}/edit`} replace={true}></Navigate>
    }
    
    // if (deleting) {
    //     return <Navigate to={`/`} replace={true}></Navigate>
    // }

    if (!popupmodalType) {
        return null;
    } else if (popupmodalType.id === props.id) {
        return (
        <>
            <ModalPopupComment>
                <div ref={modalRef} className="modal-backdrop-popup" ></div>
                <div className='modal-text-holder1-popup'>
                    <p onClick={(e) => handleEdit(e)} className='modal-text1B-popup' id="pc">Edit</p>
                    <p onClick={(e) => handleDelete(e)} className='modal-text1-popup' id="pc">Delete</p>
                </div>
            </ModalPopupComment>
        </>
        );
    }
}

export default PopupModalComment;