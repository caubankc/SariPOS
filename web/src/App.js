import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'antd/dist/antd.css';
import './App.css';
import Home from './pages/home/Home';
import Products from './pages/products/Products';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={ <Home></Home>} />
          <Route path="/products" element={ <Products></Products>} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
