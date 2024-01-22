import { useState, useEffect, useRef, createRef  } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import ModalComments from "../Modal/ModalComments";
import ModalPopup from '../Modal/ModalPopup';
import ModalSide from '../Modal/ModalSide';
import Modal from '../Modal/Modal';

import * as commentmodalActions from '../../store/commentmodals.js'
// import * as sidemodalActions from '../../store/sidemodals.js'
import * as sessionActions from '../../store/session.js';

import { Navigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { NavLink, useParams } from 'react-router-dom';


function CommentModal() {
    const sessionUser = useSelector(state => state.session.user);
    const dispatch = useDispatch();
    const { articleId } = useParams();
    const commentmodalType = useSelector(state => state.commentmodals.type);
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


    if (!commentmodalType) {
        return null;
    } else {
        return (
            <>
                <ModalComments>
                    <p>Responses</p>
                </ModalComments>
            </>
        )
    }
    
}

export default CommentModal;