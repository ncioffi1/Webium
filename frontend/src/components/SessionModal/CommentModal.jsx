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

import './CommentModal.css';


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
        if (commentmodalType) {
            document.addEventListener("click", handleHide, {capture: true});
        } else {
            document.removeEventListener("click", handleHide, {capture: true});
        }
    }, [commentmodalType])

    function handleHide(e) {
        e.preventDefault();
        if (e.target.className.includes('comment') || e.target.className.includes('Comment')) {
            return;
        }
        if (e.target.id.includes('content')) {
            return;
        }

        if(modalRef.current && modalRef.current.contains(e.target)) {
            return;
        }
        console.log("handleHide");
        document.removeEventListener('click', handleHide, {capture: true});
        dispatch(commentmodalActions.hideCommentModal());
    }

    useEffect(() => {
        console.log(commentmodalType)
    }, [])

    if (!commentmodalType) {
        return null;
    } else {
        return (
            <>
                <ModalComments>
                    <p className="p-comment">Responses</p>
                    <span className="cCommentHolder">
                        <div className="cCommentUserHolder">
                            <div className="cCommentUserdot"></div>
                            <p className="cCommentUsername">{sessionUser.name}</p>
                        </div>
                        <textarea className="cComment" placeholder="What are your thoughts?"></textarea>
                        <button className="cPostComment">Respond</button>
                    </span>

                    <span className="commentLine"></span>
                    <div className='aComment'>
                        <div className='cCommentUserHolder'>
                            <div className="cCommentUserdot"></div>
                            <div className="cCommentVertical">
                                <p className="cCommentUsername">User Name</p>
                                <p className='cCommentDatePosted'>Date Posted</p>
                            </div>
                            <i className="fa-solid fa-ellipsis" id="contentIcon2"></i>
                            {/* <PopupModal /> */}
                        </div>       
                        <p className='aCommentText'>This is a comment.</p>
                        <div className='cCommentLastRow'>
                            <div className='commentIconHolder'>
                                <i className="fa-solid fa-hands-clapping" id='contentIcon3'></i>
                                <p className='commentIconAmount'>150</p>
                            </div>
                            <div>
                                <p className='cCommentReply'>Reply</p>
                            </div>
                        </div>
                        

                        <span className="commentLine2"></span>
                    </div>

                    {/* here, get an array of all this article's comments - then display them accordingly. */}
                </ModalComments>
            </>
        )
    }
    
}

export default CommentModal;