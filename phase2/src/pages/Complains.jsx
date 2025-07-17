import { Flex, Table, Tag, Button, Popconfirm, message } from 'antd';
import axios from 'axios';
import { useEffect, useState } from 'react';
import ComplainFormModal from './ComplainFormModal';


const Complains = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const token = localStorage.getItem('accessToken');

  const handleApiFetch = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        'https://egov-backend.vercel.app/api/file/complain',
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      setData(res.data.complains);
    } catch (error) {
      console.error(error);
      message.error('Failed to load complains');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    setLoading(true);
    try {
      await axios.delete(
        `https://egov-backend.vercel.app/api/file/complain/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      message.success('Complain deleted successfully');
      handleApiFetch(); // refresh list immediately after delete
    } catch (error) {
      console.error(error);
      message.error('Failed to delete complain');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleApiFetch();
  }, []);

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
        <img src={text} style={{ width: 40, height: 40 }} alt="complain" />
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Popconfirm
          title="Are you sure to delete this complain?"
          onConfirm={() => handleDelete(record._id)}
          okText="Yes"
          cancelText="No"
        >
          <Button danger>Delete</Button>
        </Popconfirm>
      ),
    },
  ];

  return (
    <>
      <Flex justify="end" style={{ margin: '16px 24px' }}>
        <ComplainFormModal refreshComplains={handleApiFetch} />
      </Flex>
      <Table columns={columns} dataSource={data} loading={loading} rowKey="_id" />
    </>
  );
};

export default Complains;
