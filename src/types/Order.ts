export interface Order {
    orderId: string;
    reservationId?: string;
    productName: string;
    quantity: number;
    price: number;
}