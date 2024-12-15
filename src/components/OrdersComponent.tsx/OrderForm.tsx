import { useEffect, useRef, useState } from "react";
import Order, { OrderStatus, OrderType } from "../../types/Order"
import ErrorDisplay from "../Utils/ErrorComponent";
import SuccessDisplay from "../Utils/SuccessComponent";
import OrderService from "../../services/OrderService";
import Popover from "../Utils/Popover";
import ClientPopHandler from "../ClientHelper/ClientPopHandler";
import Client from "../../types/Client";
import TimePicker from "../TimePicker/TimePicker";

type OrderFormProps = {
    order: Order;
    isEdit: boolean;
    onSaveSuccessful: (order: Order) => void;
}

type IFormOrder = {
    client_id: string;
    client_name: string;
    phone_number: string;
    type: OrderType;
    status: OrderStatus;
    date: string;
    time: string;
    notes: string;
}

export default function OrderForm(props: OrderFormProps) {

    const [formData, setFormData] = useState<IFormOrder>({
        client_id: '',
        client_name: '',
        phone_number: '',
        type: OrderType.DINE_IN,
        status: OrderStatus.ON_GOING,
        date: new Date().toISOString(),
        time: '00:00',
        notes: ''
    });

    const [orderItems, setOrderItems] = useState(props.order.order_items);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const clientHandlerRef = useRef<{ open: () => void, close: () => void }>(null);


    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSave = async () => {
        setLoading(true);
        setError('');
        setSuccess('');
        try {
            // Save Order

            let order = new Order();
            order.client_id = formData.client_id;
            order.client_name = formData.client_name;
            order.phone_number = formData.phone_number;
            order.type = formData.type;
            order.status = formData.status;
            order.date = formData.date;
            order.time = formData.time;
            order.notes = formData.notes;


            let response = null;

            if (props.isEdit) {
                response = await OrderService.updateOrder(props.order.id, order);
            } else {
                response = await OrderService.createOrder(order);
            }
            if (!response.success) {
                setLoading(false);
                setError(response.message);
                return;
            }

            let newOrder = response.data as Order;
            newOrder.client_name = formData.client_name;
            newOrder.phone_number = formData.phone_number;
            newOrder.employee_name = props.order.employee_name;
            newOrder.order_items = orderItems;

            props.onSaveSuccessful(newOrder);
            setSuccess('Order saved successfully');
            setLoading(false);



        } catch (error: any) {
            setError(error.message);
        }

    }

    const handleClientSelect = (client: Client) => {

        setFormData({
            ...formData,
            client_id: client.client_id! || '',
            client_name: client.client_first_name + " " + client.client_last_name,
            phone_number: client.client_phone_number
        });

        clientHandlerRef.current?.close();
    }



    useEffect(() => {
        if (props.order) {
            setFormData({
                client_id: props.order.client_id,
                client_name: props.order.client_name,
                phone_number: props.order.phone_number,
                type: props.order.type,
                status: props.order.status,
                date: props.order.date,
                time: props.order.time,
                notes: props.order.notes || ''
            });
            setOrderItems(props.order.order_items);

        }


    }, []);

    return (
        <div>
            {error && <ErrorDisplay message={error} />}
            {success && <SuccessDisplay message="Order saved successfully" />}
            <div className="label-input-container text-center">
                <p className="text-gray-800 text-base italic font-semibold">#{props.order.reference}</p>
            </div>
            <div className="label-input-container">
                <div className="flex flex-row justify-between">
                    <label htmlFor="client_name">Client Name</label>
                    <Popover ref={clientHandlerRef}
                        id="client-form"
                        buttonName="Find Client"
                        title="Client Search"
                        classNameButton="link-primary"
                        classNameMainDiv="max-w-3xl"
                        useButton={true}
                    >
                        <ClientPopHandler
                            onClientSelect={handleClientSelect}
                        />
                    </Popover>
                </div>
                <input type="text" id="client_name" readOnly
                    name="client_name" value={formData.client_name} onChange={handleChange} />
            </div>
            <div className="label-input-container">
                <label htmlFor="phone_number">Phone Number</label>
                <input type="text" id="phone_number" readOnly
                    name="phone_number" value={formData.phone_number} onChange={handleChange} />
            </div>

            <div className="label-input-container grid grid-cols-2 gap-2">
                <select name="type" id="type" value={formData.type} onChange={handleChange}>
                    <option value={OrderType.DINE_IN}>Dine In</option>
                    <option value={OrderType.TAKE_AWAY}>Take Out</option>
                    <option value={OrderType.DELIVERY}>Delivery</option>
                </select>
                <select name="status" id="status" value={formData.status} onChange={handleChange}>
                    <option value={OrderStatus.ON_GOING}>On Going</option>
                    <option value={OrderStatus.COMPLETED}>Completed</option>
                    <option value={OrderStatus.CANCELLED}>Cancelled</option>
                </select>
            </div>

            <div className="flex flex-row w-full items-center justify-between">

                <div className="label-input-container w-1/2">
                    <label htmlFor="date">Date</label>
                    <input type="date" id="date" name="date"
                        value={formData.date} onChange={handleChange} />
                </div>
                <div className="flex flex-col w-1/2">

                    <label htmlFor="time" className="main-label">Time</label>
                    <TimePicker
                        initialTime={formData.time}
                        onChange={(time) => {
                            setFormData({
                                ...formData,
                                time: time
                            });
                        }}
                    />
                </div>

            </div>

            <div className="label-input-container">
                <label htmlFor="notes">Notes</label>
                <textarea id="notes" name="notes"
                    value={formData.notes} onChange={handleChange}>
                </textarea>
            </div>

            <div className="flex flex-row justify-around my-4">
                <button className="submit-button w-1/4" disabled={loading} onClick={handleSave}>Save</button>
            </div>


        </div>
    )
}