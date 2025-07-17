import { createBrowserRouter, Navigate } from 'react-router-dom'
import RootLayout from './layout/RootLayout'
import Home from './pages/profile'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/Register'
import Complains from './pages/Complains'
import ErrorPage from './pages/ErrorPage'  // import it

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
    errorElement: <ErrorPage />,  // add this line here
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'complain',
        element: <Complains />,
      },
    ],
  },
  // Optional: fallback for unmatched routes at root level
  {
    path: '*',
    element: <Navigate to="/" />,
  },
])

export default router
