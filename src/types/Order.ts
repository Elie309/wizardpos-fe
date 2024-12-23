import OrderItem from "./OrderItem";

export enum OrderStatus {
    ON_GOING = 'on-going',
    COMPLETED = 'completed',
    CANCELLED = 'cancelled'
}

export enum OrderType {
    TAKE_AWAY = 'take-away',
    DINE_IN = 'dine-in',
    DELIVERY = 'delivery'
}


export default class Order {
    id: string;
    client_id: string;
    client_name: string;
    phone_number: string;
    employee_id: string;
    employee_name: string;
    type: OrderType;
    reference: string;
    date: string;
    time: string;
    notes: string;
    subtotal: number| null;
    discount: number | null;
    tax: number | null;
    total: number | null;
    status: OrderStatus;
    created_at: Date;
    updated_at: Date;
    deleted_at: Date | null;

    order_items: OrderItem[] = [];

    constructor() {
        this.id = "0";
        this.client_id = '';
        this.client_name = '';
        this.phone_number = '';
        this.employee_id = '';
        this.employee_name = '';
        this.type = OrderType.DINE_IN;
        this.reference = '';
        this.date = new Date().toLocaleDateString("en-CA");
        this.time = "00:00";
        this.notes = '';
        this.subtotal = 0;
        this.discount = 0;
        this.tax = 0.11;
        this.total = 0;
        this.status = OrderStatus.ON_GOING;
        this.created_at = new Date();
        this.updated_at = new Date();
        this.deleted_at = null;
    }

    static fromJson(data: any): Order {
        const order = new Order();
        order.id = data.order_id;
        order.client_id = data.order_client_id;
        order.client_name = data.client_name;
        order.phone_number = data.client_phone_number;
        order.employee_id = data.order_employee_id;
        order.employee_name = data.employee_name;
        order.type = data.order_type;
        order.reference = data.order_reference;
        order.date = data.order_date;
        order.time = data.order_time;
        order.notes = data.order_note;
        order.subtotal = parseFloat(data.order_subtotal);
        order.discount = parseFloat(data.order_discount);
        order.tax = parseFloat(data.order_tax);
        order.total = parseFloat(data.order_total);
        order.status = data.order_status;

        if (data.order_items) {
            data.order_items.forEach((item: any) => {
                order.order_items.push(OrderItem.fromJson(item));
            });
        }
        return order;
    }

    toFormData(): FormData {
        let formData = new FormData();
        formData.append('order_client_id', this.client_id);
        formData.append('order_employee_id', this.employee_id);
        formData.append('order_type', this.type);
        formData.append('order_status', this.status);
        formData.append('order_reference', this.reference);
        formData.append('order_date', this.date);
        formData.append('order_time', this.time);
        formData.append('order_note', this.notes);

        if (this.subtotal != null) formData.append('order_subtotal', this.subtotal.toString());
        if (this.discount != null) formData.append('order_discount', this.discount.toString());
        if (this.tax != null) formData.append('order_tax', this.tax.toString());
        if (this.total != null) formData.append('order_total', this.total.toString());
        
        return formData;
    }

    static fromJsonList(data: any[]): Order[] {
        return data.map((order) => Order.fromJson(order));
    }
}