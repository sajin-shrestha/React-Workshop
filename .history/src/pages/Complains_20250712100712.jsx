import { Space, Table, Tag, Button, Flex } from "antd";
import { useEffect, useState } from "react";
import axios from 'axios'
import ComplainFormModel from "./ComplainFormModel";

//  "id": "string",
//       "subject": "string",
//       "description": "string",
//       "category": "string",
//       "status": "string",
//       "image": "string",
//       "createdAt": "string",
//       "updatedAt": "string"
const columns = [
  {
    title: "Subject",
    dataIndex: "subject",
    key: "subject",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "Description",
    dataIndex: "description",
    key: "description",
  },
  {
    title: "Category",
    dataIndex: "category",
    key: "category",
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    render: (text) => <Tag color="success">{text}</Tag>,
  },
  {
    title: "Image",
    dataIndex: "image_url",
    key: "image_url",
    render: (text) => <a>{text}</a>,
  },
]
 const Complain = () =>{
  const[loading, setLoading] = useState(false)
  const [data, setData] = useState([])
  const token = localStorage.getItem('accessToken')

  const handleApiFetch = async() =>{
    setLoading(true)
    try{
      const res = await axios.get(
        "https://egov-backend.vercel.app/api/file/complain",
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        },
        // {
        //     "content-type": 'application/json',
        //     "authorization" : `Bearer ${token}`
        // }
      )
      setData(res.data.data)
    }
    catch(err){
      console.error(err);
    }
    finally{
      setLoading(false);
    }
  }
  useEffect(() =>{
    handleApiFetch()      
  },[])

  return(<>
  <Flex justify="end">
  {/* <Button type="primary" style={{margin:'16px 24px'}}>Add Complain</Button> */}
  </Flex>
  <ComplainFormModel />
    <Table columns={columns} dataSource={data}  loading={loading}/>
    </>
  )
}
// const App = () => <Table columns={columns} dataSource={data} />;
export default Complain;

// export default Home
