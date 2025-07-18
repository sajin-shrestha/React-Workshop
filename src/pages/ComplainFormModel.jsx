import { useState } from 'react'
import { Button, Modal, Form, Input, Upload } from 'antd'
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons'
import axios from 'axios'
// import { handleApiFetch } from './Complains' // Assuming this function is exported from Complains.jsx
const ComplainFormModal = () => {
  const [loading, setLoading] = useState(false) // to track api calling process
  const [isModalOpen, setIsModalOpen] = useState(false)
  const token = localStorage.getItem('accessToken')
  const [imageFile, setImageFile] = useState([])

  const props = {
    beforeUpload: (file) => {
      setImageFile(file)
      return false
    },
    onRemove: () => setImageFile(null),
    showUploadList: imageFile ? [imageFile] : [],
  }

  const showModal = () => {
    setIsModalOpen(true)
  }

  const handleOk = () => {
    setIsModalOpen(false)
  }

  const handleCancel = () => {
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
      console.log(res)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Button
        type="primary"
        onClick={showModal}
      >
        Add Complain
      </Button>
      <Modal
        title="Complain Form"
        closable={{ 'aria-label': 'Custom Close Button' }}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form onFinish={onFinish}>
          {/* subject  */}
          <Form.Item
            label="Subject"
            name="subject"
            required
          >
            <Input />
          </Form.Item>
          {/* description */}
          <Form.Item
            label="Description"
            name="description"
            required
          >
            <Input />
          </Form.Item>
          {/* category  */}
          <Form.Item
            label="Category"
            name="category"
            required
          >
            <Input />
          </Form.Item>

          <Form.Item>
            <Upload
              {...props}
              listType="picture-card"
            >
              <button
                style={{ border: 0, background: 'none' }}
                type="button"
              >
                <PlusOutlined />
              </button>
            </Upload>
          </Form.Item>

          {/* submit button  */}
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
            >
              Add complain
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}

export default ComplainFormModal