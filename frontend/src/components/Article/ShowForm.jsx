
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as articleActions from "../../store/articles";
import * as modalActions from "../../store/modals";
import { Navigate } from 'react-router-dom';

import TopBar from '../Navigation/TopBar';
import Footer from '../Footer';

import './ShowForm.css';

function ShowForm() {
    const sessionUser = useSelector(state => state.session.user);
    const dispatch = useDispatch();
    const [writerIds, setWriterIds] = useState([]);
    const [goArticle, setGoArticle] = useState(null);
    const pulledArticles = useSelector(articleActions.selectArticlesArray())
    const [articles, setArticles] = useState(null);
    const writers = useSelector(articleActions.selectWriters());
    const filter = useSelector(state => state.article.filter);

    const [pageUserId, setPageUserId] = useState(null);
    const [goToUserPage, setGoToUserPage] = useState(null);

    useEffect(() => {
        
        dispatch(articleActions.clearArticleWriters());
        dispatch(articleActions.clearingFilter());
        dispatch(articleActions.fetchArticles());
        dispatch(modalActions.hideModal());
       
    }, [])
    useEffect(() => {
        if (filter !== null && filter !== undefined) {
            let newArticles = pulledArticles.filter(article => article.title.toLowerCase().includes(filter.toLowerCase()) || article.content.toLowerCase().includes(filter.toLowerCase()));
            
            setArticles(newArticles);
        }
    }, [filter])
    useEffect(() => {
        if (pulledArticles !== null && pulledArticles !== undefined) {
            setArticles(pulledArticles);
        }
    }, [pulledArticles])

    useEffect(() => {
        if (writerIds.length !== 0) {
            
            dispatch(articleActions.fetchWriters(writerIds));
        }
    }, [writerIds])

    useEffect(() => {
        if (articles !== null && articles !== undefined) {
            if (writerIds.length === 0) {
                setWriterIds(articles.map((article) => article.userId));
            }
        }
    }, [articles]);

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

    function getDatePosted(datePosted) {
        let date0 = datePosted;
        let date1 = Date.parse(date0 + " 12:00:00 GMT");
        let date2 = new Date(date1);
        let date3 = date2.toLocaleDateString('en-US');
        return date3;
    }

    function goToArticle(articleId) {
        setGoArticle(articleId);
    }

    if (goArticle !== null) {
        return <Navigate to={`/articles/${goArticle}`} replace={true} />
    }

    function handleUserClick(e, userId) {
        e.preventDefault();

        setPageUserId(userId);
        setGoToUserPage(true);
    }

    if (goToUserPage) {
        return <Navigate to={`/users/${pageUserId}`} />
    }
    if (sessionUser === null) {
        return;
    }

    return (
        <>
            {writers === undefined ? (
                <>
                </>
            ) : (
                <>
                    <>
                        {sessionUser === null ? (
                            <>
                            </>
                        ) : (
                            <TopBar canNav={false} hasSearch={true}/>
                        )}
                    </>
                    {articles !== null && articles.length > 0 ? (
                         <div className="zParent">
                            <div className="zParent2">
                                {articles.map(article => 
                                    <div key={article.id + "zz"}  className="zP4">
                                        <div key={article.id + "z"} className="zP3">
                                            <div key={article.id + "a"} className="sContentHolder">
                                                <div key={article.id + "b"} className="sPad1"></div>
                                                <div key={article.id + "c"} className="sPhotoLine">
                                                    <img src={getPhotoUrl(article.userId)} className="sUserDot2"/>
                                                    {/* <div key={article.id + "d"} className="sUserDot"></div> */}
                                                    <p onClick={(e) => handleUserClick(e, article.userId)} key={article.id + "e"} className='sName'>{getUserName(article.userId)}</p>
                                                    <p key={article.id + "f"} className='sDot'>·</p>
                                                    <p key={article.id + "g"} className='sDate'>{getDatePosted(article.datePosted)}</p>
                                                </div>
                                                <div key={article.id  + "h"} className='sHolder'>
                                                    <p key={article.id + "i"} onClick={() => goToArticle(article.id)} className="sTitle">{article.title}</p>
                                                    <p key={article.id + "j"} onClick={() => goToArticle(article.id)} className="sContent">{article.content}</p>
                                                </div>
                                                <div key={article.id + "k"} className="sPad1"></div>
                                            </div> 
                                            {/* to reactivate add article.photoUrl */}
                                            {/* to deactivate add "https://placehold.co/800x800" */}
                                            <img src={article.photoUrl} key={article.id + "l"} className="zPhoto" />
                                        </div> 
                                        <div key={article.id + "m"} className='sLine'></div>
                                    </div>
                                )}
                            </div>
                        </div>
                    ) : (
                        <>
                            <p className="sTextError">No articles found with this search query.</p>
                            <div className='sLineError'></div>
                        </>
                        
                    )}
                   
                    <Footer />
                    
                </>
            )}
        </>
    )
}

export default ShowForm;