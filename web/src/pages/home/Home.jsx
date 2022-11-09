import React, { useState, useEffect } from 'react'
import AppLayout from '../../components/Layout';
import axios from 'axios';
import { Table, Space, Tag, Button } from 'antd';
import Product from '../../components/Product';

const Home = () => {

  const [productData, setProductData] = useState([]);

  useEffect(() => {
    const getAllProducts = async () => {
      try {
        const data = await axios.get('/api/products');
        setProductData(data);
        console.log(data);
      } catch(error) {
        console.log(error);
      }
    };

    getAllProducts();
  }, []);

  console.log("Product data: " + JSON.stringify(productData.data));

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category'
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price'
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (_, record) => {
        console.log("Status:" + record.status)
        let color = 'green';
          if (record.status === 'inactive'){
            color = 'volcano';
          }
          return (
            <Tag color={color} key={record.status}>
              {record.status.toUpperCase()}
            </Tag>
          )
      }
          
    },
    {
      title: 'Actions',
      key: 'action',
      render: (_, record) => {
        let text = 'Deactivate';
        if (record.status === 'inactive') {
          text = 'Activate';
        }
        return (<Space size="middle">
          <Button type="primary">View</Button>
          <Button type="default">Edit</Button>
          <Button type="default">{text}</Button>
        </Space>
        )
      }
    }
  ]

  return (
    <AppLayout>
      <h2>Home</h2>
      <Table dataSource={productData.data} columns={columns}/>
    </AppLayout>
  )
}

export default Home