import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'antd/dist/antd.css';
import './App.css';
import Home from './pages/home/Home';
import Products from './pages/products/Products';
import Cart from './pages/cart/Cart';
import { useState, useEffect } from 'react';
import axios from 'axios';

function App() {

  // const [ip, setIP] = useState('');

  // useEffect(() => {
  //   const getData = async () => {
  //     const res = await axios.get('https://geolocation-db.com/json/')
  //     console.log(res.data);
  //     setIP(res.data.IPv4);
  //     await axios.post('/api/visits', res.data);
  //   };
  //   getData();
  // }, [])

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home></Home>} />
          <Route path="/products" element={<Products></Products>} />
          <Route path="/cart" element={<Cart></Cart>} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
