import { Space, Table, Tag } from 'antd'
import axios from 'axios'
import { useEffect, useState } from 'react'

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    render: (text) => <a>{text}</a>,
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
    key: 'Website_url',
    dataIndex: 'Website_url',
    render: (_, { Website_url }) => (
      <>
        {Website_url.map((url) => {
          let color = url.length > 5 ? 'geekblue' : 'green'
          if (url === 'loser') {
            color = 'volcano'
          }
          return (
            <Tag
              color={color}
              key={tag}
            >
              {tag.toUpperCase()}
            </Tag>
          )
        })}
      </>
    ),
  },
  {
    title: 'Action',
    key: 'action',
    render: (_, record) => (
      <Space size="middle">
        <a>Invite {record.name}</a>
        <a>Delete</a>
      </Space>
    ),
  },
]

const data = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
    tags: ['nice', 'developer'],
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
    tags: ['loser'],
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sydney No. 1 Lake Park',
    tags: ['cool', 'teacher'],
  },
]

const Home = () => {
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState([])

    const handleApiFetch = async () => {
        setLoading(true)
        try {
            const response = await axios.get('https://egov-backend.vercel.app/api/govt/gov-web-data',)
            setData(response.data.data)
            message.success("Data fetched successfully")
        } catch (error) {
            message.error("Failed to fetch data")
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

export default Home