import { Space, Table, Tag } from "antd";
import { useEffect, useState } from "react";
import axios from 'axios'

const columns = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "Description",
    dataIndex: "description",
    key: "description",
  },
  {
    title: "Address",
    dataIndex: "address",
    key: "address",
  },
  {
    title: "Website",
    dataIndex: "website_url",
    key: "website_url",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "Image",
    dataIndex: "image_url",
    key: "image_url",
    render: (text) => <a>{text}</a>,
  },
]
 const Home = () =>{
  const[loading, setLoading] = useState(false)
  const [data, setData] = useState([])

  const handleApiFetch = async() =>{
    setLoading(true)
    try{
      const res = await axios.get(
        "https://egov-backend.vercel.app/api/govt/gov-web-data",
      )
      setData(res.data)
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

  return(
    <Table columns={columns} dataSource={data}  loading={loading}/>
  )
}
// const App = () => <Table columns={columns} dataSource={data} />;
export default Home;

// export default Home
