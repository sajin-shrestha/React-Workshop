import React, { useState } from 'react';
import { Link } from 'react-router-dom';



const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    
    <div className="form-container">
      <h2>Login</h2>
      <form>
        <input 
          type="email" 
          placeholder="Email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)}
        />
        <input 
          type="password" 
          placeholder="Password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
        <p>Don't have an account?</p>
      </form>
    </div>
  );
}

export default LoginPage



// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';

// function Login() {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     alert(`Logging in with Email: ${email}, Password: ${password}`);
//   };

//   return (
//     <div className="form-container">
//       <h2>Login</h2>
//       <form onSubmit={handleSubmit}>
//         <input type="email" placeholder="Email" value={email}
//           onChange={(e) => setEmail(e.target.value)} required />
//         <input type="password" placeholder="Password" value={password}
//           onChange={(e) => setPassword(e.target.value)} required />
//         <button type="submit">Login</button>
//         <p>Don't have an account? <Link to="/register">Register</Link></p>
//       </form>
//     </div>
//   );
// }

// export default Login;