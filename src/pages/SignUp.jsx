import React, { useState } from 'react'
import { Card ,Form, Input, Button, message, notification} from 'antd'
import axios from 'axios'
import { useNavigate, Link } from 'react-router-dom'

const SignUp = () => {
  
    const [loading,setLoading]=useState(false) //to track api calling process
    const navigate= useNavigate()
   
    const onFinish= async(values) => {
        setLoading(true)

        try{
            const res=await axios.post('https://egov-backend.vercel.app/api/users/register',values,)
        console.log(res)
        navigate('/login')
      
        message.success('login successful')
        notification.success('login successful')}
        catch(err){
            console.log(err)
            message.error('Login unsuccesssful')
            notification.error('Login unsuccesssful')
        }
        finally{
        setLoading(false)
        }
    }

     return (
    <Card title="Signup Page">

        <Form onFinish={onFinish}>
          <Form.Item label='username' name='username' required>
            <Input placeholder='username'/>
          </Form.Item>
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
            <Button type='primary' htmlType='submit'>Register</Button>
        </Form.Item>
         </Form>

         
    </Card>
   
  )
}

export default SignUp
