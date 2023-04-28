import axios, { AxiosResponse } from 'axios';
import { apiConfig } from '../config/apiConfig';
import { ProductAggregateDTO } from '../models/productAggregateDTO';
import { OrderDTO } from '../models/orderDTO';

class APIService {
  private api = axios.create({
    baseURL: apiConfig.baseURL,
  });

  async getProducts(): Promise<ProductAggregateDTO[]> {
    const response: AxiosResponse<ProductAggregateDTO[]> = await this.api.get('/api/v1/products');
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
    return response.data;
  }

  async getOrder(id: string): Promise<OrderDTO> {
    const response: AxiosResponse<OrderDTO> = await this.api.get(`/api/v1/orders/${id}`);
    return response.data;
  }

  async createOrder(): Promise<void> {
    await this.api.post('/api/v1/order');
  }
}

export const apiService = new APIService();
