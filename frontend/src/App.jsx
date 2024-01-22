import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux';
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import LoginForm from './components/session/LoginForm'
import SignupForm from './components/session/SignupForm';
import { Outlet, createBrowserRouter, RouterProvider, useParams } from 'react-router-dom';
import WebiumBrowser from './components/WebiumBrowser';
import Navigation from './components/Navigation/Navigation';
import * as sessionActions from './store/session';
import Article from './components/Article/ArticleForm';
import CreateForm from './components/Article/CreateForm';
import EditForm from './components/Article/EditForm';
import UserPage from './components/UserPage';

function Layout() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const paramId = useParams();

  useEffect(() => {
    dispatch(sessionActions.restoreSession()).then(() => {
      setIsLoaded(true)
    });
  }, [dispatch]);

  return (
    <>
      {/* <Navigation /> */}
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
      },
      {
        path: `/articles/:articleId`,
        element: <Article />
      },
      {
        path: `/articles/new`,
        element: <CreateForm />
      },
      {
        path: `/articles/:articleId/edit`,
        element: <EditForm />
      },
      {
        path: `/users/:userId`,
        element: <UserPage />
      }
    ]
  }
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
