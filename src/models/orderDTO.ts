import { OrderStatus } from './orderStatus';
import { ProductAggregateDTO } from './productAggregateDTO';

export interface OrderDTO {
  id: string;
  userId: string;
  paymentId: string;
  shipmentId: string;
  orderStatus: OrderStatus;
  orderProducts: ProductAggregateDTO[];
}
