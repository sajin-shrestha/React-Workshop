import { useState } from 'react'
import { Button, Modal, Form, Input, Upload, message } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import axios from 'axios'

const ComplainFormModal = () => {
  const [loading, setLoading] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const token = localStorage.getItem('accessToken')
  const [imageFile, setImageFile] = useState(null)

  const props = {
    beforeUpload: (file) => {
      setImageFile(file)
      return false
    },
    onRemove: () => setImageFile(null),
    showUploadList: imageFile ? [imageFile] : [],
  }

  const showModal = () => setIsModalOpen(true)
  const handleCancel = () => setIsModalOpen(false)

  const onFinish = async (values) => {
    const formData = new FormData()
    formData.append('subject', values.subject)
    formData.append('description', values.description)
    formData.append('category', values.category)

    if (imageFile) formData.append('image', imageFile)

    setLoading(true)

    try {
      await axios.post('https://egov-backend.vercel.app/api/file/complain', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      })
      message.success('Complaint added successfully')
      setIsModalOpen(false)
      setImageFile(null)
    } catch (error) {
      console.error(error)
      message.error('Failed to add complaint')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Button type="primary" onClick={showModal}>
        Add Complain
      </Button>
      <Modal title="Complain Form" open={isModalOpen} onCancel={handleCancel} footer={null}>
        <Form onFinish={onFinish} layout="vertical">
          <Form.Item label="Subject" name="subject" required rules={[{ required: true, message: 'Please input subject!' }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Description" name="description" required rules={[{ required: true, message: 'Please input description!' }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Category" name="category" required rules={[{ required: true, message: 'Please input category!' }]}>
            <Input />
          </Form.Item>
          <Form.Item>
            <Upload {...props} listType="picture-card">
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
  )
}

export default ComplainFormModal
