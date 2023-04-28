import { StockDTO } from './stockDTO';
import { OrderStatus } from './orderStatus';

export interface OrderDTO {
  id: string;
  userId: string;
  paymentId: string;
  shipmentId: string;
  orderStatus: OrderStatus;
  orderProducts: StockDTO[];
}
