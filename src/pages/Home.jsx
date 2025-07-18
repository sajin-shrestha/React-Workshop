import { Table } from 'antd'
import axios from 'axios'
import { useEffect, useState } from 'react'

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    render: (text) => <a href="#!" style={{ color: '#1890ff', textDecoration: 'none' }}>{text}</a>,
  },
  {
    title: 'Description',
    dataIndex: 'description',
    key: 'description',
  },
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: 'Website',
    dataIndex: 'website_url',
    key: 'website_url',
    render: (text) => (
      <a href={text} target="_blank" rel="noopener noreferrer" style={{ color: '#1890ff', textDecoration: 'none' }}>
        Visit
      </a>
    ),
  },
  {
    title: 'Image',
    dataIndex: 'image_url',
    key: 'image_url',
    render: (text) => (
      <img
        src={text}
        alt="govt"
        style={{ width: 60, height: 40, objectFit: 'cover', borderRadius: 4 }}
      />
    ),
  },
]

const Home = () => {
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState([])

  const handleApiFetch = async () => {
    setLoading(true)
    try {
      const res = await axios.get(
        'https://egov-backend.vercel.app/api/govt/gov-web-data',
      )
      setData(res.data.data)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    handleApiFetch()
  }, [])

  return (
    <Table
      columns={columns}
      dataSource={data}
      loading={loading}
      pagination={{ pageSize: 6 }}
      rowKey={(record) => record.id || record._id}
    />
  )
}

export default Home
