import { useState, useEffect, useRef, createRef  } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import ModalSide from '../Modal/ModalSide';
import Modal from '../Modal/Modal';

import * as sidemodalActions from '../../store/sidemodals.js'
import * as sessionActions from '../../store/session.js';

import { Navigate } from 'react-router-dom';

import './SidebarModal.css';

function SidebarModal() {

    const sessionUser = useSelector(state => state.session.user);
    const dispatch = useDispatch();
    const sidemodalType = useSelector(state => state.sidemodals.type);
    const [email, setEmail] = useState("");

    let modalRef = createRef();

    const [goToProfile, setGoToProfile] = useState(null);

    useEffect(() => {
        if (sessionUser) {
            setEmail(sessionUser.email);
            // setEmail(sessionUser)
        }
    }, [])

    useEffect(() => {
        if (sessionUser) {
            setEmail(sessionUser.email);
            // setEmail(sessionUser)
        }
    }, [sessionUser])

    useEffect(() => {
        if (sidemodalType) {
            document.addEventListener("click", handleHide, {capture: true});
        } else {
            document.removeEventListener("click", handleHide, {capture: true});
        }
    }, [sidemodalType])

    function handleLogoutClick(e) {
        console.log("handle logout");
        e.preventDefault();
        document.removeEventListener('click', handleHide, {capture: true});
        dispatch(sidemodalActions.hideSidebarModal());
        dispatch(sessionActions.logout());
    }
    

    function handleHide(e) {
        e.preventDefault();
        if (e.target.className.includes('side')) {
            return;
        }

        if(modalRef.current && modalRef.current.contains(e.target)) {
            return;
        }
        // console.log("clicked");
        document.removeEventListener('click', handleHide, {capture: true});
        dispatch(sidemodalActions.hideSidebarModal());
    }

    function handleProfileClick(e) {
        e.preventDefault();
        // console.log("CLICK!!!!");
        // console.log(sessionUser);
        setGoToProfile(true);
    }

    if (goToProfile) {
        // console.log(goToProfile);
        return <Navigate to={`/users/${sessionUser.id}`} replace={true}></Navigate>
    }

    if (!sidemodalType) {
        return null;
    } else {
        return (
        <>
            <ModalSide>
                <div ref={modalRef} className="modal-backdrop"></div>
                <div className='modal-holder'>
                    <div className='modal-text-holder1-side'>
                            <div className='mSide1'>
                                <div className='userIconHolder'>
                                    <i onClick={(e) => handleProfileClick(e)} className="fa-regular fa-user" id="userIconside"></i>
                                    <p onClick={(e) => handleProfileClick(e)} className='userTextside'>Profile</p>
                                </div>
                            </div>
                        </div>
                        <div className='modal-text-holder1-side'>
                            <div className='userLine'></div>
                            <div className='mSide2'>
                                <p onClick={handleLogoutClick} className='modal-text1B-side'>Sign Out</p>
                                <p className='modal-text1-side'>{email}</p>
                            </div>
                        </div>
                </div>
                    
            </ModalSide>
        </>
        );
    }
}

export default SidebarModal;