import React, { useState } from 'react'
import { Card ,Form, Input, Button, message, notification} from 'antd'
import axios from 'axios'
import { useNavigate , Link} from 'react-router-dom'

const Login = () => {
  
    const [loading,setLoading]=useState(false) //to track api calling process
    const navigate= useNavigate()
   
    const onFinish= async(values) => {
        setLoading(true)

        try{
            const res=await axios.post('https://egov-backend.vercel.app/api/users/login',values,)
        const {accessToken}=res.data
        localStorage.setItem('accessToken',accessToken)
        navigate('/')
        message.success('login successful')
        notification.success('login successful')}
        catch(err){
            console.log(err)
            message.err('Login unsuccesssful')
            notification.err('Login unsuccesssful')
        }
        finally{
        setLoading(false)
        }
    }

     return (
    <Card title="Login Page">

        <Form onFinish={onFinish}>
        {/* email */}
        <Form.Item label='Email' name='email' required>
    <Input placeholder='email'/>
        </Form.Item> 
        {/* password */}
        <Form.Item label='Password' name='password' required>
            <Input placeholder='password'/>
        </Form.Item>
        {/* submit button */}
        <Form.Item>
            <Button type='primary' htmlType='submit'>Login</Button>
        </Form.Item>
         </Form>

         <h4>Do you want to signup? <Link to="/signup">SignUp</Link></h4>
    </Card>
   
  )
}

export default Login