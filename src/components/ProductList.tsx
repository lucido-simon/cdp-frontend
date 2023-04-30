import React, { useEffect, useState } from 'react';
import ProductCard from './ProductCard';
import { ProductAggregateDTO } from '../models/productAggregateDTO';
import { apiService } from '../services/APIService';

const ProductList: React.FC = () => {
  const [products, setProducts] = useState<ProductAggregateDTO[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await apiService.getProducts();
        setProducts(response);
      } catch (error) {
        console.error('Failed to fetch products:', error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="flex flex-wrap">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductList;
