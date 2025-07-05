import React, { useState, useEffect } from 'react';
import './index.css';
// import UserFound from './UserFound';
// import UserNotFound from './UserNotFound';

const UserFound = ({users}) => {
  return (
    <div className='user-grid'>
    {users.map(user => (
        <div key={user.id} className='user-card'>
            <h2>{user.name}</h2>
            <p>
                <strong>Username:</strong> {user.username}
            </p>
            <p>
                <strong>Email:</strong> <a href={`mailto:${user.email}`}>{user.email}</a>
            </p>
            <p>
                <strong>Phone:</strong> {user.phone}
            </p>
            <p>
                <strong>Website:</strong> <a href={`http://${user.website}`} target="_blank">{user.website}</a>
            </p>
        </div>
    ))}
</div>
  )
}

const UserNotFound = () => {
    return (
        <p>No users found.</p>
    )
}

function Assignment() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setError('');
        setLoading(true);

        const response = await fetch('https://jsonplaceholder.typicode.com/users?_limit=6');

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setUsers(data);
      } catch (e) {
        console.error("Error fetching users:", e);
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) {
    return (
      <div className='loading-container'>
        <h2>Loading user data...</h2>
        <p>Please wait.</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className='error-container'>
        <h2>Error: Failed to load user data</h2>
        <p>{error}</p>
        <p>Could not retrieve user information. Please try again later.</p>
      </div>
    );
  }

  return (
    <div className='container'>
      <h1>
        Limited User Directory (6 Users)
      </h1>
      {users.length > 0 ? <UserFound users={users} /> : <UserNotFound /> }
    </div>
  );
}

export default Assignment;