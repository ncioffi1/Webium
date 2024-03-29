import { useState, useEffect, useRef, createRef  } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import ModalComments from "../Modal/ModalComments";
import ModalPopup from '../Modal/ModalPopup';
import ModalSide from '../Modal/ModalSide';
import Modal from '../Modal/Modal';

import PopupModalComment from './PopupModalComment.jsx';

import * as articleActions from "../../store/articles.js";
import * as clapActions from "../../store/claps.js";
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
    const [newComment, setNewComment] = useState("");
    const [editedComment, setEditedComment] = useState("");
    const [errors, setErrors] = useState([]);
    const [newParentCommentId, setNewParentCommentId] = useState(null);
    const comments = useSelector(state => state.comment.articleComments);
    // const articleClaps = useSelector(state => state.clap.articleClaps);
    const allClaps = useSelector(state => state.clap.allClaps);
    const clapped = useSelector(state => state.clap.clapped);

    const writers = useSelector(commentActions.selectWriters());
    const create = useSelector(state => state.comment.create);
    const deleted = useSelector(state => state.comment.delete);
    const editing = useSelector(state => state.comment.editing);
    const edit = useSelector(state => state.comment.edit);

    function handleClapClick(e, comment) {
        e.preventDefault();
        // max 50 claps.
        let aClaps = Object.values(allClaps);
        let commentClaps = aClaps.filter((clap) => clap.commentId === comment.id);
        let userClaps = commentClaps.filter((clap) => clap.userId === sessionUser.id);

        if (userClaps.length >= 50) {
            return;
        }

        let userId = sessionUser.id;
        let commentId = comment.id
        let articleId = null;

        dispatch(clapActions.postClap({ userId, articleId, commentId }))
        .catch(async (res) => {
            let data;
            try {
              // .clone() essentially allows you to read the response body twice
              data = await res.clone().json();
            } catch {
              data = await res.text(); // Will hit this case if, e.g., server is down
            }

            if (data?.errors) {
                // setErrors(data.errors);
                return;
            } else if (data) {
                // setErrors([data]);
                return;
            } else {
                // setErrors([res.statusText]);
                return;
            }
          });
    }

    useEffect(() => {
        if (clapped !== null && clapped !== undefined) {
            dispatch(clapActions.clearClapped());
            dispatch(clapActions.fetchClaps());
        }
    }, [clapped])

    function getClapAmount(comment) {
        let aClaps = Object.values(allClaps);
        let commentClaps = aClaps.filter((clap) => clap.commentId === comment.id);
        if (commentClaps.length === 0) {
            return "";
        } else {
            return commentClaps.length;
        }
    }
    
    useEffect(() => {
        if (create !== null && create !== undefined) {
            setNewComment("");
            // dispatch(commentActions.fetchComments());
            dispatch(articleActions.fetchArticle(articleId));
            dispatch(commentActions.clearCreatedComment());
        }
    }, [create])

    useEffect(() => {
        if (deleted !== null && deleted !== undefined) {
            // dispatch(commentActions.fetchComments());
            dispatch(articleActions.fetchArticle(articleId));
            dispatch(commentActions.clearDeletedComment());
        }
    }, [deleted])

    useEffect(() => {
        if (edit !== null && edit !== undefined) {
            // dispatch(commentActions.fetchComments());
            dispatch(articleActions.fetchArticle(articleId));
            dispatch(commentActions.clearEditComment());
        }
    }, [edit])

    useEffect(() => {
        if (editing !== null && editing !== undefined) {
            setEditedComment(editing.commentbody);
        }
    }, [editing])

    useEffect(() => {
        if (comments !== null && comments !== undefined) {
            // set article comments
            // filter comments to ones that have articleId as the article_id
            let mComments = comments.filter((comment) => parseInt(comment.articleId) === parseInt(articleId));
            let sComments = mComments.sort(function(a, b) {
                return (a.id - b.id);
            })
            setArticleComments(sComments);
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
        dispatch(commentActions.clearCreatedComment());
        dispatch(commentActions.clearDeletedComment());
        dispatch(commentActions.clearEditingComment());
        dispatch(articleActions.fetchArticle(articleId));
        dispatch(clapActions.fetchClaps());
        // dispatch(commentActions.fetchComments());
    }, []);

    useEffect(() => {
        if (writerIds.length !== 0) {
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

        setErrors([]);
        document.removeEventListener('click', handleHide, {capture: true});
        dispatch(commentmodalActions.hideCommentModal());
    }

    function getUserName(userId) {
        
        if (writers !== undefined) {
            for (let i = 0; i < writers.length; i++) {
                if (writers[i].user.id === userId) {
                    return writers[i].user.name;
                }
            }
            return "User Name"
        }
    }

    function handlePopupModalComment(e, comment) {
        e.preventDefault();
        dispatch(popupModalCommentActions.showPopupModalComment(comment));

        let rect = e.target.getBoundingClientRect();
        // console.log(rect.top, rect.right, rect.bottom, rect.left);
    }

    function offsetValue() {
        // e.preventDefault();
        // dispatch(popupModalCommentActions.showPopupModalComment("comment"));

        let rect = e.target.getBoundingClientRect();
        return rect.top;
        // console.log(rect.top, rect.right, rect.bottom, rect.left);
    }

    function handlePublish() {
        let userId = sessionUser.id;
        let comment = newComment;
        let parentCommentId = newParentCommentId;

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

        setErrors([]);
        setNewComment("");
    }

    function handleCommentCancel() {
        dispatch(commentActions.clearEditingComment());
    }

    function handleCommentUpdate(e, comment) {
        e.preventDefault();
        // dispatch(commentActions.updateComment);
        dispatch(commentActions.clearEditingComment());
        let commentId = comment.id;
        let commentbody = editedComment;
        let user_id = comment.userId;
        let article_id = comment.articleId;
        let parent_comment_id = comment.parentCommentId;

        dispatch(commentActions.updateComment({ commentId, commentbody, user_id, article_id, parent_comment_id}))
    }

    function checkEditing() {
        if (editing !== null && editing !== undefined) {
            return true;
        } else {
            return false;
        }
    }
    function getDatePosted(commentDate) {
        let d1 = new Date(commentDate);
        let d2 = d1.toLocaleDateString('en-us', { year:"numeric", month:"short", day:"numeric"})
        return d2;
    }

    function getPhotoUrl(userId) {
        if (writers !== undefined) {
            for (let i = 0; i < writers.length; i++) {
                if (writers[i].user.id === userId) {
                    return writers[i].user.photoUrl;
                }
            }
            return null;
        }
    }

    if (sessionUser === null) {
        return;
    }

    if (!commentmodalType) {
        return null;
    } else if (articleComments === undefined || articleComments === null) {
        return null;
    } else {
        return (
            <>
                <ModalComments>
                    <p className="p-comment">Responses</p>
                    <span className="cCommentHolder">
                        <div className="cCommentUserHolder">
                            <img src={sessionUser.photoUrl} className="cCommentUserdot2"/>
                            {/* <div className="cCommentUserdot"></div> */}
                            <p className="cCommentUsername">{sessionUser.name}</p>
                        </div>
                        <textarea className="cComment" placeholder="What are your thoughts?" onChange={(e) => setNewComment(e.target.value)} value={newComment}></textarea>
                        <button onClick={handlePublish} className="cPostComment">Respond</button>
                    </span>
                    {errors.length === 0 ? (
                        <>
                            <span className="commentLine"></span>
                        </>
                    ) : (
                        <>
                            {errors.map(error => <p className="cErrors">{error}</p>)}
                            <span className="commentLineB"></span>
                        </>
                    )}
                    {articleComments.map((comment) => 
                            <div className='aComment'>
                                {checkEditing() && editing.id === comment.id ? (
                                    <>
                                        <span className="cCommentHolder">
                                            <textarea className="cComment" onChange={(e) => setEditedComment(e.target.value)} value={editedComment}></textarea>
                                            <span className="cCommentButtons">
                                                <button onClick={handleCommentCancel} className="cPostComment2">Cancel</button>
                                                <button onClick={(e) => handleCommentUpdate(e, comment)} className="cPostComment">Update</button>
                                            </span>
                                        </span>
                                        {/* <p>Test!</p> */}
                                        <div className="commentBuffer"></div>
                                        <span className="commentLine2"></span>
                                    </>
                                ) : (
                                    <>
                                         <div className='cCommentUserHolder'>
                                            <img src={getPhotoUrl(comment.userId)} className="cCommentUserdot2"/>
                                            {/* <div className="cCommentUserdot"></div> */}
                                            <div className="cCommentVertical">
                                                <p className="cCommentUsername">{getUserName(comment.userId)}</p>
                                                <p className='cCommentDatePosted'>{getDatePosted(comment.updatedAt)}</p>
                                            </div>
                                            <PopupModalComment id={comment.id} comment={comment}/>
                                            {comment.userId === sessionUser.id ? (
                                                <>
                                                    <i onClick={(e) => handlePopupModalComment(e, comment)} className="fa-solid fa-ellipsis" id="contentIcon2"></i>
                                                </>
                                            ) : (
                                                <>
                                                </>
                                            )}
                                        </div>       
                                        <p className='aCommentText'>{comment.commentbody}</p>
                                        <div className='cCommentLastRow'>
                                            <div onClick={((e) => handleClapClick(e, comment))} className='commentIconHolder'>
                                                <i className="fa-solid fa-hands-clapping" id='contentIcon3'></i>
                                                <p className='commentIconAmount'>{getClapAmount(comment)}</p>
                                            </div>
                                            <div className='commentReplyHolder'>
                                                {/* <p className='cCommentReply'>Reply</p> */}
                                            </div>
                                        </div>
                                        <span className="commentLine2"></span>
                                    </>
                                )}
                            </div>
                    )}
                    

                    {/* here, get an array of all this article's comments - then display them accordingly. */}
                </ModalComments>
            </>
        )
    }
    
}

export default CommentModal;