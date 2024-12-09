import OrderItem from "../types/OrderItem";
import api from "../utils/Axios";
import ServicesErrorHandler from "./ServicesErrorHandler";

type IOrderItemService = {
    success: boolean;
    message: string;
    data: OrderItem | OrderItem[] | null;
}

export default class OrderItemService {

    static async getItems(order_id: string): Promise<IOrderItemService> {
        try {
            let response = await api.get(`/orders/${order_id}/items`);
            if (response.status === 200) {
                let items = response.data.data.map((item: any) => OrderItem.fromJson(item));
                return {
                    success: true,
                    message: 'Order items fetched successfully',
                    data: items
                };
            }
            return {
                success: false,
                message: 'Failed to fetch order items',
                data: null
            }
        } catch (error: any) {
            return ServicesErrorHandler(error);
        }
    }

    static async addOne(orderItem: OrderItem): Promise<IOrderItemService> {
        try {
            let response = await api.post(`/orders/${orderItem.order_id}/items`, orderItem.toFormData());
            if (response.status === 201) {
                let item = OrderItem.fromJson(response.data.data);
                return {
                    success: true,
                    message: 'Order item added successfully',
                    data: item
                };
            }
            return {
                success: false,
                message: 'Failed to add order item',
                data: null
            }
        } catch (error: any) {
            return ServicesErrorHandler(error);
        }
    }

    static async deleteOne(order_id: string, item_id: string): Promise<IOrderItemService> {
        try {
            let response = await api.delete(`/orders/${order_id}/items/${item_id}`);
            if (response.status === 200) {
                return {
                    success: true,
                    message: 'Order item deleted successfully',
                    data: null
                };
            }
            return {
                success: false,
                message: 'Failed to delete order item',
                data: null
            }
        } catch (error: any) {
            return ServicesErrorHandler(error);
        }
    }

    static async bulkAdd(order_id: string, items: OrderItem[]): Promise<IOrderItemService> {
        try {
            let payload = {
                items: items.map(item => ({
                    order_item_product_id: item.product_id,
                    order_item_quantity: item.quantity,
                    order_item_total: item.total
                }))
            };
            let response = await api.post(`/orders/${order_id}/items/bulk`, payload.items);
            if (response.status === 201) {
                let items = response.data.data.map((item: any) => OrderItem.fromJson(item));
                return {
                    success: true,
                    message: 'Order items added successfully',
                    data: items
                };
            }
            return {
                success: false,
                message: 'Failed to add order items',
                data: null
            }
        } catch (error: any) {
            return ServicesErrorHandler(error);
        }
    }

 
}