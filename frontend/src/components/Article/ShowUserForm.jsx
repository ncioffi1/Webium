
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as articleActions from "../../store/articles";
import * as userActions from "../../store/users";
import { Navigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';

import "../UserPage.css";
import './ShowUserForm.css';

function ShowUserForm() {
    const sessionUser = useSelector(state => state.session.user);
    const dispatch = useDispatch();
    const { userId } = useParams();

    const [goArticle, setGoArticle] = useState(null);
    const [goUser, setGoUser] = useState(null);
    const [userArticles, setUserArticles] = useState(null);
    const [userName, setUserName] = useState(null);
    const articles = useSelector(articleActions.selectArticlesArray());
    const writer = useSelector(articleActions.selectWriter(userId));
    const user = useSelector(state => state.users.user);
    const followers = useSelector(state => state.users.followers);
    const following = useSelector(state => state.users.following);
    const users = useSelector(state => state.users.users);

    useEffect(() => {
        dispatch(articleActions.fetchArticles());
        dispatch(userActions.fetchUsers());
        // dispatch(articleActions.clearArticleWriters());
    }, [])

    useEffect(() => {
        if (userId !== null) {
            dispatch(articleActions.fetchWriter(userId));
            dispatch(userActions.fetchUser(userId));
            console.log("CHANGE DETECTED");
            setGoUser(null);
            setGoArticle(null);
        }
    }, [userId])

    useEffect(() => {
        if (articles !== null && articles !== undefined) {
            if (writer !== null && writer !== undefined) {
                let myArticles = Object.values(articles);
                let myArticles2 = myArticles.filter((article) => article.userId === writer.id);
                setUserArticles(myArticles2);
                setUserName(writer.name);
            }
        }
    }, [articles, writer]);

    function getPhotoUrl() {
        if (writer !== undefined && writer !== null) {
            return writer.photoUrl;
            // return writer.user.photoUrl;
        }
    }

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
    function getFollowersCount() {
        if (followers !== null && followers !== undefined) {
            return followers.length;
        } else {
            return 0;
        }
    }
    function getFollowingCount() {
        if (following !== null && following !== undefined) {
            return following.length;
        } else {
            return 0;
        }
    }

    function getFollowingName(followingId) {
        if (users !== null && users !== undefined) {
            for (let i = 0; i < users.length; i++) {
                if (users[i].id === followingId) {
                    return users[i].name;
                }
            }
        }
        return "User Name";
    }
    function getFollowingIcon(followingId) {
        if (users !== null && users !== undefined) {
            for (let i = 0; i < users.length; i++) {
                if (users[i].id === followingId) {
                    return users[i].photoUrl;
                }
            }
        }        
        return null;
    }

    function goToArticle(articleId) {
        console.log(articleId);
        setGoArticle(articleId);
    }
    function goToUser(e, userId) {
        e.preventDefault();
        setGoUser(userId);
    }

    if (goArticle !== null) {
        return <Navigate to={`/articles/${goArticle}`} replace={true} />
    }

    if (goUser !== null) {
        return <Navigate to={`/users/${goUser}`} replace={true} />
    }

    if (writer === undefined || writer === null) {
        console.log("No writer :(");
        console.log(writer);
        return;
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
                            <div className="uRow">
                                <div className="uColumn">
                                    <div className="uHolder">
                                        <p className='uText'>{userName}</p>
                                        <div className='uLine'></div>
                                    </div>
                                    <div className="uHolder">
                                        {userArticles.map(article => 
                                            <div key={article.id + "zz"}  className="sP4">
                                                <div key={article.id + "z"} className="sP3">
                                                    <div key={article.id + "a"} className="sContentHolder">
                                                        <div key={article.id + "b"} className="sPad1"></div>
                                                        <div key={article.id + "c"} className="sPhotoLine">
                                                            <img src={getPhotoUrl()} className="sUserDot2"/>
                                                            {/* <div key={article.id + "d"} className="sUserDot"></div> */}
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
                                                    <img src={article.photoUrl} key={article.id + "l"} className="sPhoto" />
                                                </div> 
                                                <div key={article.id + "m"} className='sLine'></div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <div className="sVerticalLine"></div>
                                <div className="sProfileHolder">
                                    <div className="pLine1"></div>
                                    <img src={getPhotoUrl()} className="pUserdot"></img>
                                    {/* <div className="pUserdot"></div> */}
                                    <p className="pUsername">{userName}</p>
                                    <p className="pThin">{getFollowersCount()} Followers</p>

                                    <button className="pButton">Follow</button>

                                    <p className="pFollowing">Following ({getFollowingCount()})</p>
                                    {getFollowingCount() === 0 ? (
                                        <>
                                        </>
                                    ) : (
                                        <>
                                            {following.map((follow) => 
                                                <>
                                                    <div onClick={(e) => goToUser(e, follow.followingId)} className="pFollowHolder">
                                                        <img src={getFollowingIcon(follow.followingId)} className="pFollowIcon"/>
                                                        <p className="pFollowName">{getFollowingName(follow.followingId)}</p>
                                                    </div>
                                                </>
                                            )}
                                        </>
                                    )}
                                    {/* {following.map((follow) => {
                                        <>
                                            <div>{getUserIcon(following.following_id)}</div>
                                            <p>{getUserName(following.following_id)}</p>
                                        </>
                                    })} */}
                                    

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