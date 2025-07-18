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
    <div>
      <Flex
      wrap="wrap"
      align="center"
        justify="end"
        style={{ margin: "5px 5px", flexDirection: "column" }}
      >
        <h2>Profile page for Login User Dashboard</h2>
        <p>Here you can view and edit your profile information.</p>
      </Flex>
      <Table dataSource={data} columns={columns} loading={loading} />;
    </div>
  );
};

export default Profile;
