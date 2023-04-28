export enum OrderStatus {
  OrderCheckout = 'OrderCheckout',
  OrderCreated = 'OrderCreated',
  OrderPrepared = 'OrderPrepared',
  OrderProcessingPayment = 'OrderProcessingPayment',
  OrderPaid = 'OrderPaid',
  OrderDelivering = 'OrderDelivering',
  OrderDelivered = 'OrderDelivered',
  OrderCreationFailed = 'OrderCreationFailed',
  OrderPreparationFailed = 'OrderPreparationFailed',
  OrderPaymentFailed = 'OrderPaymentFailed',
  OrderDeliveryFailed = 'OrderDeliveryFailed',
}
