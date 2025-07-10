import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Register from './pages/Register';
import LoginPage from './pages/LoginPage'
import React, { useEffect, useState } from 'react'
import './App.css'
import UserData from './Task1_UserData-into-Card'

const App = () => {
 
//  return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<Navigate to="/login" />} />
//         <Route path="/login" element={<LoginPage />} />
//         <Route path="/register" element={<Register />} />
//       </Routes>
//     </Router>
//   );

return(
  <>
  <LoginPage />
  <Register />
  </>
)
  
}

export default App

