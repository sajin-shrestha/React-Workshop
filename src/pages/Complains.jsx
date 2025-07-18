import { Table, Button, Popconfirm, message } from 'antd'
import { DeleteOutlined } from '@ant-design/icons'
import { useEffect, useState } from 'react'
import axios from 'axios'
import ComplainFormModal from './ComplainFormModal'

const Complains = () => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const token = localStorage.getItem('accessToken')

  const fetchComplains = async () => {
    setLoading(true)
    try {
      const res = await axios.get('https://egov-backend.vercel.app/api/file/complain', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      setData(res.data.complains || [])
    } catch (err) {
      console.error(err)
      message.error('Failed to fetch complaints')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://egov-backend.vercel.app/api/file/complain/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      message.success('Complaint deleted successfully')
      fetchComplains()
    } catch (err) {
      console.error(err)
      message.error('Failed to delete complaint')
    }
  }

  useEffect(() => {
    fetchComplains()
  }, [])

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
      render: (status) => (
        <span style={{ color: status === 'pending' ? 'orange' : 'green', fontWeight: 'bold' }}>
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </span>
      ),
    },
    {
      title: 'Image',
      dataIndex: 'image',
      key: 'image',
      render: (imgUrl) =>
        imgUrl ? <img src={imgUrl} alt="complain" style={{ width: 50, height: 50, objectFit: 'cover' }} /> : 'No Image',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Popconfirm
          title="Are you sure you want to delete this complaint?"
          onConfirm={() => handleDelete(record._id)}
          okText="Yes"
          cancelText="No"
        >
          <Button danger icon={<DeleteOutlined />} size="small">
            Delete
          </Button>
        </Popconfirm>
      ),
    },
  ]

  return (
    <>
      <div style={{ marginBottom: 16, textAlign: 'right' }}>
        <ComplainFormModal />
      </div>
      <Table rowKey={(record) => record._id} columns={columns} dataSource={data} loading={loading} />
    </>
  )
}

export default Complains
