import { useState } from 'react'
import { Button, Modal, Form, Input, Upload, message, Select, Divider } from 'antd'
import { LoadingOutlined, PlusOutlined, FileAddOutlined, InboxOutlined } from '@ant-design/icons'
import axios from 'axios'

const { Option } = Select;
const { TextArea } = Input;

const ComplainFormModal = ({ onSuccess }) => {
  const [loading, setLoading] = useState(false) // to track api calling process
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [uploading, setUploading] = useState(false)
  const token = localStorage.getItem('accessToken')
  const [imageFile, setImageFile] = useState(null)
  const [form] = Form.useForm()

  const categories = [
    'Infrastructure',
    'Public Services',
    'Education',
    'Healthcare',
    'Safety & Security',
    'Environment',
    'Transportation',
    'Other'
  ];

  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  const props = {
    beforeUpload: (file) => {
      // Check file type
      const isImage = file.type.startsWith('image/');
      if (!isImage) {
        message.error('You can only upload image files!');
        return Upload.LIST_IGNORE;
      }

      // Check file size (less than 5MB)
      const isLessThan5M = file.size / 1024 / 1024 < 5;
      if (!isLessThan5M) {
        message.error('Image must be smaller than 5MB!');
        return Upload.LIST_IGNORE;
      }

      setImageFile(file);
      return false;
    },
    onRemove: () => {
      setImageFile(null);
      return true;
    },
  };

  const showModal = () => {
    setIsModalOpen(true)
  }

  const handleCancel = () => {
    form.resetFields()
    setImageFile(null)
    setIsModalOpen(false)
  }

  const onFinish = async (values) => {
    const formData = new FormData()

    formData.append('subject', values.subject)
    formData.append('description', values.description)
    formData.append('category', values.category)

    if (imageFile) {
      formData.append('image', imageFile)
    }

    setLoading(true)
    setUploading(true)

    try {
      const res = await axios.post(
        'https://egov-backend.vercel.app/api/file/complain',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,
          },
        },
      )

      message.success('Complain submitted successfully')
      handleCancel()

      // Call the onSuccess callback to refresh the data
      if (onSuccess) {
        onSuccess()
      }
    } catch (err) {
      message.error('Failed to submit complain')
    } finally {
      setLoading(false)
      setUploading(false)
    }
  }

  return (
    <>
      <Button
        type="primary"
        onClick={showModal}
        icon={<FileAddOutlined />}
      >
        Add Complain
      </Button>
      <Modal
        title="Submit a New Complain"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
        width={600}
      >
        <Form
          form={form}
          onFinish={onFinish}
          layout="vertical"
          requiredMark="optional"
        >
          {/* subject  */}
          <Form.Item
            label="Subject"
            name="subject"
            rules={[{ required: true, message: 'Please enter the subject' }]}
          >
            <Input placeholder="Enter the subject of your complain" />
          </Form.Item>
          
          {/* description */}
          <Form.Item
            label="Description"
            name="description"
            rules={[{ required: true, message: 'Please enter the description' }]}
          >
            <TextArea 
              rows={4} 
              placeholder="Please provide detailed information about your complain"
              showCount
              maxLength={500}
            />
          </Form.Item>
          
          {/* category  */}
          <Form.Item
            label="Category"
            name="category"
            rules={[{ required: true, message: 'Please select a category' }]}
          >
            <Select placeholder="Select a category">
              {categories.map(category => (
                <Option key={category} value={category}>{category}</Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item 
            label="Upload Image" 
            name="image"
            valuePropName="fileList"
            getValueFromEvent={normFile}
          >
            <Upload.Dragger
              {...props}
              name="image"
              listType="picture"
              maxCount={1}
              accept="image/*"
            >
              <p className="ant-upload-drag-icon">
                <InboxOutlined style={{ color: 'var(--primary-color)' }} />
              </p>
              <p className="ant-upload-text">Click or drag an image to this area to upload</p>
              <p className="ant-upload-hint" style={{ color: 'var(--text-tertiary)' }}>
                Support for a single image upload. Max size: 5MB
              </p>
            </Upload.Dragger>
          </Form.Item>

          <Divider />

          {/* submit button  */}
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              block
              size="large"
            >
              {uploading ? 'Submitting...' : 'Submit Complain'}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}

export default ComplainFormModal