import React, { useState } from 'react';
import { Modal } from 'antd';
import { Card, Form, Input, Button, message } from "antd";
import axios from "axios";
import { Link} from "react-router-dom";
const ComplainFormModel = () => {
     const [loading, setLoading] = useState(false); // to track api calling process
  const [isModalOpen, setIsModalOpen] = useState(false);
  const token = localStorage.getItem('accessToken')

//   const navigate = useNavigate();
  const onFinish = async (values) => {
    setLoading(true);

    try {
      const res = await axios.post(
        "https://egov-backend.vercel.app/api/file/complain",
        values
      );
      const { accessToken } = res.data;
      localStorage.setItem("accessToken", accessToken);

    //   navigate("/");

    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
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
        <Form onFinish={onFinish}>
          {/* for email */}
          <Form.Item label="Subject" name="subject" required>
            <Input placeholder="subject" />
          </Form.Item>
          {/* for password */}
          <Form.Item label="Description" name="description" required>
            <Input placeholder="description" />
          </Form.Item>
          <Form.Item label="Category" name="category" required>
            <Input placeholder="category" />
          </Form.Item>
          {/* for submit button */}
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading}>
              Add Complain
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
export default ComplainFormModel
