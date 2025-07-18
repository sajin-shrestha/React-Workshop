// import React, {useEffect, useState} from 'react'
import { RouterProvider } from 'react-router-dom'
import router from './routes'
import Cards1 from './Cards1'
import './App.css'
const App = () => {
 
  return (
   
    <RouterProvider router={router} />
 
    // <div>
       // {/* <Cards1 /> */}
    // </div>
  )
}

export default App
