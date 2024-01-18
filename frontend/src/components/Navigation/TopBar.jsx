import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import '../WebiumBrowser.css';
import '../../reset.css';
import SidebarModal from '../SessionModal/SidebarModal.jsx';
import * as sidemodalActions from '../../store/sidemodals.js';
import * as modalActions from '../../store/modals.js';

function TopBar() {
    const sessionUser = useSelector(state => state.session.user);
    const [searchValue, setSearchValue] = useState("");

    const dispatch = useDispatch();

    function handleSidebarClick(e) {
        e.preventDefault();
        dispatch(sidemodalActions.showSidebarModal("sidebar"));
    }

    function handleWrite(e) {
        e.preventDefault();
        // go to WRITE NEW ARTICLE page.
    }

    function getFirstLetter() {
        // console.log(sessionUser);
        // console.log(sessionUser.name);
        return sessionUser.name[0];
    }

    return (
        <>
            {<SidebarModal />}
            <div className="splashWhite">
                <div className="topbar">
                    <div className='topbarleft3'>
                        <h1 className="splashtextlogo">Webium</h1>
                        <div className='searchbarholder'>
                            <div className='usersearchbar'>
                            <i className="fa-solid fa-magnifying-glass" id="searchIcon"></i>
                                <input className='search' value={searchValue} placeholder="Search" onChange={(e) => setSearchValue(e.target.value)}/>
                            </div>
                        </div>
                        
    
                    </div>
                    <div className="topbarright3">
                        <div className='write' onClick={handleWrite}>
                            <i className="fa-regular fa-pen-to-square" id="writeIcon"></i>
                            <p className='writeText'>Write</p>
                        </div>
                        <div className='pad1right'></div>
                        <button onClick={handleSidebarClick} className="userdot">{getFirstLetter()}</button>
                    </div>
                </div>
                <div className="line2"></div>
            </div>
        </>
    )
}

export default TopBar;