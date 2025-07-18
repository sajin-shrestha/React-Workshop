import { Flex, Table, Tag, Button, Popconfirm, message } from 'antd'
import axios from 'axios'
import { useEffect, useState } from 'react'
import ComplainFormModal from './ComplainsFormModual'

const Complains = () => {
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState([])
  const token = localStorage.getItem('accessToken')

  const handleApiFetch = async () => {
    setLoading(true)
    try {
      const res = await axios.get(
        'https://egov-backend.vercel.app/api/file/complain',
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      setData(res.data.complains)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `https://egov-backend.vercel.app/api/file/complain/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      message.success('Complain deleted successfully')
      handleApiFetch() 
    } catch (error) {
      console.error(error)
      message.error('Failed to delete complain')
    }
  }

  const columns = [
    {
      title: 'Subject',
      dataIndex: 'subject',
      key: 'subject',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (text) => <Tag color="success">{text}</Tag>,
    },
    {
      title: 'Image',
      dataIndex: 'image',
      key: 'image',
      render: (text) => (
        <img
          src={text}
          alt="complaint"
          style={{ width: 40, height: 40, objectFit: 'cover' }}
        />
      ),
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Popconfirm
          title="Are you sure you want to delete this complaint?"
          onConfirm={() => handleDelete(record._id)}
          okText="Yes"
          cancelText="No"
        >
          <Button danger>Delete</Button>
        </Popconfirm>
      ),
    },
  ]

  useEffect(() => {
    handleApiFetch()
  }, [])

  return (
    <>
      <Flex justify="end" style={{ margin: '16px 24px' }}>
        <ComplainFormModal />
      </Flex>
      <Table columns={columns} dataSource={data} loading={loading} rowKey="_id" />
    </>
  )
}

export default Complains
