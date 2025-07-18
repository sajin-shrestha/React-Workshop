import { 
  Table, 
  Card, 
  Typography, 
  Statistic, 
  Row, 
  Col, 
  Avatar,
  Tag,
  Input,
  Button,
  Empty,
  Spin
} from 'antd'
import { 
  GlobalOutlined, 
  EnvironmentOutlined, 
  SearchOutlined,
  EyeOutlined,
  BankOutlined,
  TeamOutlined,
  FileTextOutlined 
} from '@ant-design/icons'
import axios from 'axios'
import { useEffect, useState } from 'react'

const { Title, Paragraph } = Typography
const { Search } = Input

const Home = () => {
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState([])
  const [filteredData, setFilteredData] = useState([])
  const [searchTerm, setSearchTerm] = useState('')

  const handleApiFetch = async () => {
    setLoading(true)
    try {
      const res = await axios.get(
        'https://egov-backend.vercel.app/api/govt/gov-web-data',
      )
      setData(res.data.data)
      setFilteredData(res.data.data)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = (value) => {
    setSearchTerm(value)
    const filtered = data.filter(item =>
      item.name?.toLowerCase().includes(value.toLowerCase()) ||
      item.description?.toLowerCase().includes(value.toLowerCase()) ||
      item.address?.toLowerCase().includes(value.toLowerCase())
    )
    setFilteredData(filtered)
  }

  const columns = [
    {
      title: 'Organization',
      dataIndex: 'name',
      key: 'name',
      render: (text, record) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <Avatar 
            size={40}
            src={record.image_url}
            icon={<BankOutlined />}
            style={{ 
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              flexShrink: 0
            }}
          />
          <div>
            <div style={{ fontWeight: 600, color: '#262626' }}>{text}</div>
            <div style={{ fontSize: 12, color: '#8c8c8c', marginTop: 2 }}>
              Government Organization
            </div>
          </div>
        </div>
      ),
      width: 300,
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      render: (text) => (
        <Paragraph 
          ellipsis={{ rows: 2, expandable: true, symbol: 'More' }}
          style={{ margin: 0, maxWidth: 300 }}
        >
          {text}
        </Paragraph>
      ),
    },
    {
      title: 'Location',
      dataIndex: 'address',
      key: 'address',
      render: (text) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <EnvironmentOutlined style={{ color: '#ff4d4f' }} />
          <span style={{ color: '#595959' }}>{text}</span>
        </div>
      ),
      width: 200,
    },
    {
      title: 'Website',
      dataIndex: 'website_url',
      key: 'website_url',
      render: (text) => text ? (
        <Button 
          type="link" 
          icon={<GlobalOutlined />}
          href={text}
          target="_blank"
          style={{ padding: 0, height: 'auto' }}
        >
          Visit Website
        </Button>
      ) : (
        <span style={{ color: '#bfbfbf' }}>No website</span>
      ),
      width: 150,
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Button 
          type="primary" 
          icon={<EyeOutlined />}
          size="small"
          style={{ borderRadius: '6px' }}
        >
          View Details
        </Button>
      ),
      width: 120,
    },
  ]

  useEffect(() => {
    handleApiFetch()
  }, [])

  return (
    <div className="container slide-up">
      {/* Hero Section */}
      <div className="hero-section" style={{ margin: '-24px -24px 40px -24px', borderRadius: '0 0 24px 24px' }}>
        <div style={{ position: 'relative', zIndex: 2 }}>
          <Title level={1} className="hero-title" style={{ color: 'white', marginBottom: 16 }}>
            Government Services Portal
          </Title>
          <Paragraph className="hero-subtitle" style={{ color: 'rgba(255,255,255,0.9)', fontSize: 18, marginBottom: 0 }}>
            Access all government organizations and services in one place
          </Paragraph>
        </div>
      </div>

      {/* Statistics Cards */}
      <Row gutter={[24, 24]} style={{ marginBottom: 32 }}>
        <Col xs={24} sm={8}>
          <Card className="modern-card scale-in">
            <Statistic
              title="Total Organizations"
              value={data.length}
              prefix={<BankOutlined style={{ color: '#1890ff' }} />}
              valueStyle={{ color: '#1890ff', fontWeight: 'bold' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={8}>
          <Card className="modern-card scale-in" style={{ animationDelay: '0.1s' }}>
            <Statistic
              title="Active Services"
              value={data.filter(item => item.website_url).length}
              prefix={<GlobalOutlined style={{ color: '#52c41a' }} />}
              valueStyle={{ color: '#52c41a', fontWeight: 'bold' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={8}>
          <Card className="modern-card scale-in" style={{ animationDelay: '0.2s' }}>
            <Statistic
              title="Locations Covered"
              value={new Set(data.map(item => item.address)).size}
              prefix={<EnvironmentOutlined style={{ color: '#faad14' }} />}
              valueStyle={{ color: '#faad14', fontWeight: 'bold' }}
            />
          </Card>
        </Col>
      </Row>

      {/* Search and Filter Section */}
      <Card className="modern-card" style={{ marginBottom: 24 }}>
        <Row gutter={[16, 16]} align="middle">
          <Col xs={24} md={18}>
            <Search
              placeholder="Search organizations by name, description, or location..."
              allowClear
              enterButton={<SearchOutlined />}
              size="large"
              onSearch={handleSearch}
              onChange={(e) => !e.target.value && handleSearch('')}
              style={{ width: '100%' }}
            />
          </Col>
          <Col xs={24} md={6}>
            <div style={{ textAlign: 'right' }}>
              <Tag color="blue" style={{ padding: '4px 12px', borderRadius: '6px' }}>
                {filteredData.length} Results
              </Tag>
            </div>
          </Col>
        </Row>
      </Card>

      {/* Main Content */}
      <Card 
        className="modern-card"
        title={
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <Avatar 
              icon={<FileTextOutlined />} 
              style={{ 
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                border: 'none'
              }}
            />
            <span style={{ fontSize: 18, fontWeight: 600 }}>Government Organizations</span>
          </div>
        }
        bodyStyle={{ padding: 0 }}
      >
        {loading ? (
          <div className="loading-container">
            <Spin size="large" />
            <div className="loading-text">Loading government organizations...</div>
          </div>
        ) : filteredData.length === 0 ? (
          <Empty
            description="No organizations found"
            style={{ padding: '60px 20px' }}
          />
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
                `${range[0]}-${range[1]} of ${total} organizations`,
            }}
            className="modern-table"
            scroll={{ x: 800 }}
          />
        )}
      </Card>
    </div>
  )
}

export default Home
