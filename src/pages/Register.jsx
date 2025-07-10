// import LoginPage from './LoginPage.jsx'


const Register = () => {
  return (
    <div className="container">
    <h2>Register</h2>
    <label htmlFor="name">Name:</label>
    <input type="text" name="name" id="name" placeholder='Enter your name' required /><br />
    <label htmlFor="email">Email</label>
    <input type="email" name="email" id="email" placeholder='Enter your email' /><br />
    <label htmlFor="address">Address:</label>
    <input type="text" name="address" id="address"  /><br />
    <label htmlFor="password">Password:</label>
    <input type="password" name="password" id="password" /><br />
    <button>Submit</button>
    <p>Already have an account? <a href='LoginPage'>Login Here</a></p>

    </div>
  )
}

export default Register