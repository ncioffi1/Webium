import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux';
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import LoginForm from './components/session/LoginForm'
import SignupForm from './components/session/SignupForm';
import { Outlet, createBrowserRouter, RouterProvider } from 'react-router-dom';
import WebiumBrowser from './components/WebiumBrowser';
import Navigation from './components/Navigation/Navigation';
import * as sessionActions from './store/session';

function Layout() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(sessionActions.restoreSession()).then(() => {
      setIsLoaded(true)
    });
  }, [dispatch]);

  // NOTE: 
  // need a Demo Login Button ...
  return (
    <>
      <Navigation />
      {isLoaded && <Outlet />}
    </>
  );
}

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <WebiumBrowser />
        // element: <h1>Welcome!</h1>
      },
      {
        path: '/login',
        element: <LoginForm />
      },
      {
        path: '/signup',
        element: <SignupForm />
      }
    ]
  }
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
