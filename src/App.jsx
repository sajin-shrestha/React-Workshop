import React, { useState, useEffect } from "react";

function App() {
  const [users, setUsers] = useState([]); // Step 1: Create a state for users

  useEffect(() => {
    // Step 2: Fetch data when component loads
    fetch("https://jsonplaceholder.typicode.com/users")
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
          <li key={user.id}>
            {user.name} - {user.email}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
