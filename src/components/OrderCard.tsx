import React from 'react';
import { OrderDTO } from '../models/orderDTO';
import { ProductAggregateDTO } from '../models/productAggregateDTO';

interface OrderCardProps {
  order: OrderDTO;
}

const OrderCard: React.FC<OrderCardProps> = ({ order }) => {
  const totalPrice = order.orderProducts.reduce(
    (total, product) => total + product.price * product.quantity,
    0,
  );

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-4">
      <h2 className="text-xl mb-4">Order ID: {order.id}</h2>
      <p>Status: {order.orderStatus}</p>
      <p>Total Price: ${totalPrice.toFixed(2)}</p>
      <h3 className="text-lg mt-4 mb-2">Products:</h3>
      <ul>
        {order.orderProducts.map((product: ProductAggregateDTO) => (
          <li key={product.id}>
            {product.name}: ${product.price.toFixed(2)} x {product.quantity}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OrderCard;
