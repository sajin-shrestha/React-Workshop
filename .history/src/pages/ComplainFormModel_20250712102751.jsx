import React, { useState } from 'react';
import { Modal } from 'antd';
import { Card, Form, Input, Button, message } from "antd";
import axios from "axios";
import { Link} from "react-router-dom";
const ComplainFormModel = () => {
     const [loading, setLoading] = useState(false); // to track api calling process
  const [isModalOpen, setIsModalOpen] = useState(false);
  const token = localStorage.getItem('accessToken')

//   const navigate = useNavigate();
  const onFinish = async (values) => {
    setLoading(true);

    try {
      const res = await axios.post(
        "https://egov-backend.vercel.app/api/file/complain",
        values
      );
      const { accessToken } = res.data;
      localStorage.setItem("accessToken", accessToken);

    //   navigate("/");

    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const getBase64 = (img, callback) => {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
};
const beforeUpload = file => {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
  }
  return isJpgOrPng && isLt2M;
};
       const [imageUrl, setImageUrl] = useState();
 const handleChange = info => {
    if (info.file.status === 'uploading') {
      setLoading(true);
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, url => {
        setLoading(false);
        setImageUrl(url);
      });
    }
  };

  return (
    <>
        <Button type="primary" style={{margin:'16px 24px'}} onClick={showModal}>Add Complain</Button>
      <Modal
        title="Basic Modal"
        closable={{ 'aria-label': 'Custom Close Button' }}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form onFinish={onFinish}>
          {/* for email */}
          <Form.Item label="Subject" name="subject" required>
            <Input placeholder="subject" />
          </Form.Item>
          {/* for password */}
          <Form.Item label="Description" name="description" required>
            <Input placeholder="description" />
          </Form.Item>
          <Form.Item label="Category" name="category" required>
            <Input placeholder="category" />
          </Form.Item>
          {/* for submit button */}
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading}>
              Add Complain
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
export default ComplainFormModel


// import React, { useState } from 'react';
// import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
// import { Flex, message, Upload } from 'antd';
// const getBase64 = (img, callback) => {
//   const reader = new FileReader();
//   reader.addEventListener('load', () => callback(reader.result));
//   reader.readAsDataURL(img);
// };
// const beforeUpload = file => {
//   const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
//   if (!isJpgOrPng) {
//     message.error('You can only upload JPG/PNG file!');
//   }
//   const isLt2M = file.size / 1024 / 1024 < 2;
//   if (!isLt2M) {
//     message.error('Image must smaller than 2MB!');
//   }
//   return isJpgOrPng && isLt2M;
// };
// const App = () => {
//   const [loading, setLoading] = useState(false);
//   const [imageUrl, setImageUrl] = useState();
//   const handleChange = info => {
//     if (info.file.status === 'uploading') {
//       setLoading(true);
//       return;
//     }
//     if (info.file.status === 'done') {
//       // Get this url from response in real world.
//       getBase64(info.file.originFileObj, url => {
//         setLoading(false);
//         setImageUrl(url);
//       });
//     }
//   };
//   const uploadButton = (
//     <button style={{ border: 0, background: 'none' }} type="button">
//       {loading ? <LoadingOutlined /> : <PlusOutlined />}
//       <div style={{ marginTop: 8 }}>Upload</div>
//     </button>
//   );
//   return (
//     <Flex gap="middle" wrap>
//       <Upload
//         name="avatar"
//         listType="picture-card"
//         className="avatar-uploader"
//         showUploadList={false}
//         action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
//         beforeUpload={beforeUpload}
//         onChange={handleChange}
//       >
//         {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
//       </Upload>
//       <Upload
//         name="avatar"
//         listType="picture-circle"
//         className="avatar-uploader"
//         showUploadList={false}
//         action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
//         beforeUpload={beforeUpload}
//         onChange={handleChange}
//       >
//         {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
//       </Upload>
//     </Flex>
//   );
// };
// export default App;