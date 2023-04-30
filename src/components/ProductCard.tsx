import React, { useEffect, useState } from 'react';
import { ProductAggregateDTO } from '../models/productAggregateDTO';
import { useCart } from '../context/CartContext';

interface ProductCardProps {
  product: ProductAggregateDTO;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);

  const handleQuantityChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setQuantity(parseInt(event.target.value));
  };

  useEffect(() => {
    product.quantity = quantity;
  }, [quantity, product]);

  return (
    <div className="w-1/2 p-2">
      <div className="bg-white shadow-md rounded p-4">
        <h2 className="text-xl font-bold mb-2">{product.name}</h2>
        <p className="text-gray-600">Price: ${product.price.toFixed(2)}</p>
        <div className="mt-4">
          <label htmlFor={`quantity-${product.id}`} className="mr-2">
            Quantity:
          </label>
          <select
            id={`quantity-${product.id}`}
            value={quantity}
            onChange={handleQuantityChange}
            className="border rounded px-2 py-1"
          >
            {[...Array(10)].map((_, index) => (
              <option key={index} value={index + 1}>
                {index + 1}
              </option>
            ))}
          </select>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded ml-4"
            onClick={() => addToCart(product)}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
