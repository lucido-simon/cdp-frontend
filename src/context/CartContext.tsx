import React, { createContext, useContext, useEffect, useState } from 'react';
import { ProductAggregateDTO } from '../models/productAggregateDTO';
import { apiService } from '../services/APIService';
import { toast } from 'react-toastify';

interface CartContextData {
  items: ProductAggregateDTO[];
  addToCart: (product: ProductAggregateDTO) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  order: () => void;
}

const CartContext = createContext<CartContextData>({} as CartContextData);

export const CartProvider = (props: React.PropsWithChildren<{}>) => {
  const [items, setItems] = useState<ProductAggregateDTO[]>([]);

  useEffect(() => {
    (async () => {
      const [products, cartsProducts] = await Promise.all([
        apiService.getProducts(),
        apiService.getCart(),
      ]).catch(() => {
        toast.error('Error loading cart');
        return [[], []];
      });
      const cart = products.flatMap((product) => {
        const cartProduct = cartsProducts.find((cartProduct) => cartProduct.id === product.id);
        return cartProduct ? [{ ...product, quantity: cartProduct.quantity }] : [];
      });
      setItems(cart);
    })();
  }, []);

  const addToCart = async (product: ProductAggregateDTO) => {
    try {
      await apiService.addToCart(product);
      const itemIndex = items.findIndex((item) => item.id === product.id);
      if (itemIndex > -1) {
        const newItems = [...items];
        newItems[itemIndex].quantity += product.quantity;
        setItems(newItems);
      } else {
        setItems([...items, { ...product }]);
      }
      toast.success('Product added to cart');
    } catch (error) {
      toast.error('Error adding product to cart');
    }
  };

  const removeFromCart = async (productId: string) => {
    const item = items.find((item) => item.id === productId);
    if (item) {
      try {
        await apiService.addToCart({ ...item, quantity: -item.quantity });
        setItems(items.filter((item) => item.id !== productId));
        toast.success('Product removed from cart');
      } catch (error) {
        toast.error('Error removing product from cart');
      }
    }
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
