
type IOrderItem = {
    order_id: string;
    order_item_id?: string;
    order_item_product_id: string;
    order_item_quantity: number;
    order_item_total: number;
}

export default class OrderItem {
    id: string;
    order_id: string;
    product_id: string;
    product_sku: string;
    product_name: string;
    product_price: number;
    quantity: number;
    total: number;
    created_at: Date;
    updated_at: Date;
    deleted_at: Date | null;

    constructor() {
        this.id = "0";
        this.order_id = '';
        this.product_id = '';
        this.product_sku = '';
        this.product_name = '';
        this.product_price = 0;
        this.quantity = 0;
        this.total = 0;
        this.created_at = new Date();
        this.updated_at = new Date();
        this.deleted_at = null;
    }

    static fromJson(data: any): OrderItem {
        const orderItem = new OrderItem();
        orderItem.id = data.order_item_id;
        orderItem.order_id = data.order_id;
        orderItem.product_id = data.order_item_product_id;
        orderItem.product_sku = data.product_sku;
        orderItem.product_name = data.product_name;
        orderItem.product_price = parseFloat(data.product_price);
        orderItem.quantity = parseInt(data.order_item_quantity);
        orderItem.total = parseFloat(data.order_item_total);
        // orderItem.created_at = new Date(data.order_item_created_at.date);
        // orderItem.updated_at = new Date(data.order_item_updated_at.date);
        // orderItem.deleted_at = data.order_item_deleted_at ? new Date(data.order_item_deleted_at.date) : null;
        return orderItem;
    }

    toFormData(): FormData {
        let formData = new FormData();
        formData.append('order_id', this.order_id);
        if (this.id.length > 0 || this.id !== '0' || this.id !== null || this.id !== undefined || this.id !== '') {
            formData.append('order_item_id', this.id);
        }
        formData.append('order_item_product_id', this.product_id);
        formData.append('order_item_quantity', this.quantity.toString());
        formData.append('order_item_total', this.total.toString());
        return formData;
    }

    toJson(): IOrderItem {

        if (this.id.length > 0 && this.id !== '0' && this.id !== null && this.id !== undefined && this.id !== '') {
            
            return {
                order_id: this.order_id,
                order_item_id: this.id,
                order_item_product_id: this.product_id,
                order_item_quantity: this.quantity,
                order_item_total: this.total
            }
        }

        return {
            order_id: this.order_id,
            order_item_product_id: this.product_id,
            order_item_quantity: this.quantity,
            order_item_total: this.total
        };
    }

    static fromJsonList(data: any[]): OrderItem[] {
        return data.map((orderItem) => OrderItem.fromJson(orderItem));
    }
}