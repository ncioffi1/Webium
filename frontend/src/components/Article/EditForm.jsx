

import { useParams, Link } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from 'react';
import { ChangeEvent, useRef } from "react";
import { Navigate } from "react-router-dom";
import './CreateForm.css';
import '../WebiumBrowser.css';
import '../Navigation/TopBar.css';

import SidebarModal from "../SessionModal/SidebarModal";
import * as sidemodalActions from "../../store/sidemodals";
import * as articleActions from "../../store/articles";

function EditForm() {
    const sessionUser = useSelector(state => state.session.user);
    const dispatch = useDispatch();
    const { articleId } = useParams();
    const editedArticle = useSelector(articleActions.selectEditedArticle());
    const article = useSelector(articleActions.selectArticle(articleId));

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [loaded, setLoaded] = useState(false);

    const [errors, setErrors] = useState([]);

    const ref = useRef();
    const ref2 = useRef();


    const handleInput = (e) => {
        if (ref.current) {
          ref.current.style.height = "auto";
          ref.current.style.height = `${e.target.scrollHeight}px`;
          console.log(ref.current.style.height);
          console.log(e.target.scrollHeight);
        }
    };

    const handleInput2 = (e) => {
        if (ref2.current) {
            ref2.current.style.height = "auto";
            ref2.current.style.height = `${e.target.scrollHeight}px`;
            console.log(ref2.current.style.height);
            console.log(e.target.scrollHeight);
        }
    }

    useEffect(() => {
        // set article stuff here
        if (article !== null) {
            setTitle(article.title);
            setContent(article.content);
        }
    }, [article])

    useEffect(() => {
        if (article !== null) {
            if (ref.current) {
                ref.current.style.height = "auto";
                ref.current.style.height = `${ref.current.scrollHeight}px`;
            }
            if (ref2.current) {
                ref2.current.style.height = "auto";
                ref2.current.style.height = `${ref2.current.scrollHeight}px`;
            }
    
            if (ref.current && ref2.current) {
                setLoaded(true);
            }
        }
    }, [ref, ref2, article])

    useEffect(() => {
        dispatch(articleActions.fetchArticle(articleId));
    }, [articleId])

    function handleSidebarClick(e) {
        e.preventDefault();
        dispatch(sidemodalActions.showSidebarModal("sidebar"));
    }

    function getFirstLetter() {
        return sessionUser.name[0];
    }

    function handlePublish() {
        dispatch(articleActions.updateArticle({ articleId, title, content }))
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

    if (editedArticle !== undefined && editedArticle !== null) {
        return <Navigate to={`/articles/${editedArticle.id}`} replace={true} />
    } else if (article !== null) {
        if (article.userId !== sessionUser.id) {
            // console.log("ERROR:  user not same!");
            return <Navigate to={`/articles/${articleId}`} replace={true} />
        } else {
            // console.log("SUCCESS:  user is same!");
        }
    }

    return (
        <>
            {article === null ? (
                <>
                    
                </>
            ) : (
                <>
                {<SidebarModal />}
                <div className="splashWhite2">
                    <div className="topbar">
                        <div className='topbarleft3'>
                            <h1 className="splashtextlogo">Webium</h1>
                            <div className='searchbarholder'>
                                
                            </div>
                            
        
                        </div>
                        <div className="topbarright3">
                            <div className='pad1right'></div>
                            <div className='pButtonHolder'>
                                <button className="publishButton" onClick={handlePublish}>Save and Publish</button>
                            </div>
                            <button onClick={handleSidebarClick} className="userdot">{getFirstLetter()}</button>
                        </div>
                    </div>
                    <div className="line2"></div>
                </div>
    
                <>
                    <div className="cPadTopBar"></div>
                    <div className="cPad1"></div>
                    <ul className="signupErrorHolder">
                        {errors.map(error => <li className="signupErrors" key={error}>{error}</li>)}
                    </ul>
                    <div className="cPad1"></div>
                    <div className="cHolder">
                        <textarea ref={ref2} maxLength="60" onInput={handleInput2} rows={1} className="cTitle" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)}></textarea>
                        <textarea ref={ref} rows={1} onInput={handleInput} className="cContent" placeholder="Tell your story..." value={content} onChange={(e) => setContent(e.target.value)}></textarea>    
                    </div>
                </>
            </>
            )}
        </>
    )
}

export default EditForm;