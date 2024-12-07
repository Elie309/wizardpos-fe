import { useEffect, useState } from "react";
import Order, {OrderStatus} from "../../types/Order";

type OrderItemProps = {
    order: Order;
    onClick: (order: Order) => void;
}


export default function OrderComponent(props: OrderItemProps) {
    const { order } = props;

    const [color, setColor] = useState('bg-blue-500');

    useEffect(() => {
        if (order.status === OrderStatus.ON_GOING) {
            setColor('border-green-500');
        } else if (order.status === OrderStatus.COMPLETED) {
            setColor('border-yellow-500');
        } else if (order.status === OrderStatus.CANCELLED) {
            setColor('border-red-500');
        }
    }, [order]);

    return (
        <div onClick={() => props.onClick(order)} className={`bg-white ${color} border shadow-lg text-sm p-2 
        rounded-lg w-52 cursor-pointer hover:scale-105`}>
            <p><strong>#</strong>{order.reference}</p>
            <p><strong>Client:</strong> {order.client_name}</p>
            <p><strong>Date:</strong> {order.getFormattedDate()}</p>
            <p><strong>Status:</strong> {order.status}</p>
        </div>
    );
}