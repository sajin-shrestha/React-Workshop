import './login.css';
const LoginPage = () => {
  return (
    <div className="container">
    <h2>LoginPage</h2>
    <label htmlFor="name">Name:</label>
    <input type="text" name="name" id="name" placeholder="enter your name" /> <br /><br />
    <label htmlFor="password">Password:</label>
    <input type="password" name="password" id="password" placeholder="enter password"/> <br /> <br />

    <a href="">Forgret Pasword?</a>

    <button>Login</button>
    <p>Don't have an account? <a href="">Signup here</a></p>
    </div>

    
  )
}

export default LoginPage