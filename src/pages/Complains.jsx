import { Table, Tag } from 'antd'
import axios from 'axios'
import { useEffect, useState } from 'react'

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
    render: (text) => <a>{text}</a>,
  },
]

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
        },
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
    />
  )
}

export default Complains
