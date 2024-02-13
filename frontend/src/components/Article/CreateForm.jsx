import { useParams, Link } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from 'react';
import { ChangeEvent, useRef } from "react";
import { Navigate } from "react-router-dom";
import './CreateForm.css';
import '../WebiumBrowser.css';
import '../Navigation/TopBar.css';
import FileInput from "./FileInput";
import SidebarModal from "../SessionModal/SidebarModal";
import * as sidemodalActions from "../../store/sidemodals";
import * as articleActions from "../../store/articles";

import "./FileInput.css";

function CreateForm() {
    const sessionUser = useSelector(state => state.session.user);
    // const article = useSelector(state => state.article)
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    
    const createdArticle = useSelector(articleActions.selectCreatedArticle());

    const [errors, setErrors] = useState([]);

    const ref = useRef();
    const ref2 = useRef();

    // file stuff
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
        
    }

    useEffect(() => {
     
    }, [photoUrlPreview])

    let preview = null;
    if (photoUrlPreview) {
        preview = <img className="fImage2" src={photoUrlPreview} alt="" />;
    } 
    //


    if (createdArticle !== undefined && createdArticle !== null) {
        return <Navigate to={`/articles/${createdArticle.id}`} replace={true} />
    }

    const handleInput = (e) => {
        if (ref.current) {
          ref.current.style.height = "auto";
          ref.current.style.height = `${e.target.scrollHeight}px`;
        }
    };

    const handleInput2 = (e) => {
        if (ref2.current) {
            ref2.current.style.height = "auto";
            ref2.current.style.height = `${e.target.scrollHeight}px`;
        }
    };

    const dispatch = useDispatch();

    function handleSidebarClick(e) {
        e.preventDefault();
        dispatch(sidemodalActions.showSidebarModal("sidebar"));
    }

    function getFirstLetter() {
        if (sessionUser !== null && sessionUser !== undefined) {
            return sessionUser.name[0];
        }
    }

    function handlePublish() {

        let photo = null;
        if (file) {
            photo = file;
        }


        dispatch(articleActions.postArticle({ title, content, photo }))
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
    } return (
        <>
            {<SidebarModal />}
            <div className="splashWhite2">
                <div className="topbar">
                    <div className='topbarleft3'>
                        <Link to={"/"} className="splashtextlogo">Webium</Link>
                        <div className='searchbarholder'>
                            
                        </div>
                    </div>
                    <div className="topbarright3">
                        <div className='pad1right'></div>
                        <div className='pButtonHolder'>
                            <button className="publishButton" onClick={handlePublish}>Publish</button>
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
                    <textarea ref={ref2} maxLength="80" onInput={handleInput2} rows={1} className="cTitle" placeholder="Title" onChange={(e) => setTitle(e.target.value)}></textarea>
                    {/* <input className="cTitle" placeholder="Title" onChange={(e) => setTitle(e.target.value)}></input> */}
                    <textarea ref={ref} rows={1} onInput={handleInput} className="cContent" placeholder="Tell your story..." onChange={(e) => setContent(e.target.value)}></textarea>    
                </div>

                <div className="fPad"></div>
                <div className="fInput">
                    <div>
                        <p className='fText'>Upload Article Photo:</p>
                        <label className='fFile' >Select File
                            <input type="file" onChange={handleFileChange} />
                        </label>
                        
                        {/* <button onClick={uploadFile}>Upload</button> */}
                    </div>
                    {photoUrlPreview === null ? (
                        <>
                            <div className="fImage">
                                <p className="fText2">Include an image in your story to make it more inviting to readers.</p>
                            </div>
                            
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
        
    )
}


export default CreateForm;