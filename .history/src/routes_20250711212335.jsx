

import {createBrowserRouter} from 'react-router-dom'
import RootLayout from './layout/RootLayout'
import Home from './pages/Home'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'

const router = createBrowserRouter([
    {
        path:'/',
        element: <RootLayout />,
        children:[
           {
            path:'/login',
            element: <LoginPage />,
           },
           {
            path:'/signup',
            element: <SignupPage />,
           },
           {
            path:'home',
            element: <Home />
           }

        ]
    },
])

export default router