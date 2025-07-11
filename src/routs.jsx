import {createBrowserRouter} from 'react-router-dom';
import RootLayout from './layout/RootLayout';
import Home from './pages/Home';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';

const router = createBrowserRouter([
                {
                path: 'login',
                element: <LoginPage />

            },
            {
                path: 'signup',
                element: <SignupPage />
            },
    {
        path: '/',
        element: <RootLayout />,
        children: [

            {
                index: true,
                element: <Home />
            }
        ]
    }
])
export default router;