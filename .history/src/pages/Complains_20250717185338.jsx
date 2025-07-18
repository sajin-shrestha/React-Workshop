import { Button, Flex, Table, Tag, message } from 'antd'
import axios from 'axios'
import { useEffect, useState } from 'react'
import ComplainFormModal from './ComplainFormModel'

const Complains = () => {
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState([])
  const token = localStorage.getItem('accessToken')

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
    title: 'Delete Data',
    dataIndex: 'delete',
    key: 'delete',
    render: (_, record) => (
      <Button onClick={() => DeleteApiData(record._id)}>Delete</Button>
    )
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
const DeleteApiData = async(id) =>{
  setLoading(true)
  console.log(id);
  console.log(token);
  
  try{
    const del = await axios.delete(
      `https://egov-backend.vercel.app/api/file/complain/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    )
    handleApiFetch();
    setData((DelData) => DelData.filter((data) => data.id !== id))
    console.log(del);
    message.success("Data deleted successfully");
  }
    catch(err){
      console.error(err);
      message.error('failed to delete data');
    }
    finally {
      setLoading(false);
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