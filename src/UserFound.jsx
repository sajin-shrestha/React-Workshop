import React from 'react'
import './index.css'

const UserFound = ({users}) => {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat', gap: '25px' }}>
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

export default UserFound