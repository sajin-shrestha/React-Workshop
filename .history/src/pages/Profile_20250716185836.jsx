import React from 'react'
// import { Link, useNavigate } from "react-router-dom";
import { Table } from 'antd'
const Profile = () => {
    const dataSource = [
  {
    key: '1',
    name: 'Mike',
    age: 32,
    address: '10 Downing Street',
  },
  {
    key: '2',
    name: 'John',
    age: 42,
    address: '10 Downing Street',
  },
];

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Age',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'address',
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
