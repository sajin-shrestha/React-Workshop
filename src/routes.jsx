import { createBrowserRouter } from "react-router-dom";
import RootLayout from "./layout/RootLayout";
import LoginPage from "./pages/LoginPage";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Complains from "./pages/Complains";

// something
const router = createBrowserRouter([
    {
        path: "/",
        element: <RootLayout />,
        children: [
            {
                path: 'login',
                element: <LoginPage />
            },
            {
                path: 'signup',
                element: <Register />
            },
            {
                index: true,
                element: <Home />
            },
            {
                path: 'complains',
                element: <Complains />
            },
        ],
        
    },
])
export default router;
