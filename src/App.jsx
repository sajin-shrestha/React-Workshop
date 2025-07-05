import React, { useEffect, useState } from 'react'
import './App.css'

const App = () => {
  const [users, setUsers] = useState([])

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((res) => res.json())
      .then((data) => {
        setUsers(data)
       })
       .catch((error) => {
         console.error('Error fetching users:', error)
       })
  },[])   

  return (
    <div className="app-container">
     

      <main className="main-content">
        <div className="users-grid">
          {users.map((user) => (
            <div key={user.id} className="user-card">
              <div className="user-header">
                <h3 className="user-name">{user.name}</h3>
                <span className="user-id">#{user.id}</span>
              </div>
              <div className="user-details">
                <div className="detail-row">
                  <span className="detail-label">Username:</span>
                  <span className="detail-value">@{user.username}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Email:</span>
                  <span className="detail-value">{user.email}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Phone:</span>
                  <span className="detail-value">{user.phone}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Website:</span>
                  <span className="detail-value">{user.website}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Company:</span>
                  <span className="detail-value">{user.company.name}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">City:</span>
                  <span className="detail-value">{user.address.city}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}

export default App