import axios, { AxiosResponse } from 'axios';
import { apiConfig } from '../config/apiConfig';
import { ProductAggregateDTO } from '../models/productAggregateDTO';
import { OrderDTO } from '../models/orderDTO';

class APIService {
  private api = axios.create({
    baseURL: apiConfig.baseURL,
  });

  private products: ProductAggregateDTO[] = [];

  async getProducts(): Promise<ProductAggregateDTO[]> {
    const response: AxiosResponse<ProductAggregateDTO[]> = await this.api.get('/api/v1/products');
    this.products = response.data;
    return response.data;
  }

  async getProduct(id: string): Promise<ProductAggregateDTO> {
    const response: AxiosResponse<ProductAggregateDTO> = await this.api.get(
      `/api/v1/products/${id}`,
    );
    return response.data;
  }

  async getOrders(): Promise<OrderDTO[]> {
    const response: AxiosResponse<OrderDTO[]> = await this.api.get('/api/v1/orders');
    const orders = response.data;
    return orders.flatMap((order) => {
      const products = order.orderProducts.flatMap((orderProduct) => {
        const aggregate = this.products.find((cartProduct) => cartProduct.id === orderProduct.id);
        return aggregate
          ? [{ ...aggregate, price: orderProduct.price, quantity: orderProduct.quantity }]
          : [];
      });
      return { ...order, orderProducts: products };
    });
  }

  async getOrder(id: string): Promise<OrderDTO> {
    const response: AxiosResponse<OrderDTO> = await this.api.get(`/api/v1/orders/${id}`);
    return response.data;
  }

  async addToCart(product: ProductAggregateDTO) {
    const response = await this.api.post('/api/v1/cart', product);
    return response.data;
  }

  async getCart(): Promise<ProductAggregateDTO[]> {
    const response: AxiosResponse<{ products: ProductAggregateDTO[] }> = await this.api.get(
      '/api/v1/cart',
    );
    return response.data.products;
  }

  async createOrder(): Promise<String> {
    const response = await this.api.post('/api/v1/order');
    return response.data;
  }
}

export const apiService = new APIService();
