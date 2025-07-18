import React from 'react'
// import { Link, useNavigate } from "react-router-dom";
import { Table } from 'antd'
// import Password from 'antd/es/input/Password';
const Profile = () => {
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
    email: 'shresthasamit40@gmail.com',
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
        <p>Here you can view and edit your profile information.</p>
        
<Table dataSource={dataSource} columns={columns} />;
    </div>
  )
}

export default Profile
