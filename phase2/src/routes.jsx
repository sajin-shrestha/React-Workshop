// src/routes.jsx
import { createBrowserRouter } from 'react-router-dom';
import RootLayout from './layout/RootLayout';
import Profile from './pages/Profile';
import Complains from './pages/Complains';
import Home from './pages/Home';
import LoginPage from './pages/LoginPage';
import Register from './pages/Register';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        index: true,           // ✅ shown at "/"
        element: <Home />,     // ✅ Home is now default
      },
      {
        path: 'profile',       // ✅ shown at "/profile"
        element: <Profile />,
      },
      {
        path: 'complain',
        element: <Complains />,
      },
    ],
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/signup',
    element: <Register />,
  },
]);

export default router;
