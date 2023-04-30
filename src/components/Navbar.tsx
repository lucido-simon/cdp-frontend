import React from 'react';
import CartSummary from './CartSummary';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
  return (
    <nav className="bg-blue-500 p-4 flex justify-between items-center">
      {' '}
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white text-xl">
          Polystore
        </Link>
        <div className="flex items-center">
          <CartSummary />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
