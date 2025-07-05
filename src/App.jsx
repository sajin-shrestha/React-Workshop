import React, { useState, useEffect } from 'react';
import './index.css'; 

const App = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((res) => res.json())
      .then((data) => setUsers(data));
  }, []);

  return (
    <div className="user-container">
      <h2>User List</h2>
      <ul className="user-list">
        {users.map((user) => (
          <li key={user.id} className="user-card">
            <h3>{user.name}</h3>
            <p>{user.email}</p>
            <p><em>{user.company.name}</em></p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
