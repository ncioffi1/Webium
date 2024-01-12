import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import * as sessionActions from "../../store/session";
import './SignupForm.css';

function SignupForm() {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);

  if (sessionUser) return <Navigate to="/" replace={true}/>;

  const handleSubmit = (e) => {
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

  return (
    <>
      <h1 className="signupPlain">Sign Up</h1>
      <div className="signupPadding"></div>
      <form onSubmit={handleSubmit}>
        <ul className="signupErrors">
          {errors.map(error => <li key={error}>{error}</li>)}
        </ul>
        <div className="signupPadding"></div>
        <label>
          <p className="signupPlain">Email</p>
          <div className="pad">
            <input className="signupInput"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
        </label>
        <label>
          <p className="signupPlain">Name</p>
          <div className="pad">
            <input className="signupInput"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
        </label>
        <label>
        <p className="signupPlain">Password</p>
        <div className="pad">
          <input className="signupInput"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        </label>
        <label>
          <p className="signupPlain">Confirm Password</p>
          <div className="pad">
            <input className="signupInput"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
        </label>
        <div className="signupPadding"></div>
        <div className="pad">
          <button className="signupButton" type="submit">Sign Up</button>
        </div>
      </form>
    </>
  );
}

export default SignupForm;