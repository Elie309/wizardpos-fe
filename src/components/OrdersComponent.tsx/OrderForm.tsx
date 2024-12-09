import { useEffect, useState } from "react";
import Order, { OrderStatus, OrderType } from "../../types/Order"
import ErrorDisplay from "../Utils/ErrorComponent";
import SuccessDisplay from "../Utils/SuccessComponent";
import OrderService from "../../services/OrderService";

type OrderFormProps = {
    order: Order;
    isEdit: boolean;
    onSaveSuccessful: () => void;
    onClickEditProducts: () => void;
}

type IFormOrder = {
    reference: string;
    client_name: string;
    phone_number: string;
    type: OrderType;
    status: OrderStatus;
    date: Date;
    time: Date;
    notes: string;
}

export default function OrderForm(props: OrderFormProps) {

    const [formData, setFormData] = useState<IFormOrder>({
        reference: '',
        client_name: '',
        phone_number: '',
        type: OrderType.DINE_IN,
        status: OrderStatus.ON_GOING,
        date: new Date(),
        time: new Date(),
        notes: ''
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

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
            order.reference = formData.reference;
            order.client_id = props.order.client_id;
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

            props.onSaveSuccessful()
            setSuccess('Order saved successfully');
            setLoading(false);



        } catch (error: any) {
            setError(error.message);
        }

    }

    const handleEdit = () => {
        props.onClickEditProducts();
    }


    useEffect(() => {
        if (props.order) {
            setFormData({
                reference: props.order.reference,
                client_name: props.order.client_name,
                phone_number: props.order.phone_number,
                type: props.order.type,
                status: props.order.status,
                date: props.order.date,
                time: props.order.time,
                notes: props.order.notes || ''
            });
        }
    }, []);

    return (
        <div>
            {error && <ErrorDisplay message={error} />}
            {success && <SuccessDisplay message="Order saved successfully" />}
            <div className="label-input-container">
                <label htmlFor="reference">Reference</label>
                <input type="text" id="reference" readOnly={props.isEdit} name="reference"
                    value={formData.reference} onChange={handleChange} />
            </div>
            <div className="label-input-container">
                <label htmlFor="client_name">Client Name</label>
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

            <div className="label-input-container">
                <label htmlFor="date">Date</label>
                <input type="date" id="date" name="date"
                    value={formData.date.toISOString().split('T')[0]} onChange={handleChange} />
            </div>

            <div className="label-input-container">
                <label htmlFor="time">Time</label>
                <input type="time" id="time" name="time"
                    value={formData.time.toLocaleTimeString('en-GB', { hour12: false })} onChange={handleChange} />
            </div>

            <div className="label-input-container">
                <label htmlFor="notes">Notes</label>
                <textarea id="notes" name="notes"
                    value={formData.notes} onChange={handleChange}>
                </textarea>
            </div>

            <div className="flex flex-row justify-around my-4">
                <button className="reverse-button w-1/4" disabled={loading} onClick={handleEdit}>Edit Products</button>
                <button className="submit-button w-1/4" disabled={loading} onClick={handleSave}>Save</button>
            </div>


        </div>
    )
}