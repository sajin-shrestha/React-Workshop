import React, {useEffect} from 'react'

const App = () => {
  useEffect(() =>{
    fetch('https://jsonplaceholder.typicode.com/todos/1')
    .then((response => response.json()))
    .then((json => console.log(json)))
  },[])
  return (
    <div>
      <h1>Hello NEpal I am coming</h1>

    </div>
  )
}

export default App
