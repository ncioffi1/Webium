
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as articleActions from "../../store/articles";
import { Navigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';

import './ShowForm.css';

function ShowUserForm() {
    const sessionUser = useSelector(state => state.session.user);
    const dispatch = useDispatch();
    const { userId } = useParams();

    const [goArticle, setGoArticle] = useState(null);
    const [userArticles, setUserArticles] = useState(null);
    const [userName, setUserName] = useState(null);
    const articles = useSelector(articleActions.selectArticlesArray());
    const writer = useSelector(articleActions.selectWriter(userId));

    useEffect(() => {
        console.log("dispatching clearWriters");
        dispatch(articleActions.fetchArticles());

        // dispatch(articleActions.clearArticleWriters());
    }, [])

    useEffect(() => {
        if (userId !== null) {
            dispatch(articleActions.fetchWriter(userId));
        }
    }, [userId])

    useEffect(() => {
        if (articles !== null && articles !== undefined) {
            if (writer !== null && writer !== undefined) {
                setUserArticles(articles.filter((article) => article.userId === writer.id));
                console.log("=========");
                console.log(userArticles);
                setUserName(writer.name);
            }
            
            // if (writerIds.length === 0) {
            //     setWriterIds(articles.map((article) => article.userId));
            // }
        }
    }, [articles, writer]);

    // function getUserName() {
    //     if (writer !== undefined && writer !== null) {
    //         console.log(writer.name);
    //         return writer.name;
    //     } else {
    //         return "User Name";
    //     }
    // }

    function getDatePosted(datePosted) {
        let date0 = datePosted;
        // console.log(date0);
        let date1 = Date.parse(date0 + " 12:00:00 GMT");
        // console.log(date1);
        let date2 = new Date(date1);
        // console.log(date2);
        let date3 = date2.toLocaleDateString('en-US');
        // console.log(date3);
        return date3;
    }

    function goToArticle(articleId) {
        console.log(articleId);
        setGoArticle(articleId);
    }

    if (goArticle !== null) {
        return <Navigate to={`/articles/${goArticle}`} replace={true} />
    }

    return (
        <>
            {(userArticles === undefined || userArticles === null) ? (
                <>
                </>
            ) : (
                <>
                    {(userName === undefined || userName === null) ? (
                    <>
                        
                    </>
                    ) : (
                        <>
                            <div className="sParent">
                                <div className="sParent2">
                                        {userArticles.map(article => 
                                            <div key={article.id + "zz"}  className="sP4">
                                                <div key={article.id + "z"} className="sP3">
                                                    <div key={article.id + "a"} className="sContentHolder">
                                                        <div key={article.id + "b"} className="sPad1"></div>
                                                        <div key={article.id + "c"} className="sPhotoLine">
                                                            <div key={article.id + "d"} className="sUserDot"></div>
                                                            <p key={article.id + "e"} className='sName' id="sNormal">{userName}</p>
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
                                                    <img src={"https://placehold.co/800x800"} key={article.id + "l"} className="sPhoto" />
                                                </div> 
                                                <div key={article.id + "m"} className='sLine'></div>
                                            </div>
                                        )}
                                </div>
                            </div>
                        </>
                    )};
                </>
                
            )};           
        </>
    )
}

export default ShowUserForm;