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
      {/* <p>{user.name}</p> */}
      <h1 style={{alignItems:'center', textAlign: 'center'}}>Hello NEpal I am coming</h1>
      <div >
      <ul id='container'>
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
