import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';

import '../WebiumBrowser.css';
import '../../reset.css';
import SidebarModal from '../SessionModal/SidebarModal.jsx';
import * as sidemodalActions from '../../store/sidemodals.js';
import * as modalActions from '../../store/modals.js';
import * as articleActions from '../../store/articles.js'

import { Navigate, Link } from 'react-router-dom';

function TopBar(props) {
    const sessionUser = useSelector(state => state.session.user);
    const [searchValue, setSearchValue] = useState("");
    const [writing, setWriting] = useState(false);
    const [clickedWebium, setClickedWebium] = useState(false);

    const [goToHome, setGoToHome] = useState(false);

    const dispatch = useDispatch();

    useEffect(() => {
        setWriting(false);
        setClickedWebium(false);
    }, [])

    function handleSidebarClick(e) {
        e.preventDefault();
        dispatch(sidemodalActions.showSidebarModal("sidebar"));
    }

    function handleWrite(e) {
        e.preventDefault();
        // go to WRITE NEW ARTICLE page.
        setWriting(true);
    }

    function getFirstLetter() {
        // console.log(sessionUser);
        // console.log(sessionUser.name);
        if (sessionUser !== null && sessionUser !== undefined) {
            // console.log("SESSION USER:");
            // console.log(sessionUser);
            return sessionUser.name[0];
        }
    }

    function clickWebium(e) {
        e.preventDefault();

        console.log("clicked webium!!!");
        setClickedWebium(true);
    }

    function handleKeyDown(e) {
        if (e.key === "Enter") {
            console.log("enter key hit");
            runSearch(e);
        }
    }

    function runSearch(e) {
        e.preventDefault();
        console.log('running search...');
        dispatch(articleActions.settingFilter(searchValue));
    }

    // function goHome() {
    //     setGoToHome(true);
    // }

    // if (goToHome !== false) {
    //     // // setGoToHome(false);
    //     // console.log("NAVIGATING");
    //     // // console.log(window.location);
    //     // return <Navigate to={`/`} replace={true} />
    // }
    if (sessionUser === null || sessionUser === undefined) {
        return <Navigate to={"/"}/>
    }

    if (writing) {
        console.log("GO TO NEW ARTICLE!");
        // return <Navigate to={"/"}/>
        return <Navigate to={"/articles/new"}/>
    } 
    else if (clickedWebium && props.canNav) {
        console.log("GO TO HOME PAGE!");
        console.log(clickedWebium);
        return <Navigate to={"/"}/>
    }
    else {
        return (
            <>
                {<SidebarModal />}
                <div className="splashWhite">
                    <div className="topbar">
                        <div className='topbarleft3'>
                            {/* <Link to={"/"} className="splashtextlogo">Webium</Link> */}
                            <p className="splashtextlogo" onClick={(e) => clickWebium(e)}>Webium</p>
                            {props.hasSearch ? (
                                <>
                                    <div className='searchbarholder'>
                                        <div className='usersearchbar'>
                                        <i onClick={(e) => runSearch(e)} className="fa-solid fa-magnifying-glass" id="searchIcon"></i>
                                            <input className='search' value={searchValue} placeholder="Search" onKeyDown={(e) => handleKeyDown(e)} onChange={(e) => setSearchValue(e.target.value)}/>
                                        </div>
                                    </div>
                                </>
                            ) : (
                                <>
                                </>
                            )}
                            
                            
        
                        </div>
                        <div className="topbarright3">
                            <div className='write' onClick={handleWrite}>
                                <i className="fa-regular fa-pen-to-square" id="writeIcon"></i>
                                <p className='writeText'>Write</p>
                            </div>
                            <div className='pad1right'></div>
                            <img onClick={handleSidebarClick} src={sessionUser.photoUrl} className="userdotSidebar"/>
                            {/* <button onClick={handleSidebarClick} className="userdot">{getFirstLetter()}</button> */}
                        </div>
                    </div>
                    <div className="line2"></div>
                </div>
            </>
        )
    }
}

export default TopBar;