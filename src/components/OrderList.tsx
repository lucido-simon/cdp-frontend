import React, { useState, useEffect } from 'react';
import OrderCard from './OrderCard';
import { OrderDTO } from '../models/orderDTO';
import { apiService } from '../services/APIService';

const OrderList: React.FC = () => {
  const [orders, setOrders] = useState<OrderDTO[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const fetchedOrders = await apiService.getOrders();
        setOrders(fetchedOrders);
      } catch (error) {
        console.error('Failed to fetch orders:', error);
      }
    })();
  }, []);

  return (
    <div>
      {orders.map((order) => (
        <OrderCard key={order.id} order={order} />
      ))}
    </div>
  );
};

export default OrderList;
