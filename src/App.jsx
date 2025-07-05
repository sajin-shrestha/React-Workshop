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
    <div className="usercontainer">
      <h2>User List</h2>
      <ul className="userlist">
        {users.map((user) => (
     <li className="usercard">
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
