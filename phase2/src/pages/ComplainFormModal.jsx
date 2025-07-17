import { useState } from 'react';
import { Button, Modal, Form, Input, Upload, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import axios from 'axios';
import './complainform.css';

const ComplainFormModal = ({ refreshComplains }) => {
  const [loading, setLoading] = useState(false); // to track API call process
  const [isModalOpen, setIsModalOpen] = useState(false);
  const token = localStorage.getItem('accessToken');
  const [imageFile, setImageFile] = useState(null);
  const [form] = Form.useForm();


  const uploadProps = {
    beforeUpload: (file) => {
      setImageFile(file);
      return false; // prevent auto upload
    },
    onRemove: () => setImageFile(null),
    fileList: imageFile ? [imageFile] : [],
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    form.resetFields();
    setImageFile(null);
  };

  const onFinish = async (values) => {
    const formData = new FormData();

    formData.append('subject', values.subject);
    formData.append('description', values.description);
    formData.append('category', values.category);

    if (imageFile) {
      formData.append('image', imageFile);
    }

    setLoading(true);

    try {
      await axios.post(
        'https://egov-backend.vercel.app/api/file/complain',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,
          },
        }
      );

      message.success('Complaint added successfully!');
      form.resetFields();
      setImageFile(null);
      setIsModalOpen(false);

      if (refreshComplains) refreshComplains();  // <-- Refresh the list immediately
    } catch (err) {
      console.error(err);
      message.error('Failed to add complaint');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Button type="primary" onClick={showModal}>
        Add Complain
      </Button>
      <Modal
        title="Complain Form"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null} // Use form submit button instead
        destroyOnClose={true}
      >
        <Form
          form={form}
          onFinish={onFinish}
          layout="vertical"
        >
          <Form.Item
            label="Subject"
            name="subject"
            rules={[{ required: true, message: 'Please input the subject!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Description"
            name="description"
            rules={[{ required: true, message: 'Please input the description!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Category"
            name="category"
            rules={[{ required: true, message: 'Please input the category!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item label="Image">
            <Upload {...uploadProps} listType="picture-card" maxCount={1}>
              <div>
                <PlusOutlined />
                <div style={{ marginTop: 8 }}>Upload</div>
              </div>
            </Upload>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading} block>
              Add Complain
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default ComplainFormModal;
