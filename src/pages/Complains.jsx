import { Flex, Table, Tag } from 'antd'
import axios from 'axios'
import { useEffect, useState } from 'react'
import ComplainFormModal from './ComplainFormModal'

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
        style={{ width: 40, height: 40 }}
      />
    ),
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
      setData(res.data.complains)
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
    <>
      <Flex
        justify="end"
        style={{ margin: '16px 24px' }}
      >
        <ComplainFormModal />
      </Flex>
      <Table
        columns={columns}
        dataSource={data}
        loading={loading}
      />
    </>
  )
}

export default Complains
