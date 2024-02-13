import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import './LoginForm.css';

import * as sessionActions from '../../store/session';

function LoginForm() {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  
  if (sessionUser) {
    return <Navigate to="/" replace={true} />
  } else {
    
  }

  const handleSubmit = (e) => {
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

  return (
    <>
      <h1 className="loginPlain">Log In</h1>
      <div className='loginPadding'></div>
      <form onSubmit={handleSubmit}>
        <ul>
          {errors.map(error => <li key={error}>{error}</li>)}
        </ul>
        <label>
          <p className="loginPlain">Email:  </p> 
          <input className='loginInput'
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <label>
            <p className="loginPlain">Password:  </p>  
            <input className='loginInput'
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />
        </label>
        <div className='loginPadding'></div>
        <button className="loginButton" type="submit">Log In</button>
        <div className='loginPadding'></div>
        <button className="loginButton" onClick={handleDemo}>Demo User</button>
      </form>
    </>
  );
}

export default LoginForm;