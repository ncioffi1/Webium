import { useParams, Link } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from 'react';
import './ArticleForm.css';
import { Navigate } from "react-router-dom";
import * as articleActions from "../../store/articles";
import * as commentmodalActions from "../../store/commentmodals.js";
import * as popupmodalActions from "../../store/popupmodals.js";

import TopBar from "../Navigation/TopBar";
import SidebarModal from "../SessionModal/SidebarModal";
import PopupModal from "../SessionModal/PopupModal.jsx";
import CommentModal from "../SessionModal/CommentModal.jsx";

function ArticleForm() {

    const sessionUser = useSelector(state => state.session.user);
    // const articleUser = 
    const { articleId } = useParams();
    const [articleContent, setArticleContent] = useState(null);
    // const [author, setAuthor] = useState(null);
    const [writerId, setWriterId] = useState(null);
    const dispatch = useDispatch();
    const article = useSelector(articleActions.selectArticle(articleId));
    const writer = useSelector(articleActions.selectWriter(writerId));


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
    // if (article !== null) {
    //     const writer = useSelector(articleActions.selectWriter(article.userId));
    // }

    // useEffect(() => {
    //     if (writer !== undefined) {
    //         console.log(writer.name);
    //     }
    // }, [writer])

    useEffect(() => {
        dispatch(articleActions.clearCreatedArticle());
        dispatch(articleActions.clearEditedArticle());
        dispatch(articleActions.clearArticleWriters());
    }, []);

    useEffect(() => {
        if (writerId !== null) {
            dispatch(articleActions.fetchWriter(writerId));
        }
    }, [writerId])

    useEffect(() => {
        dispatch(articleActions.fetchArticle(articleId));
    }, [articleId])

    useEffect(() => {
        console.log(article);
        if (article !== null) {
            let arr1 = article.content.split("\n");
            let arr2 = arr1.filter((paragraph) => /[a-z0-9]/i.test(paragraph));
            console.log(arr2);
            setArticleContent(arr2);
            setWriterId(article.userId);
        }
    }, [article])

    function getFirstLetter() {
        // console.log(sessionUser);
        // console.log(sessionUser.name);
        return writer.name[0];
    }

    function setRandomClass() {

    }

    function getUserName() {
        if (writer !== undefined) {
            return writer.name;
        }
    }

    function getDatePosted() {
        let date0 = article.datePosted;
        console.log(date0);
        let date1 = Date.parse(date0 + " 12:00:00 GMT");
        console.log(date1);
        let date2 = new Date(date1);
        console.log(date2);
        let date3 = date2.toLocaleDateString('en-US');
        console.log(date3);
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

    function handleUserClick(e) {
        e.preventDefault();

        setGoToUserPage(true);
    }

    if (goToUserPage) {
        return <Navigate to={`/users/${writerId}`} />
    }

    return (
        <>
            {sessionUser === null ? (
                <>
                    <Navigate to="/" replace={true} />
                </>
            ) : (
                <>
                    {(article === null || writer === undefined) ? (
                    <>
                        
                    </>
                ) : (
                    <>
                        <>
                            {sessionUser === null ? (
                                <>
                                </>
                            ) : (
                                <TopBar />
                            )}
                        </>
                        <CommentModal />
                        <div className='aPad1'></div>
                        <div className="aHolder">
                            <p className='aTitle'>{article.title}</p>
                            <div className='aPad2'></div>
                            <div className='profile'>
                                <div className="userdot2" id={setColor()}>{getFirstLetter()}</div>
                                <div className='profileTexts'>
                                    <div className="userTopLine">
                                        <p className='articleusername' onClick={(e) => handleUserClick(e)}>{getUserName()}</p>
                                        <p className='divider'>·</p>
                                        <p className='articleuserfollow'>Follow </p>
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
                                    <div className='articleIconHolder'>
                                        <i className="fa-solid fa-hands-clapping" id='aIcon'></i>
                                        <p className='iconAmount'>150</p>
                                    </div>
                                    <div onClick={(e) => handleCommentClick(e)} className='articleIconHolder'>
                                        <i className="fa-regular fa-comment" id='aIcon'></i>
                                        <p className='iconAmount'>150</p>
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
                                <img src={"https://placehold.co/1600x800"} className="aImage"/>
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
                            <Link to={`/`}>Back</Link>
                        </div>
                    </>
                )}
                </>
            )}
        </>
    )
}

export default ArticleForm;