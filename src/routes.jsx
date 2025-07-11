import { createBrowserRouter } from "react-router-dom";
import RootLayout from "./layout/RootLayout";
import LoginPage from "./pages/LoginPage";
import Register from "./pages/Register";
import Home from "./pages/Home";

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
            }
        ]
    }
]);
export default router;
