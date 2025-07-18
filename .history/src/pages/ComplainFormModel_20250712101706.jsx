import React, { useState } from 'react';
import { Modal } from 'antd';
import { Card, Form, Input, Button, message } from "antd";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
const ComplainFormModel = () => {
     const [loading, setLoading] = useState(false); // to track api calling process
  const navigate = useNavigate();
  const onFinish = async (values) => {
    setLoading(true);

    try {
      const res = await axios.post(
        "https://egov-backend.vercel.app/api/users/login",
        values
      );
      const { accessToken } = res.data;
      localStorage.setItem("accessToken", accessToken);

      navigate("/");

      message.success("login Successful");
    } catch (err) {
      console.error(err);
      message.error("Login unsuceessful");
    } finally {
      setLoading(false);
    }
  };
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <>
        <Button type="primary" style={{margin:'16px 24px'}} onClick={showModal}>Add Complain</Button>

      <Modal
        title="Basic Modal"
        closable={{ 'aria-label': 'Custom Close Button' }}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <Card title="Login">
        <Form onFinish={onFinish}>
          {/* for email */}
          <Form.Item label="Email" name="email" required>
            <Input placeholder="email" />
          </Form.Item>
          {/* for password */}
          <Form.Item label="Password" name="password" required>
            <Input placeholder="password" />
          </Form.Item>
          {/* for submit button */}
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading}>
              Login
            </Button>
          </Form.Item>
        </Form>
        </Card>
      </Modal>
    </>
  );
};
export default ComplainFormModel
