import { 
  Table, 
  Tag, 
  Button, 
  message, 
  Popconfirm, 
  Card, 
  Typography, 
  Row, 
  Col, 
  Statistic,
  Avatar,
  Image,
  Space,
  Input,
  Select,
  Empty,
  Tooltip
} from 'antd'
import { 
  DeleteOutlined, 
  EyeOutlined, 
  FileTextOutlined,
  SearchOutlined,
  FilterOutlined,
  PlusOutlined,
  ExclamationCircleOutlined,
  ClockCircleOutlined,
  CheckCircleOutlined
} from '@ant-design/icons'
import axios from 'axios'
import { useEffect, useState } from 'react'
import ComplainFormModal from './ComplainFormModal'

const { Title, Paragraph } = Typography
const { Search } = Input
const { Option } = Select

const Complains = () => {
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState([])
  const [filteredData, setFilteredData] = useState([])
  const [filterStatus, setFilterStatus] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')
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
      setFilteredData(res.data.complains)
    } catch (error) {
      console.error(error)
      message.error('Failed to fetch complaints')
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
        },
      )
      message.success('Complaint deleted successfully')
      handleApiFetch()
    } catch (error) {
      console.error(error)
      message.error('Failed to delete complaint')
    }
  }

  const handleSearch = (value) => {
    setSearchTerm(value)
    applyFilters(value, filterStatus)
  }

  const handleStatusFilter = (status) => {
    setFilterStatus(status)
    applyFilters(searchTerm, status)
  }

  const applyFilters = (search, status) => {
    let filtered = data

    if (search) {
      filtered = filtered.filter(item =>
        item.subject?.toLowerCase().includes(search.toLowerCase()) ||
        item.description?.toLowerCase().includes(search.toLowerCase()) ||
        item.category?.toLowerCase().includes(search.toLowerCase())
      )
    }

    if (status !== 'all') {
      filtered = filtered.filter(item => item.status?.toLowerCase() === status.toLowerCase())
    }

    setFilteredData(filtered)
  }

  const getStatusIcon = (status) => {
    switch (status?.toLowerCase()) {
      case 'pending':
        return <ClockCircleOutlined />
      case 'resolved':
        return <CheckCircleOutlined />
      case 'in progress':
        return <ExclamationCircleOutlined />
      default:
        return <ClockCircleOutlined />
    }
  }

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'pending':
        return 'orange'
      case 'resolved':
        return 'green'
      case 'in progress':
        return 'blue'
      default:
        return 'default'
    }
  }

  const getStats = () => {
    const total = data.length
    const pending = data.filter(item => item.status?.toLowerCase() === 'pending').length
    const resolved = data.filter(item => item.status?.toLowerCase() === 'resolved').length
    const inProgress = data.filter(item => item.status?.toLowerCase() === 'in progress').length
    
    return { total, pending, resolved, inProgress }
  }

  const stats = getStats()

  const columns = [
    {
      title: 'Complaint Details',
      key: 'details',
      render: (_, record) => (
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
          <Avatar 
            size={40}
            icon={<FileTextOutlined />}
            style={{ 
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              flexShrink: 0,
              marginTop: 4
            }}
          />
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ 
              fontWeight: 600, 
              color: '#262626', 
              marginBottom: 4,
              fontSize: 16
            }}>
              {record.subject}
            </div>
            <Paragraph 
              ellipsis={{ rows: 2, expandable: true, symbol: 'More' }}
              style={{ margin: 0, color: '#595959', fontSize: 14 }}
            >
              {record.description}
            </Paragraph>
            <div style={{ marginTop: 8 }}>
              <Tag color="blue" style={{ borderRadius: '6px' }}>
                {record.category}
              </Tag>
            </div>
          </div>
        </div>
      ),
      width: 400,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <Tag 
          color={getStatusColor(status)} 
          icon={getStatusIcon(status)}
          className="status-tag"
          style={{ 
            fontSize: 13,
            fontWeight: 600,
            padding: '6px 12px',
            borderRadius: '8px'
          }}
        >
          {status}
        </Tag>
      ),
      width: 120,
      filters: [
        { text: 'Pending', value: 'pending' },
        { text: 'In Progress', value: 'in progress' },
        { text: 'Resolved', value: 'resolved' },
      ],
      onFilter: (value, record) => record.status?.toLowerCase() === value,
    },
    {
      title: 'Attachment',
      dataIndex: 'image',
      key: 'image',
      render: (image) => image ? (
        <Image
          src={image}
          width={60}
          height={60}
          style={{ 
            borderRadius: '8px',
            objectFit: 'cover',
            border: '2px solid #f0f0f0'
          }}
          preview={{
            mask: <EyeOutlined style={{ fontSize: 16 }} />
          }}
        />
      ) : (
        <div style={{
          width: 60,
          height: 60,
          background: '#fafafa',
          border: '2px dashed #d9d9d9',
          borderRadius: '8px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#bfbfbf'
        }}>
          No Image
        </div>
      ),
      width: 100,
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space>
          <Tooltip title="View Details">
            <Button
              type="primary"
              ghost
              icon={<EyeOutlined />}
              size="small"
              style={{ borderRadius: '6px' }}
            />
          </Tooltip>
          <Popconfirm
            title="Delete Complaint"
            description="Are you sure you want to delete this complaint?"
            onConfirm={() => handleDelete(record._id)}
            okText="Yes"
            cancelText="No"
            icon={<ExclamationCircleOutlined style={{ color: 'red' }} />}
          >
            <Tooltip title="Delete Complaint">
              <Button
                danger
                icon={<DeleteOutlined />}
                size="small"
                style={{ borderRadius: '6px' }}
              />
            </Tooltip>
          </Popconfirm>
        </Space>
      ),
      width: 100,
    },
  ]

  useEffect(() => {
    handleApiFetch()
  }, [])

  return (
    <div className="container slide-up">
      {/* Header Section */}
      <div style={{ marginBottom: 32 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 24 }}>
          <Avatar 
            size={48}
            icon={<FileTextOutlined />}
            style={{ 
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              border: 'none'
            }}
          />
          <div>
            <Title level={2} style={{ marginBottom: 4 }}>
              My Complaints
            </Title>
            <Paragraph style={{ color: '#8c8c8c', marginBottom: 0 }}>
              Track and manage your submitted complaints
            </Paragraph>
          </div>
        </div>

        {/* Statistics Cards */}
        <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
          <Col xs={12} sm={6}>
            <Card className="modern-card">
              <Statistic
                title="Total"
                value={stats.total}
                prefix={<FileTextOutlined style={{ color: '#1890ff' }} />}
                valueStyle={{ color: '#1890ff', fontWeight: 'bold', fontSize: 20 }}
              />
            </Card>
          </Col>
          <Col xs={12} sm={6}>
            <Card className="modern-card">
              <Statistic
                title="Pending"
                value={stats.pending}
                prefix={<ClockCircleOutlined style={{ color: '#faad14' }} />}
                valueStyle={{ color: '#faad14', fontWeight: 'bold', fontSize: 20 }}
              />
            </Card>
          </Col>
          <Col xs={12} sm={6}>
            <Card className="modern-card">
              <Statistic
                title="In Progress"
                value={stats.inProgress}
                prefix={<ExclamationCircleOutlined style={{ color: '#1890ff' }} />}
                valueStyle={{ color: '#1890ff', fontWeight: 'bold', fontSize: 20 }}
              />
            </Card>
          </Col>
          <Col xs={12} sm={6}>
            <Card className="modern-card">
              <Statistic
                title="Resolved"
                value={stats.resolved}
                prefix={<CheckCircleOutlined style={{ color: '#52c41a' }} />}
                valueStyle={{ color: '#52c41a', fontWeight: 'bold', fontSize: 20 }}
              />
            </Card>
          </Col>
        </Row>
      </div>

      {/* Actions and Filters */}
      <Card className="modern-card" style={{ marginBottom: 24 }}>
        <Row gutter={[16, 16]} align="middle">
          <Col xs={24} md={8}>
            <Search
              placeholder="Search complaints..."
              allowClear
              enterButton={<SearchOutlined />}
              onSearch={handleSearch}
              onChange={(e) => !e.target.value && handleSearch('')}
            />
          </Col>
          <Col xs={24} md={8}>
            <Select
              style={{ width: '100%' }}
              placeholder="Filter by status"
              value={filterStatus}
              onChange={handleStatusFilter}
              suffixIcon={<FilterOutlined />}
            >
              <Option value="all">All Status</Option>
              <Option value="pending">Pending</Option>
              <Option value="in progress">In Progress</Option>
              <Option value="resolved">Resolved</Option>
            </Select>
          </Col>
          <Col xs={24} md={8} style={{ textAlign: 'right' }}>
            <ComplainFormModal 
              onSuccess={handleApiFetch}
              trigger={
                <Button 
                  type="primary" 
                  icon={<PlusOutlined />}
                  className="gradient-button"
                  style={{ borderRadius: '8px' }}
                >
                  New Complaint
                </Button>
              }
            />
          </Col>
        </Row>
      </Card>

      {/* Complaints Table */}
      <Card 
        className="modern-card"
        bodyStyle={{ padding: 0 }}
      >
        {loading ? (
          <div className="loading-container">
            <div className="loading-text">Loading your complaints...</div>
          </div>
        ) : filteredData.length === 0 ? (
          <Empty
            description={
              data.length === 0 
                ? "You haven't submitted any complaints yet"
                : "No complaints match your search criteria"
            }
            style={{ padding: '60px 20px' }}
          >
            {data.length === 0 && (
              <ComplainFormModal 
                onSuccess={handleApiFetch}
                trigger={
                  <Button 
                    type="primary" 
                    icon={<PlusOutlined />}
                    className="gradient-button"
                  >
                    Submit Your First Complaint
                  </Button>
                }
              />
            )}
          </Empty>
        ) : (
          <Table
            columns={columns}
            dataSource={filteredData}
            rowKey="_id"
            loading={loading}
            pagination={{
              pageSize: 10,
              showSizeChanger: true,
              showQuickJumper: true,
              showTotal: (total, range) =>
                `${range[0]}-${range[1]} of ${total} complaints`,
            }}
            className="modern-table"
            scroll={{ x: 800 }}
            rowClassName={(record, index) => 
              index % 2 === 0 ? 'table-row-light' : 'table-row-dark'
            }
          />
        )}
      </Card>
    </div>
  )
}

export default Complains
