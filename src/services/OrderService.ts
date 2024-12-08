import Order from "../types/Order";
import api from "../utils/Axios";
import ServicesErrorHandler from "./ServicesErrorHandler";

type IOrderService = {
    success: boolean;
    message: string;
    data: Order | Order[] | null;
}

export default class OrderService {

    static async getOrders(date: Date): Promise<IOrderService> {
        try {
            let response = await api.get('/orders?date=' + date.toISOString().split('T')[0]);
            if (response.status === 200) {
                let orders = response.data.data.map((order: any) => Order.fromJson(order));
                return {
                    success: true,
                    message: 'Orders fetched successfully',
                    data: orders
                };
            }
            return {
                success: false,
                message: 'Failed to fetch orders',
                data: null
            }
        } catch (error: any) {
            return ServicesErrorHandler(error);
        }
    }

    static async getOrder(order_id: string): Promise<IOrderService> {
        try {
            let response = await api.get('/orders/' + order_id);
            if (response.status === 200) {
                let order = Order.fromJson(response.data.data);
                return {
                    success: true,
                    message: 'Order fetched successfully',
                    data: order
                };
            }
            return {
                success: false,
                message: 'Failed to fetch order',
                data: null
            }
        } catch (error: any) {
            return ServicesErrorHandler(error);
        }
    }

    static async createOrder(order: Order): Promise<IOrderService> {
        try {
            let response = await api.post('/orders', order.toFormData());
            if (response.status === 201) {
                let order = Order.fromJson(response.data.data);
                return {
                    success: true,
                    message: 'Order created successfully',
                    data: order
                };
            }
            return {
                success: false,
                message: 'Failed to create order',
                data: null
            }
        } catch (error: any) {
            return ServicesErrorHandler(error);
        }
    }

    static async updateOrder(order_id: string, order: Order): Promise<IOrderService> {
        try {
            let response = await api.post('/orders/' + order_id, order.toFormData());
            if (response.status === 200) {
                let order = Order.fromJson(response.data.data);
                return {
                    success: true,
                    message: 'Order updated successfully',
                    data: order
                };
            }
            return {
                success: false,
                message: 'Failed to update order',
                data: null
            }
        } catch (error: any) {
            return ServicesErrorHandler(error);
        }
    }

    static async deleteOrder(order_id: number): Promise<IOrderService> {
        try {
            let response = await api.delete('/orders/' + order_id);
            if (response.status === 200) {
                return {
                    success: true,
                    message: 'Order deleted successfully',
                    data: null
                };
            }
            return {
                success: false,
                message: 'Failed to delete order',
                data: null
            }
        } catch (error: any) {
            return ServicesErrorHandler(error);
        }
    }
}