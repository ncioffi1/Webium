import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import TopBar from './Navigation/TopBar.jsx';
import SessionModal from './SessionModal/SessionModal';
import SidebarModal from './SessionModal/SidebarModal.jsx';
import * as sessionActions from '../store/session.js';


import './WebiumBrowser.css'
import '../reset.css'
import LoginModal from './session/LoginModal';

function WebiumBrowser({ values }) {
    // const [modalActive, setModalActive] = useState(false);
    const sessionUser = useSelector(state => state.session.user);
    const [searchValue, setSearchValue] = useState("");
    const [searching, setSearching] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        console.log("TEST!!!");
    })
    // const handleClose = () => setModalActive(false);

    function getFirstLetter() {
        console.log(sessionUser);
        console.log(sessionUser.name);
        return sessionUser.name[0];
    }
    function handleSignupClick(e) {
        e.preventDefault();

        dispatch(modalActions.showModal("signup"));
    } 

    function handleLoginClick(e) {
        e.preventDefault();
        dispatch(modalActions.showModal("login"));
    }

    function handleLogoutClick(e) {
        e.preventDefault();
        dispatch(sessionActions.logout());
    }

    
    
    return (
        <>
            {<SessionModal />}
            {sessionUser === null ? (
                <>
                    <div className="splash">
                        <div className="topbar">
                            <h1 className="splashtextlogo">Webium</h1>
                            <div className='rightstuff'>
                                <div className="topbarright2">
                                    <button onClick={handleLoginClick} className="button2">Sign In</button>
                                </div>
                                <div className="topbarright">
                                    <button onClick={handleSignupClick} className="button1">Get Started</button>
                                </div>
                            </div>
    
                        </div>
                        <div className="line"></div>

                        <h1 className="splashtextbig">Stay curious.</h1>
                        <h1 className="splashtextmiddle">Discover stories, thinking, and expertise from fake writers on any topic.</h1>
                        
                        <div className="button1Bholder">
                            <button onClick={handleSignupClick} className="button1B">Start reading</button>
                        </div>
                        <div className="line"></div>
                    </div>
                </>
            ) : (
                <>
                    <TopBar />
                </>
            ) }
        </>
    );
};

export default WebiumBrowser;
