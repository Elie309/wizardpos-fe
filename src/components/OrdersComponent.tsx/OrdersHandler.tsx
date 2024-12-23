import { useEffect, useState } from "react";
import Order, { OrderStatus } from "../../types/Order";
import OrderComponent from "./OrderComponent";
import DatePicker from "react-datepicker";
import { useNavigate } from "react-router-dom";

type OrdersHandlerProps = {
    onClickOrder: (order: Order) => void;
    onClickNewOrder: () => void;
    onProductsButtonClick: () => void;
    onDoubleClickOrder: (order: Order) => void;
    onDateChange: (date: string) => void;
    currentDate: string;
    orders: Order[];
}

export default function OrdersHandler(props: OrdersHandlerProps) {

    const [orders, setOrders] = useState<Order[]>(props.orders);

    const [currentDate, setCurrentDate] = useState<string>(props.currentDate);

    const navigate = useNavigate();


    const filterOrderHandler = (orders: Order[]) => {
        // Sort orders by status
        let onGoingOrders = orders.filter(order => order.status === OrderStatus.ON_GOING);
        let completedOrders = orders.filter(order => order.status === OrderStatus.COMPLETED);
        let cancelledOrders = orders.filter(order => order.status === OrderStatus.CANCELLED);

        return { onGoingOrders, completedOrders, cancelledOrders };
    }

    const handleDateSelect = (date: Date | null) => {
        let dateStr = date?.toLocaleDateString("en-CA") || new Date().toLocaleDateString("en-CA");
        setCurrentDate(dateStr);

        props.onDateChange(dateStr);

    };

    const handleDateChange = (date: Date | null) => {

        let dateStr = date?.toLocaleDateString("en-CA") || new Date().toLocaleDateString("en-CA");
        setCurrentDate(dateStr);

        props.onDateChange(dateStr);
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

            <div className='flex flex-row px-8 no-print'>
                <button onClick={() => navigate("/")} className="mr-8 cursor-pointer no-print">
                    <div className="flex flex-row items-center gap-2 text-dark">
                        <svg
                            viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="size-6 text-dark fill-none">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3" />
                        </svg>
                        Home
                    </div>
                </button>
                <h1 className="primary-title">Orders</h1>
            </div>
            <div className="label-input-container px-8 flex flex-row">

                <button tabIndex={-1} className="neutral-button" onClick={props.onProductsButtonClick} >Products</button>


                <DatePicker
                    tabIndex={-1}
                    showIcon={true}
                    toggleCalendarOnIconClick={true}
                    className='text-center cursor-pointer select-none '
                    selected={new Date(currentDate)}
                    onSelect={handleDateSelect}
                    onChange={handleDateChange}
                    dateFormat="dd-MMM-yyyy"
                    wrapperClassName='text-xl mx-auto flex flex-row items-center'
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

            <h2 className="secondary-title">Completed / Invoiced</h2>

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