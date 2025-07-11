import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, Form, Input, Button, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';



// const LoginPage = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');

//   return (
    
//     <div className="form-container">
//       <h2>Login</h2>
//       <form>
//         <input 
//           type="email" 
//           placeholder="Email" 
//           value={email} 
//           onChange={(e) => setEmail(e.target.value)}
//         />
//         <input 
//           type="password" 
//           placeholder="Password" 
//           value={password} 
//           onChange={(e) => setPassword(e.target.value)}
//         />
//         <button type="submit">Login</button>
//         <p>Don't have an account?</p>
//       </form>
//     </div>
//   );
// }

// export default LoginPage


const LoginPage = () => {
const [loading, setLoading] = useState(false); //to track api loading
const navigate = useNavigate(); // to navigate after login
const onFinish = async(values) => {
  setLoading(true);

  try{
    const res = await axios.post('https://egov-backend.vercel.app/api/users/login', values);
    // Handle successful login, e.g., store token, redirect, etc.
  
  const {accessToken} = res.data.accessToken;
  localStorage.setItem('accessToken', accessToken);

  navigate('/'); // Redirect to home page after successful login

  message.success('Login successful');
  } catch (error) {
    console.error('error');
    message.error('Login failed. Please try again.');
  } finally {
    setLoading(false); // Reset loading state
  }
  
}
  return (
    
    <Card title="Login" >
<Form onFinish={onFinish}>


  {/* email */}
<Form.Item
 label="Email"
 name="email"
 required>
  <Input placeholder=""></Input>
  </Form.Item>


  {/* password */}
  <Form.Item
  label="Password"
  name="password"
  required> 
  <Input.Password placeholder=""></Input.Password>
  </Form.Item>


  {/* submit button */}
  <Form.Item>
    <Button type="primary" htmlType="submit" loading={loading}>
      Login
    </Button>
  </Form.Item>






</Form>




    </Card>
   
  );
}

export default LoginPage

