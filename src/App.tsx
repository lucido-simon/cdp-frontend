import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Navbar from './components/Navbar';
import ProductList from './components/ProductList';
import { CartProvider } from './context/CartContext';
import OrderList from './components/OrderList';

const App: React.FC = () => {
  return (
    <CartProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<ProductList />}></Route>
          <Route path="/orders" element={<OrderList />}></Route>
        </Routes>
      </BrowserRouter>
      <ToastContainer />
      <div className="container mx-auto"></div>
    </CartProvider>
  );
};

export default App;
