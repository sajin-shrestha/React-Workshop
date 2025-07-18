import React from 'react'
import { useState } from 'react';
// import { Link, useNavigate } from "react-router-dom";
import { Table, message, Button } from 'antd'
import axios from 'axios';
// import Password from 'antd/es/input/Password';
const Profile = () => {
    const [loading, setLoading] = useState(false); // to track api calling process
    const [dataSource, setDatasource] = useState([]);
    const show = async()  =>{
    setLoading(true);
  try {
        const res = await axios.get(
          'https://egov-backend.vercel.app/api/users/profile',
          {
            headers:{
              Authorization : `Bearer ${localStorage.getItem('accessToken')}`
            }
          }
        );
      setDatasource(res.data.user);
      console.log(res.data.user);
        // navigate("/");
  
        message.success("login Successful");
      } catch (err) {
        console.error(err);
        message.error("Login unsuceessful");
      } finally {
        setLoading(false);
      }
    };
    
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
