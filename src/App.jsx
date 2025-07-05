import React, { useState, useEffect } from "react";

function App() {
  const [users, setUsers] = useState([]); 

  useEffect(() => {
    
    fetch("https://jsonplaceholder.typicode.com/")
      .then((response) => response.json())
      .then((data) => {
        setUsers(data); 
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
  }, []); 

  return (
    <div>
      <h1>List of Users</h1>
      <ul>
        {users.map((user) => (
          <li >
            {user.name} = {user.email}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;



