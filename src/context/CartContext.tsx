import React, { createContext, useContext, useState } from 'react';
import { ProductAggregateDTO } from '../models/productAggregateDTO';
import { apiService } from '../services/APIService';

interface CartContextData {
  items: ProductAggregateDTO[];
  addToCart: (product: ProductAggregateDTO, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  order: () => void;
}

const CartContext = createContext<CartContextData>({} as CartContextData);

export const CartProvider = (props: React.PropsWithChildren<{}>) => {
  const [items, setItems] = useState<ProductAggregateDTO[]>([]);

  const addToCart = (product: ProductAggregateDTO, quantity: number = 1) => {
    const itemIndex = items.findIndex((item) => item.id === product.id);
    if (itemIndex > -1) {
      const newItems = [...items];
      newItems[itemIndex].quantity += quantity;
      setItems(newItems);
    } else {
      setItems([...items, { ...product, quantity }]);
    }
  };

  const removeFromCart = (productId: string) => {
    setItems(items.filter((item) => item.id !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    const itemIndex = items.findIndex((item) => item.id === productId);
    if (itemIndex > -1) {
      const newItems = [...items];
      newItems[itemIndex].quantity = quantity;
      setItems(newItems);
    }
  };

  const order = async () => {
    const order = await apiService.createOrder();
    setItems([]);
    return order;
  };

  return (
    <CartContext.Provider value={{ items, addToCart, removeFromCart, updateQuantity, order }}>
      {props.children}
    </CartContext.Provider>
  );
};

export function useCart(): CartContextData {
  const context = useContext(CartContext);
  return context;
}
