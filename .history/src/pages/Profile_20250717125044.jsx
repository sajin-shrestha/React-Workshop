import React from 'react'
import { useState } from 'react';
// import { Link, useNavigate } from "react-router-dom";
import { Table, message, Button } from 'antd'
import axios from 'axios';
// import Password from 'antd/es/input/Password';
const [loading, setLoading] = useState(false); // to track api calling process
const Profile = () => {
    const show = async(values)  =>{
    setLoading(true);
  try {
        const res = await axios.post(
          "https://egov-backend.vercel.app/api/users/profile",
          values
        );
        const { accessToken } = res.data;
        localStorage.setItem("accessToken", accessToken);
  
        // navigate("/");
  
        message.success("login Successful");
      } catch (err) {
        console.error(err);
        message.error("Login unsuceessful");
      } finally {
        setLoading(false);
      }
    };
    const dataSource = [
  {
    key: '1',
    username: 'Mike',
    email: 'shresthasamit40@gmail.com',
    Password: '12345678',
},
  {
    key: '2',
    username: 'james',
    email: 'james_2020@gmail.com',
    Password: '12345678',
  },
];

const columns = [
  {
    title: 'Username',
    dataIndex: 'username',
    key: 'username',
  },
  {
    title: 'Email',
    dataIndex: 'email',
    key: 'email',
  },
  {
    title: 'Password',
    dataIndex: 'password',
    key: 'password',
  },
];
  return (
    <div>
      <h2>Profile page for Login User Dashboard</h2>
      <Button onClick={show} loading={loading}>View Profile</Button>
        <p>Here you can view and edit your profile information.</p>
        
<Table dataSource={dataSource} columns={columns} />;
    </div>
  )
}

export default Profile
