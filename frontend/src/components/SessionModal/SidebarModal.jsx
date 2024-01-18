import { useState, useEffect, useRef, createRef  } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import ModalSide from '../Modal/ModalSide';
import Modal from '../Modal/Modal';

import * as sidemodalActions from '../../store/sidemodals.js'
import * as sessionActions from '../../store/session.js';

function SidebarModal() {

    const sessionUser = useSelector(state => state.session.user);
    const dispatch = useDispatch();
    const sidemodalType = useSelector(state => state.sidemodals.type);
    const [email, setEmail] = useState("");

    let modalRef = createRef();

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
        console.log("clicked");
        document.removeEventListener('click', handleHide, {capture: true});
        dispatch(sidemodalActions.hideSidebarModal());
    }

    if (!sidemodalType) {
        return null;
    } else {
        return (
        <>
            <ModalSide>
                <div ref={modalRef} className="modal-backdrop"></div>
                <div className='modal-text-holder1-side'>
                    <p onClick={handleLogoutClick} className='modal-text1B-side'>Sign Out</p>
                    <p className='modal-text1-side'>{email}</p>
                </div>
            </ModalSide>
        </>
        );
    }
}

export default SidebarModal;