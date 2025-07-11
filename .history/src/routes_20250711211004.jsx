

import {createBrowserRouter} from 'react-router-dom'
import RootLayout from './layout/RootLayout'
import Home from './pages/Home'

const router = createBrowserRouter([
    {
        path:'/',
        element: <RootLayout />,
    },
])

export default router