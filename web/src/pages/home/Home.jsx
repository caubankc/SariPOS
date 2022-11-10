import React, { useState, useEffect } from 'react'
import AppLayout from '../../components/Layout';
import axios from 'axios';
import { Row, Col } from 'antd';
import Product from '../../components/Product'

const Home = () => {

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const getAllProducts = async () => {
      const { data } = await axios.get("/api/products");
      setProducts(data);
    };

    getAllProducts();
  }, []);

  return (
    <AppLayout>
      <Row>
        {products.map((product) => (
          <Col xs={24} sm={6} md={12} lg={6}>
            <Product product={product} />
          </Col>
        ))}
      </Row>
    </AppLayout >
  )
}

export default Home