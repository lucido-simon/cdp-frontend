import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { ProductAggregateDTO } from '../models/productAggregateDTO';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const CartSummary: React.FC = () => {
  const { items, removeFromCart } = useCart();
  const [isOpen, setIsOpen] = useState(false);

  const totalItems = items.reduce((total, item) => total + item.quantity, 0);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleOrder = () => {
    // Handle order creation here
  };

  return (
    <div className="relative">
      <button className="text-white px-2 py-1 rounded bg-blue-500" onClick={toggleMenu}>
        <FontAwesomeIcon icon={faShoppingCart} />({totalItems})
      </button>
      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-white shadow-md rounded border p-4">
          {items.length > 0 && (
            <span>
              {items.map((item: ProductAggregateDTO & { quantity: number }) => (
                <div key={item.id} className="flex justify-between items-center mb-2">
                  <span>
                    {item.name} x{item.quantity}
                  </span>
                  <button className="text-red-500" onClick={() => removeFromCart(item.id)}>
                    Remove
                  </button>
                </div>
              ))}
              <h1>
                Total: $
                {items.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2)}
              </h1>
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded mt-4 w-full"
                onClick={handleOrder}
              >
                Order
              </button>
            </span>
          )}
          {items.length === 0 && <p className="text-gray-600">No items in cart.</p>}
        </div>
      )}
    </div>
  );
};

export default CartSummary;
