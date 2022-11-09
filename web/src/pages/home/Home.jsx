import React, { useState, useEffect } from 'react'
import AppLayout from '../../components/Layout';
import axios from 'axios';
import { Table, Space, Tag, Button } from 'antd';

const Home = () => {

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  return (
    <AppLayout>
      <h2>Home</h2>
    </AppLayout>
  )
}

export default Home