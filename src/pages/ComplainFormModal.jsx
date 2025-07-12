import { useState } from 'react'
import { Button, Modal, Form, Input } from 'antd'
import axios from 'axios'

const ComplainFormModal = () => {
  const [loading, setLoading] = useState(false) // to track api calling process
  const [isModalOpen, setIsModalOpen] = useState(false)
  const token = localStorage.getItem('accessToken')

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
