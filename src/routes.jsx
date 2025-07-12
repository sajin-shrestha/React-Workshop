//something

import { createBrowserRouter,Navigate } from "react-router-dom";
import RootLayout  from "./layout/RootLayout";
// import { SignUp } from "./pages/SignUp";    
import { Home } from "./pages/Home";   
import Login from "./pages/Login"; 
import SignUp from "./pages/SignUp";
// for page switching
const router= createBrowserRouter([
      {
            path: 'login',
            element: <Login/>,
        },
         {
            path: 'signup',
            element: <SignUp/>,
        },
    {
    path: '/',
    element: <RootLayout/>,
    children: [
        {
           index: true,
           element: <Home/>
        },
    ]

    },
])
export default router