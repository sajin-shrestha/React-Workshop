import { Card, Descriptions, Spin, message, Button, Modal, Form, Input, Upload } from 'antd';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { PlusOutlined } from '@ant-design/icons';

const LOCAL_KEY = 'profileExtraFields';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [form] = Form.useForm();
  const [imageFile, setImageFile] = useState(null);
  const [updating, setUpdating] = useState(false);
  const [extra, setExtra] = useState({});

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('accessToken');
      const res = await axios.get('https://egov-backend.vercel.app/api/users/profile', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      let userObj = res.data.user;
      // Load extra fields from localStorage if present
      const localExtra = JSON.parse(localStorage.getItem(LOCAL_KEY) || '{}');
      setExtra(localExtra);
      setUser(userObj);
      form.setFieldsValue({
        username: userObj.username,
        email: userObj.email,
        firstName: localExtra.firstName || '',
        lastName: localExtra.lastName || '',
        phone: localExtra.phone || '',
        address: localExtra.address || '',
      });
    } catch (error) {
      message.error('Failed to fetch profile');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = () => {
    setEditModalOpen(true);
  };

  const handleEditCancel = () => {
    setEditModalOpen(false);
    setImageFile(null);
  };

  const handleEditFinish = async (values) => {
    setUpdating(true);
    try {
      // Save extra fields to localStorage and state only
      const newExtra = {
        firstName: values.firstName || '',
        lastName: values.lastName || '',
        phone: values.phone || '',
        address: values.address || '',
        image: imageFile ? URL.createObjectURL(imageFile) : extra.image || '',
      };
      setExtra(newExtra);
      localStorage.setItem(LOCAL_KEY, JSON.stringify(newExtra));
      setEditModalOpen(false);
      setImageFile(null);
      message.success('Profile updated locally!');
    } catch (error) {
      message.error('Failed to update profile');
    } finally {
      setUpdating(false);
    }
  };

  const uploadProps = {
    beforeUpload: (file) => {
      setImageFile(file);
      return false;
    },
    onRemove: () => setImageFile(null),
    showUploadList: imageFile ? [imageFile] : [],
  };

  if (loading) return <Spin />;
  if (!user) return null;

  return (
    <Card
      title="Profile"
      style={{ maxWidth: 500, margin: '32px auto' }}
      cover={extra.image ? (
        <img
          alt="profile"
          src={extra.image}
          style={{ width: 120, height: 120, objectFit: 'cover', borderRadius: '50%', margin: '24px auto' }}
        />
      ) : null}
      extra={<Button onClick={handleEdit}>Edit</Button>}
    >
      <Descriptions column={1} bordered>
        <Descriptions.Item label="Username">{user.username}</Descriptions.Item>
        <Descriptions.Item label="Email">{user.email}</Descriptions.Item>
        <Descriptions.Item label="First Name">{extra.firstName || '-'}</Descriptions.Item>
        <Descriptions.Item label="Last Name">{extra.lastName || '-'}</Descriptions.Item>
        <Descriptions.Item label="Phone">{extra.phone || '-'}</Descriptions.Item>
        <Descriptions.Item label="Address">{extra.address || '-'}</Descriptions.Item>
      </Descriptions>
      <Modal
        title="Edit Profile"
        open={editModalOpen}
        onCancel={handleEditCancel}
        footer={null}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleEditFinish}
        >
          <Form.Item label="Username" name="username">
            <Input disabled />
          </Form.Item>
          <Form.Item label="Email" name="email">
            <Input disabled />
          </Form.Item>
          <Form.Item label="First Name" name="firstName">
            <Input />
          </Form.Item>
          <Form.Item label="Last Name" name="lastName">
            <Input />
          </Form.Item>
          <Form.Item label="Phone" name="phone">
            <Input />
          </Form.Item>
          <Form.Item label="Address" name="address">
            <Input />
          </Form.Item>
          <Form.Item label="Profile Image">
            <Upload {...uploadProps} listType="picture-card">
              <button style={{ border: 0, background: 'none' }} type="button">
                <PlusOutlined />
              </button>
            </Upload>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={updating} block>
              Save
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </Card>
  );
};

export default Profile;

