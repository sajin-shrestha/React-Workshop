import { createBrowserRouter, Navigate } from 'react-router-dom'
import RootLayout from './layout/RootLayout'
import Home from './pages/Home'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import Complains from './pages/Complains'
import Profile from './pages/Profile'


// for page switching
const router = createBrowserRouter([
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/signup',
    element: <SignupPage />,
  },
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'complain',
        element: <Complains />,
      },
      {
        path: 'profile',
        element: <Profile />,
      },
    ],
  },
])

export default router