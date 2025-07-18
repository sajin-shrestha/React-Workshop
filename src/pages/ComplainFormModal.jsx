import { useState } from 'react'
import { 
  Button, 
  Modal, 
  Form, 
  Input, 
  Upload, 
  Select, 
  message, 
  Typography,
  Space,
  Card,
  Progress
} from 'antd'
import { 
  LoadingOutlined, 
  PlusOutlined, 
  FileTextOutlined,
  CameraOutlined,
  CheckCircleOutlined 
} from '@ant-design/icons'
import axios from 'axios'

const { TextArea } = Input
const { Title, Paragraph } = Typography
const { Option } = Select

const ComplainFormModal = ({ trigger, onSuccess }) => {
  const [loading, setLoading] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [form] = Form.useForm()
  const [currentStep, setCurrentStep] = useState(0)
  const token = localStorage.getItem('accessToken')
  const [imageFile, setImageFile] = useState(null)

  const categories = [
    'Public Services',
    'Infrastructure',
    'Transportation',
    'Health Services',
    'Education',
    'Environment',
    'Utilities',
    'Law & Order',
    'Tax & Revenue',
    'Others'
  ]

  const uploadProps = {
    beforeUpload: (file) => {
      const isImage = file.type.startsWith('image/')
      if (!isImage) {
        message.error('You can only upload image files!')
        return false
      }
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isLt2M) {
        message.error('Image must be smaller than 2MB!')
        return false
      }
      setImageFile(file)
      return false
    },
    onRemove: () => setImageFile(null),
    fileList: imageFile ? [imageFile] : [],
  }

  const showModal = () => {
    setIsModalOpen(true)
    setCurrentStep(0)
  }

  const handleCancel = () => {
    setIsModalOpen(false)
    form.resetFields()
    setImageFile(null)
    setCurrentStep(0)
  }

  const onFinish = async (values) => {
    const formData = new FormData()

    formData.append('subject', values.subject)
    formData.append('description', values.description)
    formData.append('category', values.category)

    if (imageFile) {
      formData.append('image', imageFile)
    }

    setLoading(true)

    try {
      const res = await axios.post(
        'https://egov-backend.vercel.app/api/file/complain',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,
          },
        },
      )

      message.success('Complaint submitted successfully!')
      setIsModalOpen(false)
      form.resetFields()
      setImageFile(null)
      setCurrentStep(0)
      
      if (onSuccess) {
        onSuccess()
      }
    } catch (err) {
      console.error(err)
      message.error('Failed to submit complaint. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const steps = [
    'Complaint Details',
    'Category & Evidence',
    'Review & Submit'
  ]

  const getStepProgress = () => {
    return ((currentStep + 1) / steps.length) * 100
  }

  return (
    <>
      {trigger ? (
        <div onClick={showModal}>
          {trigger}
        </div>
      ) : (
        <Button
          type="primary"
          onClick={showModal}
          icon={<PlusOutlined />}
          className="gradient-button"
        >
          Submit Complaint
        </Button>
      )}
      
      <Modal
        title={
          <div style={{ padding: '8px 0' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
              <div style={{
                width: 40,
                height: 40,
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <FileTextOutlined style={{ color: 'white', fontSize: 18 }} />
              </div>
              <div>
                <Title level={4} style={{ margin: 0 }}>Submit New Complaint</Title>
                <Paragraph style={{ margin: 0, color: '#8c8c8c', fontSize: 14 }}>
                  Help us improve by reporting your concerns
                </Paragraph>
              </div>
            </div>
            
            <div>
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                marginBottom: 8,
                fontSize: 12,
                color: '#8c8c8c'
              }}>
                <span>Step {currentStep + 1} of {steps.length}</span>
                <span>{Math.round(getStepProgress())}% Complete</span>
              </div>
              <Progress 
                percent={getStepProgress()} 
                showInfo={false}
                strokeColor={{
                  '0%': '#667eea',
                  '100%': '#764ba2',
                }}
                trailColor="#f0f0f0"
              />
            </div>
          </div>
        }
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
        width={600}
        className="modern-modal"
      >
        <Form 
          form={form}
          onFinish={onFinish}
          layout="vertical"
          className="modern-form"
          style={{ marginTop: 24 }}
        >
          {currentStep === 0 && (
            <Card className="modern-card" style={{ border: '1px solid #f0f0f0' }}>
              <Space direction="vertical" size="large" style={{ width: '100%' }}>
                <div>
                  <Title level={5} style={{ marginBottom: 8 }}>
                    📝 What's your complaint about?
                  </Title>
                  <Paragraph style={{ color: '#8c8c8c', marginBottom: 16 }}>
                    Provide a clear and concise subject for your complaint
                  </Paragraph>
                </div>

                <Form.Item
                  label="Subject"
                  name="subject"
                  rules={[
                    { required: true, message: 'Please enter the subject of your complaint' },
                    { min: 10, message: 'Subject must be at least 10 characters' }
                  ]}
                >
                  <Input 
                    placeholder="Brief description of your issue..."
                    size="large"
                    showCount
                    maxLength={100}
                  />
                </Form.Item>

                <Form.Item
                  label="Detailed Description"
                  name="description"
                  rules={[
                    { required: true, message: 'Please provide a detailed description' },
                    { min: 20, message: 'Description must be at least 20 characters' }
                  ]}
                >
                  <TextArea
                    placeholder="Please provide detailed information about your complaint..."
                    rows={6}
                    showCount
                    maxLength={500}
                  />
                </Form.Item>

                <div style={{ textAlign: 'right' }}>
                  <Button 
                    type="primary"
                    onClick={() => setCurrentStep(1)}
                    disabled={!form.getFieldValue('subject') || !form.getFieldValue('description')}
                  >
                    Next Step
                  </Button>
                </div>
              </Space>
            </Card>
          )}

          {currentStep === 1 && (
            <Card className="modern-card" style={{ border: '1px solid #f0f0f0' }}>
              <Space direction="vertical" size="large" style={{ width: '100%' }}>
                <div>
                  <Title level={5} style={{ marginBottom: 8 }}>
                    🏷️ Categorize Your Complaint
                  </Title>
                  <Paragraph style={{ color: '#8c8c8c', marginBottom: 16 }}>
                    Select the category that best describes your complaint
                  </Paragraph>
                </div>

                <Form.Item
                  label="Category"
                  name="category"
                  rules={[{ required: true, message: 'Please select a category' }]}
                >
                  <Select 
                    placeholder="Choose the most relevant category"
                    size="large"
                    showSearch
                    optionFilterProp="children"
                  >
                    {categories.map(category => (
                      <Option key={category} value={category}>
                        {category}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>

                <div>
                  <Title level={5} style={{ marginBottom: 8 }}>
                    📷 Add Supporting Evidence (Optional)
                  </Title>
                  <Paragraph style={{ color: '#8c8c8c', marginBottom: 16 }}>
                    Upload an image to support your complaint (Max 2MB)
                  </Paragraph>
                </div>

                <Form.Item>
                  <Upload
                    {...uploadProps}
                    listType="picture-card"
                    className="modern-upload"
                  >
                    {!imageFile && (
                      <div style={{ textAlign: 'center', padding: '20px' }}>
                        <CameraOutlined style={{ fontSize: 24, color: '#1890ff', marginBottom: 8 }} />
                        <div style={{ fontSize: 14, fontWeight: 500 }}>Upload Image</div>
                        <div style={{ fontSize: 12, color: '#8c8c8c' }}>JPG, PNG up to 2MB</div>
                      </div>
                    )}
                  </Upload>
                </Form.Item>

                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Button onClick={() => setCurrentStep(0)}>
                    Previous
                  </Button>
                  <Button 
                    type="primary"
                    onClick={() => setCurrentStep(2)}
                    disabled={!form.getFieldValue('category')}
                  >
                    Review & Submit
                  </Button>
                </div>
              </Space>
            </Card>
          )}

          {currentStep === 2 && (
            <Card className="modern-card" style={{ border: '1px solid #f0f0f0' }}>
              <Space direction="vertical" size="large" style={{ width: '100%' }}>
                <div>
                  <Title level={5} style={{ marginBottom: 8 }}>
                    ✅ Review Your Complaint
                  </Title>
                  <Paragraph style={{ color: '#8c8c8c', marginBottom: 16 }}>
                    Please review your information before submitting
                  </Paragraph>
                </div>

                <div style={{ 
                  background: '#fafafa', 
                  padding: '16px', 
                  borderRadius: '8px',
                  border: '1px solid #f0f0f0'
                }}>
                  <div style={{ marginBottom: 12 }}>
                    <strong style={{ color: '#262626' }}>Subject:</strong>
                    <div style={{ marginTop: 4, color: '#595959' }}>
                      {form.getFieldValue('subject')}
                    </div>
                  </div>
                  
                  <div style={{ marginBottom: 12 }}>
                    <strong style={{ color: '#262626' }}>Category:</strong>
                    <div style={{ marginTop: 4 }}>
                      <Tag color="blue" style={{ borderRadius: '6px' }}>
                        {form.getFieldValue('category')}
                      </Tag>
                    </div>
                  </div>

                  <div style={{ marginBottom: 12 }}>
                    <strong style={{ color: '#262626' }}>Description:</strong>
                    <div style={{ 
                      marginTop: 4, 
                      color: '#595959',
                      maxHeight: '100px',
                      overflowY: 'auto'
                    }}>
                      {form.getFieldValue('description')}
                    </div>
                  </div>

                  {imageFile && (
                    <div>
                      <strong style={{ color: '#262626' }}>Attachment:</strong>
                      <div style={{ marginTop: 4, color: '#595959' }}>
                        📎 {imageFile.name} ({(imageFile.size / 1024).toFixed(1)} KB)
                      </div>
                    </div>
                  )}
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12 }}>
                  <Button onClick={() => setCurrentStep(1)}>
                    Previous
                  </Button>
                  <Button
                    type="primary"
                    htmlType="submit"
                    loading={loading}
                    icon={loading ? <LoadingOutlined /> : <CheckCircleOutlined />}
                    className="gradient-button"
                  >
                    {loading ? 'Submitting...' : 'Submit Complaint'}
                  </Button>
                </div>
              </Space>
            </Card>
          )}
        </Form>
      </Modal>
    </>
  )
}

export default ComplainFormModal
