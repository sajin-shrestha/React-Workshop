import React, {useEffect, useState} from 'react'

const App = () => {
  const [users, setUser] = useState([]);
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
      <div>
      <ul>
        {
          users.map((user)=>(
            <div key={user.id} id='card'>
            <li>Name :{user.name}</li> 
            <li>Email:{user.email}</li>
            <li>Phone:{user.phone}</li>
            <li>Company:{user.company.name}</li>
            <li>Address:{user.address.city}</li>
            </div>
          ))
        }
      </ul>
    </div>
    </div>
  )
}

export default App
