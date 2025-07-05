import React, {useEffect, useState} from 'react'

const App = () => {
  const [users, setUser] = useState('John Doe');
  useEffect(() =>{
    fetch('https://jsonplaceholder.typicode.com/users')
    .then((response => response.json()))
    .then((json => 
      // console.log(json),
      setUser(json)
      ))
  },[])
  return (
    <div>
      <h1>Hello NEpal I am coming</h1>
      {/* <p>{user.name}</p> */}
      {/* <ul>
        {
          users.map((user)=>(
            <li key={user.id}>{user.name}</li>
          ))
        }
      </ul> */}
      <ul>
        {" "}
        {users.map((user) => (
          <li key={user.id}>{user.name}</li>
        ))}
        {/* <h1>i</h1> */}
      </ul>
    </div>
  )
}

export default App
