
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Modal from '../Modal/Modal';
import { useNavigate, useParams } from 'react-router';

import * as modalActions from '../../store/modals'
import * as sessionActions from '../../store/session';

function SessionModal({ onSuccess }) {
const dispatch = useDispatch();
const modalType = useSelector(state => state.modals.type);
const sessionUser = useSelector(state => state.session.user);

const [email, setEmail] = useState("");
const [name, setName] = useState("");
const [password, setPassword] = useState("");
const [confirmPassword, setConfirmPassword] = useState("");
const [errors, setErrors] = useState([]);

useEffect(() => {
    if (modalType) {
        document.addEventListener("click", handleHide, {capture: true});
    } else {
        document.removeEventListener("click", handleHide, {capture: true});
    }
}, [modalType])

if (!modalType) return null;
// if the modals slice of state looks like { type: null } 
// it will not render a modal
if (sessionUser) {
    dispatch(modalActions.hideModal());  // if you're logged in, turn off modal.
    clearModal();
    document.removeEventListener("click", handleHide, {capture: true});
    return null;
}
// don't render the SessionModal if a user is already logged in

function clearModal() {
    setEmail("");
    setName("");
    setPassword("");
    setConfirmPassword("");
    setErrors([]);
}

 const goBack = (e) => {
    e.preventDefault();
    clearModal();
    dispatch(modalActions.hideModal());
    document.removeEventListener("click", handleHide, {capture: true});
 }

 

const handleContinue = (e) => {
    e.preventDefault();
}

const handleSignup = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      setErrors([]);
      return dispatch(sessionActions.signup({ email, name, password }))
        .catch(async (res) => {
        let data;
        try {
          // .clone() essentially allows you to read the response body twice
          data = await res.clone().json();
        } catch {
          data = await res.text(); // Will hit this case if the server is down
        }
        if (data?.errors) setErrors(data.errors);
        else if (data) setErrors([data]);
        else setErrors([res.statusText]);
      });
    }
    return setErrors(['Confirm Password field must be the same as the Password field']);
};

const handleLogin = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(sessionActions.login({ email, password }))
      .catch(async (res) => {
        let data;
        try {
          // .clone() essentially allows you to read the response body twice
          data = await res.clone().json();
        } catch {
          data = await res.text(); // Will hit this case if, e.g., server is down
        }
        if (data?.errors) setErrors(data.errors);
        else if (data) setErrors([data]);
        else setErrors([res.statusText]);
      });
  };

const handleDemo = (e) => {
    e.preventDefault();
    return dispatch(sessionActions.login({ 
        email: "demoguy@webium.com", password: "password" 
    }));
}

const handleSwitchToLogin = (e) => {
    e.preventDefault();
    clearModal();
    dispatch(modalActions.showModal("login"));
}

const handleSwitchToSignup = (e) => {
    e.preventDefault();
    clearModal();
    dispatch(modalActions.showModal("signup"))
}

function handleHide(e) {
    e.preventDefault();
    console.log(e.target);
    if (e.target.id === 'modal-background') {
        goBack(e);
    }
}

if (!modalType) {
    return null
} else {
 return (
   <Modal >
     <div className="session-modal">
        <div className="iconHolder">
            <i className="fa-solid fa-x" id="xButton" onClick={goBack}></i>
        </div>
        {/* <div className="center">
            <button className='back-button' onClick={goBack}>Back</button>
        </div> */}
        <div className="pad1"></div>
       
       {modalType === "login" ? (
        <>
            <ul className="signupErrorHolder">
                {errors.map(error => <li className="signupErrors" key={error}>{error}</li>)}
            </ul>
            <div className="loginPad6"></div>
            <p className='modalText1'>Log in with email</p>
            <div className="loginPad5"></div>
            <p className='modalText2'>Enter your email address and password to login.</p>
            <div className="loginPad3"></div>

            <p className="modalText3">Email:  </p> 
            <div className='centerer'>
                <input className="signupInput2" 
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
            </div>
            <div className="loginPad4"></div>
            <p className="modalText3">Password:  </p>  
            <div className='centerer'>
                <input className='signupInput2'
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
            </div>
            <div className="loginPad3"></div>
            <div className='centerer'>
                <button onClick={handleLogin} className="button1">Continue</button>
            </div>
            <div className='loginPad2'></div>
            <div className='centerer'>
                <button onClick={handleSwitchToSignup} className="button3">&#10094; Sign Up Instead</button>
            </div>
            <div className='loginPad2'></div>
            <div className='centerer'>
                <button onClick={handleDemo} className="button1">Demo User</button>
            </div>
        </>

       ) : (
        <>
            <ul className="signupErrorHolder">
                {errors.map(error => <li className="signupErrors" key={error}>{error}</li>)}
            </ul>
            <div className="loginPad6"></div>
            <p className='modalText1'>Sign up with email</p>
            <div className="loginPad5"></div>
            <p className='modalText2'>Enter your email address, name, and password to create an account.</p>
            <div className="loginPad3"></div>
                <p className='modalText3'>Your email</p>
                <div className='centerer'>
                    <input className="signupInput2"
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    />
                </div>
            <div className="loginPad4"></div>
                <p className='modalText3'>Your name</p>
                <div className='centerer'>
                    <input className="signupInput2" 
                        type="text" value={name} 
                        onChange={(e) => setName(e.target.value)} required 
                    />
                </div>
            <div className="loginPad4"></div>
                <p className='modalText3'>Your password</p>
                <div className='centerer'>
                    <input className="signupInput2"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    />  
                </div>
            <div className="loginPad4"></div>
                <p className='modalText3'>Confirm password</p>
                <div className='centerer'>
                    <input className="signupInput2"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    />
                </div>
            <div className="loginPad3"></div>
            <div className='centerer'>
                <button onClick={handleSignup} className="button1">Continue</button>
            </div>
            <div className='loginPad2'></div>
            <div className='centerer'>
                <button onClick={handleSwitchToLogin} className="button3">&#10094; Log In Instead</button>
            </div>
            
        </>
        //  <SignupForm onSuccess={onSuccess} />
       )}
     </div>
   </Modal>
    );
   }
}

export default SessionModal;