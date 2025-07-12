import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, Form, Input, Button, message, notification } from 'antd';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


const LoginPage = () => {
const [loading, setLoading] = useState(false); //to track api loading
const navigate = useNavigate() // to navigate after login
const onFinish = async(values) => {
  setLoading(true);

  try{
    const res = await axios.post('https://egov-backend.vercel.app/api/users/login', values,

    )
    // Handle successful login, e.g., store token, redirect, etc.
  
  const {accessToken} = res.data
  localStorage.setItem('accessToken', accessToken);

  navigate('/'); // Redirect to home page after successful login

  message.success('Login successful');
  notification.success('Login successful');
  } catch (err) {
    console.error(err);
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

  <h4>Do You want to signup?
    <Link to = "/register">SignUp
    
    </Link>
  </h4>






    </Card>
   
  );
}

export default LoginPage

