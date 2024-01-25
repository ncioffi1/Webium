

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

import "./FileInput.css";

function EditForm() {
    const sessionUser = useSelector(state => state.session.user);
    const dispatch = useDispatch();
    const { articleId } = useParams();
    const editedArticle = useSelector(articleActions.selectEditedArticle());
    const article = useSelector(articleActions.selectArticle(articleId));

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [photoUrl, setPhotoUrl] = useState("");
    const [loaded, setLoaded] = useState(false);

    const [errors, setErrors] = useState([]);

    const ref = useRef();
    const ref2 = useRef();

    // adding photos
    const [file, setFile] = useState(null);
    const [photoUrlPreview, setPhotoUrlPreview] = useState(null);
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setFile(file);
        if (file) {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);
            fileReader.onload = () => setPhotoUrlPreview(fileReader.result);
        } else {
            setPhotoUrlPreview(null);
        }
      };
    const uploadFile = (e) => {
        console.log(file);
    }

    useEffect(() => {
        // console.log("!!=======!!");
        // console.log(photoUrlPreview);
    }, [photoUrlPreview])

    let preview = null;
    let previewExisting = null;
    if (photoUrlPreview) {
        preview = <img className="fImage2" src={photoUrlPreview} alt="" />;
    } 
    if (photoUrl) {
        previewExisting = <img className="fImage2" src={photoUrl} alt="" />;
    }

    /////
    

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
            setPhotoUrl(article.photoUrl);
            // console.log(article.photoUrl);
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
        let photo = null;
        if (file) {
            photo = file;
        }

        dispatch(articleActions.updateArticle({ articleId, title, content, photo }))
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
    

    if (sessionUser === null || sessionUser === undefined) {
        return <Navigate to={"/"}/>
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

    if (sessionUser === null) {
        return;
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
                            <Link to={"/"} className="splashtextlogo">Webium</Link>
                            
                            <div className='searchbarholder'></div>
                        </div>
                        <div className="topbarright3">
                            <div className='pad1right'></div>
                            <div className='pButtonHolder'>
                                <button className="publishButton" onClick={handlePublish}>Save and Publish</button>
                            </div>
                            <img onClick={handleSidebarClick} src={sessionUser.photoUrl} className="userdotSidebar"/>
                            {/* <button onClick={handleSidebarClick} className="userdot">{getFirstLetter()}</button> */}
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
                        <textarea ref={ref2} maxLength="80" onInput={handleInput2} rows={1} className="cTitle" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)}></textarea>
                        <textarea ref={ref} rows={1} onInput={handleInput} className="cContent" placeholder="Tell your story..." value={content} onChange={(e) => setContent(e.target.value)}></textarea>    
                    </div>

                    <div className="fPad"></div>
                    <div className="fInput">
                        <div>
                            <p className='fText'>Change Article Photo:</p>
                            <label className='fFile' >Select File
                                <input type="file" onChange={handleFileChange} />
                            </label>
                        </div>
                        {photoUrlPreview === null ? (
                            <>
                                {photoUrl === null ? (
                                    <>
                                        <div className="fImage">
                                            <p className="fText2">Include an image in your story to make it more inviting to readers.</p>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <div className="fImage2Holder">
                                            {previewExisting}
                                        </div>
                                    </>
                                )}
                            </>
                        ) : (
                            <>
                                <div className="fImage2Holder">
                                    {preview}
                                </div>
                            </>
                        )}
                    </div>
                </>
            </>
            )}
        </>
    )
    
}

export default EditForm;