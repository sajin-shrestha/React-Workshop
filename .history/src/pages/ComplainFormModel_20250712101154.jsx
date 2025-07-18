import React, { useState } from 'react';
import { Button, Modal } from 'antd';
import { Space, Table, Tag, Flex } from "antd";
import { useEffect, useState } from "react";
import axios from 'axios'

const ComplainFormModel = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
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
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
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
    </>
  );
};
export default ComplainFormModel
