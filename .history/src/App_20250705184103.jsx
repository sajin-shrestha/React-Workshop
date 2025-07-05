import React, {useEffect, useState} from 'react'

const App = () => {
  const [user, setUser] = useState('John Doe');
  useEffect(() =>{
    fetch('https://jsonplaceholder.typicode.com/users')
    .then((response => response.json()))
    .then((json => (
      console.log(json),
      setUser(json)
      )))
  },[])
  return (
    <div>
      <h1>Hello NEpal I am coming</h1>
      <p>{user}</p>
    </div>
  )
}

export default App
