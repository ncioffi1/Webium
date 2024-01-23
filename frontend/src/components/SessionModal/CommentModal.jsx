import { useState, useEffect, useRef, createRef  } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import ModalComments from "../Modal/ModalComments";
import ModalPopup from '../Modal/ModalPopup';
import ModalSide from '../Modal/ModalSide';
import Modal from '../Modal/Modal';

import * as commentActions from "../../store/comments.js";
import * as commentmodalActions from '../../store/commentmodals.js';
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
    // const [editing, setEditing] = useState(false);
    // const [deleting, setDeleting] = useState(false);
    // const sidemodalType = useSelector(state => state.sidemodals.type);
    const [writerIds, setWriterIds] = useState([]);
    const [articleComments, setArticleComments] = useState(null);
    const comments = useSelector(state => state.comment.comments);
    const writers = useSelector(commentActions.selectWriters());

    useEffect(() => {
        if (comments !== null && comments !== undefined) {
            // set article comments
            // filter comments to ones that have articleId as the article_id
            let mComments = comments.filter((comment) => parseInt(comment.articleId) === parseInt(articleId));
            setArticleComments(mComments);
        }
    }, [comments]);

    useEffect(() => {
        if (articleComments !== null && articleComments !== undefined) {
            if (articleComments.length !== 0) {
                setWriterIds(articleComments.map((comment) => comment.userId));
            } else {
                setWriterIds([]);
            }
        }
    }, [articleComments])

    useEffect(() => {
        dispatch(commentActions.fetchComments());
    }, []);

    useEffect(() => {
        if (writerIds.length !== 0) {
            console.log(writerIds);
            dispatch(commentActions.fetchWriters(writerIds));
        }
    }, [writerIds])

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

    function getUserName(userId) {
        // console.log("CALL!!!");
        // console.log(writers);
        
        if (writers !== undefined) {
            for (let i = 0; i < writers.length; i++) {
                if (writers[i].user.id === userId) {
                    return writers[i].user.name;
                }
            }
            return "User Name"
        }
    }

    if (!commentmodalType) {
        // console.log("commentmodal type");
        return null;
    } else if (articleComments === undefined || articleComments === null) {
        // console.log("article commments");
        // console.log(articleComments);
        return null;
    } else if (writerIds.length !== 0 && (writers === null || writers === undefined)) {
        // console.log("writers");
        // console.log(articleComments);
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
                    {articleComments.map((comment) => 
                        <div className='aComment'>
                            <div className='cCommentUserHolder'>
                                <div className="cCommentUserdot"></div>
                                <div className="cCommentVertical">
                                    <p className="cCommentUsername">{getUserName(comment.userId)}</p>
                                    <p className='cCommentDatePosted'>Date Posted</p>
                                </div>
                                <i className="fa-solid fa-ellipsis" id="contentIcon2"></i>
                                {/* <PopupModal /> */}
                            </div>       
                            <p className='aCommentText'>{comment.comment}</p>
                            <div className='cCommentLastRow'>
                                <div className='commentIconHolder'>
                                    <i className="fa-solid fa-hands-clapping" id='contentIcon3'></i>
                                    <p className='commentIconAmount'>150</p>
                                </div>
                                <div className='commentReplyHolder'>
                                    <p className='cCommentReply'>Reply</p>
                                </div>
                            </div>
                            <span className="commentLine2"></span>
                        </div>
                    )}
                    

                    {/* here, get an array of all this article's comments - then display them accordingly. */}
                </ModalComments>
            </>
        )
    }
    
}

export default CommentModal;