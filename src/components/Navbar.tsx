import React from 'react';
import CartSummary from './CartSummary';

const Navbar: React.FC = () => {
  return (
    <nav className="bg-blue-500 p-4 flex justify-between items-center">
      <h1 className="text-white text-2xl font-bold">Polystore</h1>
      <CartSummary />
    </nav>
  );
};

export default Navbar;
