// import React, {useEffect, useState} from 'react'
import { RouterProvider } from 'react-router-dom'
import router from './routes'
import Cards1 from './Cards1'

const App = () => {
 
  return (
    <div>
      <h1>hello</h1>
    <RouterProvider router={router} />
    </div>
    // <div>
       // {/* <Cards1 /> */}
    // </div>
  )
}

export default App
