import React, { useEffect } from "react";
import { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
import { Flex, Table, message, Tag } from "antd";
import axios from "axios";
const columns = [
  {
    title: "ID",
    dataIndex: "_id",
    key: "_id",
  },
  {
    title: "Username",
    dataIndex: "username",
    key: "username",
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
  },
  {
    title: "Role",
    dataIndex: "role",
    key: "role",
    render: (text) => <Tag color={text === "admin" ? "red" : "blue"} style={{alignItems:'center', textAlign:'center'}}>{text}</Tag>,
  },
  {
    title: "Date",
    dataIndex: "createdAt",
    key: "createdAt",
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    render: () => <Tag color={"green"}>Active</Tag>,
  },
];
const Profile = () => {
  const [loading, setLoading] = useState(false); // to track api calling process
  const [data, setDatasource] = useState([]);
  const token = localStorage.getItem("accessToken");
  const ViewProfile = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        "https://egov-backend.vercel.app/api/users/profile",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
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

  useEffect(() => {
    ViewProfile();
  }, []);
  return (
    <div id="Profile" style={{ padding: "20px", backgroundColor: "#f0f0f0", borderRadius: "10px", boxShadow: "0 2px 10px rgba(0, 0, 0, 0.4)" , margin: '20px'}}>
      <Flex
      wrap="wrap"
      align="center"
        justify="end"
        style={{ margin: "5px 5px", flexDirection: "column" }}
      >
        <h2 style={{ padding:'15px 0'}}>Login User Dashboard</h2>
        <p style={{ textAlign:'center', color:'gray', fontSize:'14px', padding:'0 0 10px 0'}}>Here you can view your profile information.</p>
      </Flex>
      <Table dataSource={data} columns={columns} loading={loading} bordered/>
    </div>
  );
};

export default Profile;
