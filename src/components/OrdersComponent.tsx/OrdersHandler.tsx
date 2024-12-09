import { useEffect, useState } from "react";
import Order, { OrderStatus } from "../../types/Order";
import Loading from "../Utils/Loading";
import OrderService from "../../services/OrderService";
import ErrorDisplay from "../Utils/ErrorComponent";
import OrderComponent from "./OrderComponent";
import DatePicker from "react-datepicker";


export default function OrdersHandler(props: { onClickOrder: (order: Order) => void }) {

    const [orders, setOrders] = useState<Order[]>([]);
    const [initialOrders, setInitialOrders] = useState<Order[]>([]);

    const [currentDate, setCurrentDate] = useState<Date>(new Date());
    const [orderStatusPicker, setOrderStatusPicker] = useState<string>("All");

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);


    const handleOrders = async () => {
        setLoading(true);

        try {

            let response = await OrderService.getOrders(currentDate);

            if (response.success) {

                let orders = filterOrderHandler(response.data as Order[]);
                let initialOrders = filterOrderHandler(response.data as Order[]);
                setOrders(orders);
                setInitialOrders(initialOrders);

            } else {
                setError(response.message);
            }


        } catch (error: any) {
            setError(error.message);
        } finally {
            setLoading(false);
        }

    }

    const filterOrderHandler = (orders: Order[]) => {
        // Sort orders by status
        let ordersList = orders.sort((a, b) => {
            if (a.status === OrderStatus.ON_GOING) return -1;
            if (b.status === OrderStatus.ON_GOING) return 1;
            if (a.status === OrderStatus.COMPLETED) return -1;
            if (b.status === OrderStatus.COMPLETED) return 1;
            if (a.status === OrderStatus.CANCELLED) return -1;
            if (b.status === OrderStatus.CANCELLED) return 1;
            return 0;
        });

        return ordersList;
    }

    const handleDateSelect = (date: Date | null) => {
        if (date)
            setCurrentDate(date);
        else setCurrentDate(new Date());
    };

    const handleDateChange = (date: Date | null) => {
        if (date)
            setCurrentDate(date);
        else setCurrentDate(new Date());
    };

    const handleOnClickOrder = (order: Order) => {
        props.onClickOrder(order);
    }


    useEffect(() => {

        handleOrders();

    }, [currentDate]);


    if (loading) {
        <Loading />
    }

    useEffect(() => {
        let filteredOrders = initialOrders.filter((order) => {
            if (orderStatusPicker === "All") return true;
            return order.status === orderStatusPicker;
        });

        setOrders(filteredOrders);

    }, [orderStatusPicker]);


    return (
        <div className="overflow-auto h-full">
            {error && <ErrorDisplay message={error} />}
            <h1 className="primary-title">Orders</h1>
            <div className="label-input-container px-8 flex flex-row justify-evenly ">

                <select className="h-fit max-w-64 text-center" value={orderStatusPicker} onChange={(e) => setOrderStatusPicker(e.target.value)}>
                    <option value="All">All</option>
                    {Object.values(OrderStatus).map((status) => {
                        return <option key={status} value={status}>{status}</option>
                    })}
                </select>

                <DatePicker
                    showIcon={true}
                    toggleCalendarOnIconClick={true}
                    className='text-center cursor-pointer select-none '
                    selected={currentDate}
                    onSelect={handleDateSelect}
                    onChange={handleDateChange}
                    dateFormat="dd-MMM-yyyy"
                    wrapperClassName='mx-auto'
                />

                <button className="submit-button">New Order</button>



            </div>

            <div className="w-full h-fit flex flex-row flex-wrap gap-4 pl-8 ">
                {orders.map((order) => {
                    return <OrderComponent key={order.id} order={order} onClick={handleOnClickOrder} />
                })}
            </div>
        </div>
    )

}