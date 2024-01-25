import { useParams, Link } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from 'react';
import './ArticleForm.css';
import { Navigate } from "react-router-dom";
import * as articleActions from "../../store/articles";
import * as commentmodalActions from "../../store/commentmodals.js";
import * as popupmodalActions from "../../store/popupmodals.js";
import * as clapActions from "../../store/claps.js";
import * as modalActions from "../../store/modals.js";
import * as userActions from "../../store/users.js";
import * as followActions from "../../store/follows.js";

import TopBar from "../Navigation/TopBar";
import SidebarModal from "../SessionModal/SidebarModal";
import PopupModal from "../SessionModal/PopupModal.jsx";
import CommentModal from "../SessionModal/CommentModal.jsx";

function ArticleForm() {

    const sessionUser = useSelector(state => state.session.user);
    const { articleId } = useParams();
    const [articleContent, setArticleContent] = useState(null);
    const [writerId, setWriterId] = useState(null);
    const dispatch = useDispatch();
    const article = useSelector(articleActions.selectArticle(articleId));
    const author = useSelector(userActions.selectWriter(writerId));
    const comments = useSelector(state => state.comment.articleComments);
    const claps = useSelector(state => state.clap.articleClaps);
    const clapped = useSelector(state => state.clap.clapped);
    const [articleClaps, setArticleClaps] = useState(null);
    const [articleComments, setArticleComments] = useState(null);
    const [errors, setErrors] = useState(null);

    const user = useSelector(state => state.users.user);
    const followers = useSelector(state => state.users.followers);
    const following = useSelector(state => state.users.following);
    const [userFollowers, setUserFollowers] = useState(null);
    const created = useSelector(state => state.follow.create);
    const deleted = useSelector(state => state.follow.delete);

    const [goToUserPage, setGoToUserPage] = useState(null);


    function handlePopupClick(e) {
        e.preventDefault();
        dispatch(popupmodalActions.showPopupModal("popup"));
    }

    function handleCommentClick(e) {
        e.preventDefault();
        dispatch(commentmodalActions.showCommentModal("comment"));
        console.log("CLICKED!!!!");
    }

    function handleClapClick(e) {
        e.preventDefault();

        // max 50 claps.
        let userClaps = articleClaps.filter((clap) => clap.userId === sessionUser.id);
        // console.log("++++++++++++++");
        // console.log(userClaps.length);
        if (userClaps.length >= 50) {
            return;
        }

        let userId = sessionUser.id;
        let commentId = null;

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
        // console.log("Clapped!");
    }

    useEffect(() => {
        if (writerId !== null) {
            dispatch(userActions.fetchUser(writerId));
            setUserFollowers(null);
        }
    }, [writerId]);

    useEffect(() => {
        if (created !== null && created !== undefined) {
            dispatch(followActions.clearCreatedFollow());
            dispatch(userActions.fetchUser(writerId));
        }
    }, [created]);

    useEffect(() => {
        if (deleted !== null && deleted !== undefined) {
            dispatch(followActions.clearDeletedFollow());
            dispatch(userActions.fetchUser(writerId));
        }
    }, [deleted]);

    useEffect(() => {
        if (followers !== null && followers !== undefined) {
            setUserFollowers(followers);
        }
    }, [followers])

    useEffect(() => {
        if (claps !== undefined && claps !== null) {
            let mClaps = Object.values(claps).filter((clap) => parseInt(clap.articleId) === parseInt(articleId));
            setArticleClaps(mClaps);
        } else if (claps === undefined) {
            setArticleClaps([]);
        }
    }, [claps])

    useEffect(() => {
        if (clapped !== null && clapped !== undefined) {
            dispatch(clapActions.clearClapped());
            dispatch(articleActions.fetchArticle(articleId));
        }
    }, [clapped])

    useEffect(() => {
        if (comments !== null && comments !== undefined) {
            let mComments = comments.filter((comment) => parseInt(comment.articleId) === parseInt(articleId));
            let sComments = mComments.sort(function(a, b) {return (a.id - b.id); })
            // console.log("HIT: comments being set");
            setArticleComments(sComments);
        } 
        else if (comments === undefined) {
            // console.log("HIT: comments undefined");
            setArticleComments([]);
        }
    }, [comments])

    useEffect(() => {
        dispatch(articleActions.clearCreatedArticle());
        dispatch(articleActions.clearEditedArticle());
        dispatch(articleActions.clearArticleWriters());
    }, []);

    useEffect(() => {
        dispatch(articleActions.fetchArticle(articleId));
    }, [articleId])

    useEffect(() => {
        // console.log(article);
        if (article !== null) {
            let arr1 = article.content.split("\n");
            let arr2 = arr1.filter((paragraph) => /[a-z0-9]/i.test(paragraph));
            // console.log(arr2);
            setArticleContent(arr2);
            setWriterId(article.userId);
        }
    }, [article])

    function getFirstLetter() {
        if (author !== undefined && author !== null) {
            return author.name[0];
        }
    }

    function getUserName() {
        if (author !== undefined) {
            return author.name;
        }
    }

    function getDatePosted() {
        let date0 = article.datePosted;
        // console.log(date0);
        let date1 = Date.parse(date0 + " 12:00:00 GMT");
        // console.log(date1);
        let date2 = new Date(date1);
        // console.log(date2);
        let date3 = date2.toLocaleDateString('en-US');
        // console.log(date3);
        return date3;
    }

    function setColor() {
        let letter0 = getFirstLetter();
        let letter = letter0.toLowerCase();
        let batch1 = "ahov"
        let batch2 = "bipw"
        let batch3 = "cjqx"
        let batch4 = "dkry"
        let batch5 = "elsz"
        let batch6 = "fmtgnu"
        if (batch1.includes(letter)) {
            return "batch1";
        } else if (batch2.includes(letter)) {
            return "batch2";
        } else if (batch3.includes(letter)) {
            return "batch3";
        } else if (batch4.includes(letter)) {
            return "batch4";
        } else if (batch5.includes(letter)) {
            return "batch5";
        } else if (batch6.includes(letter)) {
            return "batch6";
        } else {
            console.log("NOT FOUND");
        }
    }

    function getCommentAmount() {
        if (articleComments.length === 0) {
            return "";
        } else {
            return articleComments.length;
        }
    }
    function getClapAmount() {
        if (articleClaps.length === 0) {
            return "";
        } else {
            return articleClaps.length;
        }
    }
    function handleFollow(e) {
        e.preventDefault();
        // console.log("CLICKED FOLLOW!");
        
        let status = "FOLLOW";
        let followId = null;

        for (let i = 0; i < followers.length; i++) {
            if (followers[i].followerId === sessionUser.id) {
                if (followers[i].followingId === parseInt(writerId)) {
                    status = "UNFOLLOW";
                    followId = followers[i].id;
                }
            }
        }

        if (status === "FOLLOW") {
            let follower_id = sessionUser.id;
            let following_id = writerId;  
            dispatch(followActions.postFollow({follower_id, following_id}));
        } else if (status === "UNFOLLOW") {
            dispatch(followActions.deleteFollow(followId));
        }
    }

    function checkIfAlreadyFollowing() {
        for (let i = 0; i < followers.length; i++) {
            if (followers[i].followerId === sessionUser.id) {
                if (followers[i].followingId === parseInt(writerId)) {
                    return true;
                }
            }
        }
        return false;
    }


    function handleUserClick(e) {
        e.preventDefault();

        setGoToUserPage(true);
    }

    if (goToUserPage) {
        return <Navigate to={`/users/${writerId}`} />
    }

    if (articleComments === null || articleComments === undefined) {
        return null;
    }

    if (userFollowers === undefined || userFollowers === null) {
        return;
    }


    return (
        <>
            {sessionUser === null ? (
                <>
                    <Navigate to="/" replace={true} />
                </>
            ) : (
                <>
                    {(article === null || author === undefined) ? (
                    <>
                        
                    </>
                ) : (
                    <>
                        <>
                            {sessionUser === null ? (
                                <>
                                </>
                            ) : (
                                <TopBar canNav={true}/>
                            )}
                        </>
                        <CommentModal />
                        <div className='aPad1'></div>
                        <div className="aHolder">
                            <p className='aTitle'>{article.title}</p>
                            <div className='aPad2'></div>
                            <div className='profile'>
                                {/* <div className="userdot2" id={setColor()}>{getFirstLetter()}</div> */}
                                <img src={author.photoUrl} className="userdot3"/>
                                <div className='profileTexts'>
                                    <div className="userTopLine">
                                        <p className='articleusername' onClick={(e) => handleUserClick(e)}>{getUserName()}</p>
                                        
                                        {sessionUser.id === parseInt(writerId) ? (
                                            <>
                                            </>
                                        ) : (
                                            <>
                                                {checkIfAlreadyFollowing() ? (
                                                    <>
                                                        <p className='divider'>·</p>
                                                        <button onClick={(e) => handleFollow(e)} className='articleuserfollow2'>Following</button>
                                                    </>
                                                ) : (
                                                    <>
                                                        <p className='divider'>·</p>
                                                        <button onClick={(e) => handleFollow(e)} className='articleuserfollow'>Follow </button>
                                                    </>
                                                )}
                                            </>
                                        )}
                                    </div>
                                    <div className="userBotLine">
                                        <p className='articledate'>{getDatePosted()}</p>
                                    </div>
                                </div>
                            </div>
                            <div className='linePad'></div>
                            <div className='lineA'></div>
                            <div className='iconBar'>
                                <div className='iconBarL'>
                                    <div onClick={(e) => handleClapClick(e)} className='articleIconHolder'>
                                        <i className="fa-solid fa-hands-clapping" id='aIcon'></i>
                                        <p className='iconAmount'>{getClapAmount()}</p>
                                    </div>
                                    <div onClick={(e) => handleCommentClick(e)} className='articleIconHolder'>
                                        <i className="fa-regular fa-comment" id='aIcon'></i>
                                        <p className='iconAmount'>{getCommentAmount()}</p>
                                    </div>
                                </div>
                                <div className='iconBarR'>
                                    {sessionUser.id === writerId ? (
                                        <div className='articleIconHolder2'>
                                        <i onClick={(e) => handlePopupClick(e)} className="fa-solid fa-ellipsis" id="aIcon2"></i>
                                        <PopupModal />
                                        {/* <p>...</p> */}
                                        </div>
                                    ) : (
                                        <>
                                        </>
                                    )}
                                </div>
                            </div>
                            <div className='lineA'></div>
                            {/* <div className='linePad'></div> */}
                            <div className='aPad2'></div>
                            <div className="aImageHolder"> 
                            {/* to reactivate add article.photoUrl */}
                            {/* to deactivate add "https://placehold.co/1600x800" */}
                                <img src={article.photoUrl} className="aImage"/>
                            </div>
                            {articleContent === null ? (
                                <>
                                </>
                            ) : (
                                <>
                                    <ul className="aContentHolder">
                                        {articleContent.map(paragraph => <p className="aContent" key={paragraph}>{paragraph}</p>)}
                                    </ul>
                                </>
                            )}
                            
                            {/* <p className='aContent'>{article.content}</p> */}
                            {/* <Link to={`/`}>Back</Link> */}
                        </div>
                    </>
                )}
                </>
            )}
        </>
    )
}

export default ArticleForm;