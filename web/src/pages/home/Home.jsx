import React, { useState, useEffect } from 'react'
import AppLayout from '../../components/Layout';
import axios from 'axios';
import { Row, Col } from 'antd';
import Product from '../../components/Product'
import { useDispatch } from 'react-redux';

const Home = () => {

  const dispatch = useDispatch();

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const getAllProducts = async () => {
      dispatch({ type: "SHOW_LOADING" })
      const { data } = await axios.get("/api/products");
      setProducts(data);
      dispatch({ type: "HIDE_LOADING" })
    };

    getAllProducts();
  }, [dispatch]);

  return (
    <AppLayout>
      <Row>
        {products.map((product) => (
          <Col xs={24} sm={24} md={12} lg={8} xl={6} xxl={4}>
            <Product key={product._id} product={product} />
          </Col>
        ))}
      </Row>
    </AppLayout >
  )
}

export default Home