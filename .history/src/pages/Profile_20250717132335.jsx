import React, { useEffect } from 'react'
import { useState } from 'react';
// import { Link, useNavigate } from "react-router-dom";
import { Table, message, Button } from 'antd'
import axios from 'axios';
import Password from 'antd/es/input/Password';
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
const Profile = () => {
    const [loading, setLoading] = useState(false); // to track api calling process
    const [data, setDatasource] = useState([]);
      const token = localStorage.getItem('accessToken')
    const ViewProfile = async()  =>{
    setLoading(true);
        try {
          const res = await axios.get(
          'https://egov-backend.vercel.app/api/users/profile',
          {
            headers:{
              Authorization : `Bearer ${token}`
            },
          },
        );
      setDatasource([res.data.user]);
      console.log([res.data.user]);
        // navigate("/");
  
        message.success("data stored Successful");
      } catch (err) {
        console.error(err);
        message.error("data stored unsuceessful");
      } finally {
        setLoading(false);
      }
    };
    // const click = ()=>{
    //   console.log("Button clicked");
    //   // ViewProfile();

    // }
    // useEffect(()=>{
    //   click();
    // },[])
  return (
    <div>
      <h2>Profile page for Login User Dashboard</h2>
      <Button onClick={ViewProfile} loading={loading}>View Profile</Button>
        <p>Here you can view and edit your profile information.</p>
        
<Table dataSource={data} columns={columns} loading={loading}/>;
    </div>
  )
}

export default Profile
