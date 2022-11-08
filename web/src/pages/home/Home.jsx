import React, { useState, useEffect } from 'react'
import AppLayout from '../../components/Layout';
import axios from 'axios';
import { Row, Col } from 'antd';
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

  return (
    <AppLayout>
      <h2>Home</h2>
      <Row>
        {productData.map((product) => {
          <Col xs={24} sm={6} md={12} lg={12}>
            <Product></Product>
          </Col>
        })}
      </Row>
    </AppLayout>
  )
}

export default Home