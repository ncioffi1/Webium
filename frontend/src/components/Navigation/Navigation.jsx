


import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation(){
    const sessionUser = useSelector(state => state.session.user);
  
    const sessionLinks = sessionUser ? (
        <>
            <li>
                <ProfileButton user={sessionUser} />
            </li>
        </>
      ) : (
        <>
          <li>
            <NavLink className="navEle" to="/login">Log In</NavLink>
          </li>
          <li>
            <NavLink className="navEle" to="/signup">Sign Up</NavLink>
          </li>
        </>
      );
           
  
    return (
      <ul>
        <li>
          <NavLink className="navEle" to="/">Home</NavLink>
        </li>
        {sessionLinks}
      </ul>
    );
  }
  
  export default Navigation;