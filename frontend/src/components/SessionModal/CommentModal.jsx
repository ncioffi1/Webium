import { useState, useEffect, useRef, createRef  } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import ModalComments from "../Modal/ModalComments";
import ModalPopup from '../Modal/ModalPopup';
import ModalSide from '../Modal/ModalSide';
import Modal from '../Modal/Modal';

import PopupModalComment from './PopupModalComment.jsx';

import * as commentActions from "../../store/comments.js";
import * as commentmodalActions from '../../store/commentmodals.js';
import * as popupModalCommentActions from '../../store/popupmodalscomment.js';
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
    const [newComment, setNewComment] = useState(null);
    const [errors, setErrors] = useState([]);
    const [newParentCommentId, setNewParentCommentId] = useState(null);
    const comments = useSelector(state => state.comment.comments);
    const writers = useSelector(commentActions.selectWriters());
    const create = useSelector(state => state.comment.create);
    const deleted = useSelector(state => state.comment.delete);
    const editing = useSelector(state => state.comment.editing);

    useEffect(() => {
        if (create !== null && create !== undefined) {
            // console.log("FOUND");
            setNewComment(null);
            // console.log(newComment);
            dispatch(commentActions.fetchComments());
            dispatch(commentActions.clearCreatedComment());
        }
    }, [create])

    useEffect(() => {
        if (deleted !== null && deleted !== undefined) {
            console.log("FOUND DELETE!");
            dispatch(commentActions.fetchComments());
            dispatch(commentActions.clearDeletedComment());
        }
    }, [deleted])

    useEffect(() => {
        if (editing !== null && editing !== undefined) {
            console.log("FOUND EDITING!!!");
            console.log(editing);
        }
    }, [editing])

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
        // console.log("$$$$$");
        dispatch(commentActions.clearCreatedComment());
        dispatch(commentActions.clearDeletedComment());
        dispatch(commentActions.clearEditingComment());
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
        if (e.target.className.includes('popup')) {
            return;
        }
        if (e.target.id.includes('pc') || e.target.className.includes('pc')) {
            return;
        }

        if(modalRef.current && modalRef.current.contains(e.target)) {
            return;
        }
        console.log(e.target);
        console.log(e.target.className);
        console.log("handleHide");
        document.removeEventListener('click', handleHide, {capture: true});
        dispatch(commentmodalActions.hideCommentModal());
    }

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

    function handlePopupModalComment(e, commentId) {
        e.preventDefault();
        console.log("CLICKY!");
        console.log(commentId);
        dispatch(popupModalCommentActions.showPopupModalComment(commentId));

        console.log(e.target);
        let rect = e.target.getBoundingClientRect();
        console.log(rect.top, rect.right, rect.bottom, rect.left);
    }

    function offsetValue() {
        // e.preventDefault();
        // console.log("CLICKY!");
        // dispatch(popupModalCommentActions.showPopupModalComment("comment"));

        // console.log(e.target);
        let rect = e.target.getBoundingClientRect();
        return rect.top;
        // console.log(rect.top, rect.right, rect.bottom, rect.left);
    }

    function handlePublish() {
        let userId = sessionUser.id;
        let comment = newComment;
        let parentCommentId = newParentCommentId;

        // console.log(newComment);
        // console.log(userId);
        // console.log(articleId);
        // console.log(newParentCommentId);

        dispatch(commentActions.postComment({comment, userId, articleId, parentCommentId}))
        .catch(async (res) => {
            let data;
            try {
              // .clone() essentially allows you to read the response body twice
              data = await res.clone().json();
            } catch {
              data = await res.text(); // Will hit this case if, e.g., server is down
            }

            if (data?.errors) {
                setErrors(data.errors);
                return;
            } else if (data) {
                setErrors([data]);
                return;
            } else {
                setErrors([res.statusText]);
                return;
            }
          });
    }

    if (!commentmodalType) {
        console.log("commentmodal type");
        return null;
    } else if (articleComments === undefined || articleComments === null) {
        console.log("article commments");
        console.log(articleComments);
        return null;
    } 
    // else if (writerIds.length !== 0 && (writers === null || writers === undefined)) {
    //     console.log("writers");
    //     console.log(articleComments);
    //     return null;
    // } 
    else {
        return (
            <>
                <ModalComments>
                    <p className="p-comment">Responses</p>
                    <span className="cCommentHolder">
                        <div className="cCommentUserHolder">
                            <div className="cCommentUserdot"></div>
                            <p className="cCommentUsername">{sessionUser.name}</p>
                        </div>
                        <textarea className="cComment" placeholder="What are your thoughts?" onChange={(e) => setNewComment(e.target.value)}></textarea>
                        <button onClick={handlePublish} className="cPostComment">Respond</button>
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
                                <PopupModalComment id={comment.id} comment={comment}/>
                                <i onClick={(e) => handlePopupModalComment(e, comment.id)} className="fa-solid fa-ellipsis" id="contentIcon2"></i>
                            </div>       
                            <p className='aCommentText'>{comment.commentbody}</p>
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