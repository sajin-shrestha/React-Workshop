import { createBrowserRouter, Navigate } from 'react-router-dom'
import RootLayout from './layout/RootLayout'
import Home from './pages/Home'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import Complains from './pages/Complains'
import Profile from './pages/Profile'

// Protected Route component
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('accessToken')
  return token ? children : <Navigate to="/login" replace />
}

// Public Route component (redirect to home if already logged in)
const PublicRoute = ({ children }) => {
  const token = localStorage.getItem('accessToken')
  return token ? <Navigate to="/" replace /> : children
}

// for page switching
const router = createBrowserRouter([
  {
    path: '/login',
    element: (
      <PublicRoute>
        <LoginPage />
      </PublicRoute>
    ),
  },
  {
    path: '/signup',
    element: (
      <PublicRoute>
        <SignupPage />
      </PublicRoute>
    ),
  },
  {
    path: '/',
    element: (
      <ProtectedRoute>
        <RootLayout />
      </ProtectedRoute>
    ),
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
