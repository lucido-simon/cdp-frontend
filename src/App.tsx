import React from 'react';
import { CartProvider } from './context/CartContext';
import ProductList from './components/ProductList';
import Navbar from './components/Navbar';

const App: React.FC = () => {
  return (
    <CartProvider>
      <div className="container mx-auto px-4 py-8">
        <Navbar></Navbar>
        <ProductList />
      </div>
    </CartProvider>
  );
};

export default App;
