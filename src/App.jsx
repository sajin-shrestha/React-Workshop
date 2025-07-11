import { RouterProvider } from "react-router-dom"
import router from "./routes"


const App = () => {
 
  return <RouterProvider router={router}/>

  
}

export default App



/**
 * in terminal:
 * npm i react-router-dom
 * npm i axios
 * npm install antd --save (ant design)
  then commit and push it in git in own branch
 
 */