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
      <ul>
        {
          users.map((user)=>(
            <div key={user.id}>
            Name : <li>{user.name}</li>
            Email:<li>{user.email}</li>
            Phone:<li>{user.phone}</li>
            Company:<li>{user.company.name}</li>
            Address:<li>{user.address.city}</li>
            </div>
          ))
        }
      </ul>
    
    </div>
  )
}

export default App
