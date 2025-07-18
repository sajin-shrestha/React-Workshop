import { Space, Table, Tag } from "antd";
import { useEffect, useState } from "react";

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
  },
  {
    title: "Image",
    dataIndex: "image_url",
    key: "image_url",
    render: (text) => <a>{text}</a>
  },
]
 const Home = () =>{
  const [data, setData] = useState([])

  useEffect(() =>{
    const res = axios.get(
      "https://egov-backend.vercel.app/api/users/login",
    )
    console.log(res)
    setData(res.data)
    console.log(res.data)
  })
 }
const App = () => <Table columns={columns} dataSource={data} />;
export default App;

// export default Home
