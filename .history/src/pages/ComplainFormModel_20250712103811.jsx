import { useState } from 'react'
import { Button, Modal, Form, Input, message, Upload } from 'antd'
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons'
import axios from 'axios'

const getBase64 = (img, callback) => {
  const reader = new FileReader()
  reader.addEventListener('load', () => callback(reader.result))
  reader.readAsDataURL(img)
}

const beforeUpload = (file) => {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'
  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!')
  }
  const isLt2M = file.size / 1024 / 1024 < 2
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!')
  }
  return isJpgOrPng && isLt2M
}

const ComplainFormModal = () => {
  const [loading, setLoading] = useState(false) // to track api calling process
  const [isModalOpen, setIsModalOpen] = useState(false)
  const token = localStorage.getItem('accessToken')
const[imageFile, setImageFile] = useState(null)
  const [imageUrl, setImageUrl] = useState()

  const handleChange = (info) => {
    if (info.file.status === 'uploading') {
      setLoading(true)
      return
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, (url) => {
        setLoading(false)
        setImageUrl(url)
      })
    }
  }
  const uploadButton = (
    <button
      style={{ border: 0, background: 'none' }}
      type="button"
    >
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </button>
  )

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
    setLoading(true)

    try {
      const res = await axios.post(
        'https://egov-backend.vercel.app/api/file/complain',
        values,
      )
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
            <Upload listType='picture-card'
            >
                <button> style={{}}</button>
              {imageUrl ? (
                <img
                  src={imageUrl}
                  alt="avatar"
                  style={{ width: '100%' }}
                />
              ) : (
                uploadButton
              )}
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