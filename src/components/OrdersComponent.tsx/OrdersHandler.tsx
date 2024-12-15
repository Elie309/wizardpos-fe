import { useEffect, useState } from "react";
import Order, { OrderStatus } from "../../types/Order";
import OrderComponent from "./OrderComponent";
import DatePicker from "react-datepicker";

type OrdersHandlerProps = {
    onClickOrder: (order: Order) => void;
    onClickNewOrder: () => void;
    onProductsButtonClick: () => void;
    onDoubleClickOrder: (order: Order) => void;
    onDateChange: (date: Date) => void;
    currentDate: Date;
    orders: Order[];
}

export default function OrdersHandler(props: OrdersHandlerProps) {

    const [orders, setOrders] = useState<Order[]>(props.orders);

    const [currentDate, setCurrentDate] = useState<Date>(props.currentDate);


    const filterOrderHandler = (orders: Order[]) => {
        // Sort orders by status
        let onGoingOrders = orders.filter(order => order.status === OrderStatus.ON_GOING);
        let completedOrders = orders.filter(order => order.status === OrderStatus.COMPLETED);
        let cancelledOrders = orders.filter(order => order.status === OrderStatus.CANCELLED);

        return { onGoingOrders, completedOrders, cancelledOrders };
    }

    const handleDateSelect = (date: Date | null) => {
        if (date)
            setCurrentDate(date);
        else setCurrentDate(new Date());

        props.onDateChange(date || new Date());

    };

    const handleDateChange = (date: Date | null) => {
        if (date)
            setCurrentDate(date);
        else setCurrentDate(new Date());

        props.onDateChange(date || new Date());
    };

    const handleOnClickOrder = (order: Order) => {
        props.onClickOrder(order);
    }

    const handleOnDoubleClickOrder = (order: Order) => {
        props.onDoubleClickOrder(order);
    }


    useEffect(() => {
        const { onGoingOrders, completedOrders, cancelledOrders } = filterOrderHandler(props.orders);
        setOrders([...onGoingOrders, ...completedOrders, ...cancelledOrders]);
    }, [props.orders]);



    return (
        <div className="overflow-auto flex flex-col h-full">

            <h1 className="primary-title">Orders</h1>
            <div className="label-input-container px-8 flex flex-row justify-between ">

                <button tabIndex={-1} className="neutral-button" onClick={props.onProductsButtonClick} >Products</button>


                <DatePicker
                    tabIndex={-1}
                    showIcon={true}
                    toggleCalendarOnIconClick={true}
                    className='text-center cursor-pointer select-none '
                    selected={currentDate}
                    onSelect={handleDateSelect}
                    onChange={handleDateChange}
                    dateFormat="dd-MMM-yyyy"
                    wrapperClassName='text-xl flex flex-row items-center'
                />

                <button tabIndex={-1} className="submit-button" onClick={props.onClickNewOrder} >New Order</button>

            </div>

            <h2 className="secondary-title">On-going</h2>

            <div className="w-full h-fit flex flex-row flex-wrap gap-4 pl-8 ">
                {orders.filter(order => order.status === OrderStatus.ON_GOING).map((order) => {
                    return <OrderComponent
                        key={order.id}
                        order={order}
                        onClick={handleOnClickOrder}
                        onDoubleClick={handleOnDoubleClickOrder}
                    />
                })}
            </div>

            <h2 className="secondary-title">Completed</h2>

            <div className="w-full h-fit flex flex-row flex-wrap gap-4 pl-8 ">
                {orders.filter(order => order.status === OrderStatus.COMPLETED).map((order) => {
                    return <OrderComponent
                        key={order.id}
                        order={order}
                        onClick={handleOnClickOrder}
                        onDoubleClick={handleOnDoubleClickOrder}
                    />
                })}
            </div>

            <h2 className="secondary-title">Cancelled</h2>

            <div className="w-full h-fit flex flex-row flex-wrap gap-4 pl-8 ">
                {orders.filter(order => order.status === OrderStatus.CANCELLED).map((order) => {
                    return <OrderComponent
                        key={order.id}
                        order={order}
                        onClick={handleOnClickOrder}
                        onDoubleClick={handleOnDoubleClickOrder}
                    />
                })}
            </div>
        </div>
    )

}