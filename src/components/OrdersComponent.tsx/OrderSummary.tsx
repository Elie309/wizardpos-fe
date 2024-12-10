import { useEffect, useState } from 'react';
import OrderItem from '../../types/OrderItem';
import EditIcon from '../Icons/EditIcon';
import PrintIcon from '../Icons/PrintIcon';
import Order from '../../types/Order';
import OrderService from '../../services/OrderService';
import OrderItemService from '../../services/OrderItemService';
import ErrorDisplay from '../Utils/ErrorComponent';
import SuccessDisplay from '../Utils/SuccessComponent';

interface OrderSummaryProps {
  order: Order;
  orderItems: OrderItem[];
  onRemoveItem: (id: string) => void;
  onClickReset: () => void;
}

export default function OrderSummary(props: OrderSummaryProps) {

  const [editing, setEditing] = useState(false);

  const [total, setTotal] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [tax, setTax] = useState(0);
  const [subtotal, setSubtotal] = useState(0);

  const [notes, setNotes] = useState(props.order.notes);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSaveOrder = async () => {
    setEditing(false);
    setLoading(true);
    setError('');
    setSuccess('');
    try {

      let newOrder = new Order();
      newOrder.id = props.order.id;
      newOrder.reference = props.order.reference;
      newOrder.client_id = props.order.client_id;
      newOrder.client_name = props.order.client_name;
      newOrder.employee_id = props.order.employee_id;
      newOrder.employee_name = props.order.employee_name;
      newOrder.type = props.order.type;
      newOrder.status = props.order.status;
      newOrder.date = props.order.date;
      newOrder.time = props.order.time;
      newOrder.notes = notes;
      newOrder.total = total;
      newOrder.discount = discount;
      newOrder.tax = tax;
      newOrder.subtotal = subtotal;


      let responseOrder = await OrderService.updateOrder(props.order.id, newOrder);

      if (!responseOrder.success) {
        setError(responseOrder.message);
        return;
      }

      let responseOrderItems = await OrderItemService.bulkAdd(props.order.id, props.orderItems);


      if (!responseOrderItems.success) {
        setError(responseOrderItems.message);
        return;
      }

      setSuccess('Order saved successfully');


    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  const handleCancelChanges = () => {
    setEditing(false);
    setNotes(props.order.notes);
    setDiscount(0);
    props.onClickReset();
  }

  const handleRemoveItem = (id: string) => () => {
    props.onRemoveItem(id);
  }

  const handlePrint = () => {
    window.print();
  }

  const calculateTotal = () => {
    return props.orderItems.reduce((total, item) => total + item.total, 0);
  }

  useEffect(() => {
    setTotal(calculateTotal() - discount);
  }, [props.orderItems, discount]);

  useEffect(() => {
    setTax(total * 0.11);
  }, [total, discount, subtotal]);

  useEffect(() => {
    setSubtotal(total - discount - tax);
  }, [total, discount, tax]);

  useEffect(() => {
    setNotes(props.order.notes);
  }, []);

  useEffect(() => {
    console.log(props.order)
  }, [props.order]);


  return (
    <div className="print-container flex flex-col justify-between rounded-lg shadow-lg h-full min-w-96 bg-white py-2 px-4">
      <div className='h-4/6 mt-2'>
        <div className='grid grid-cols-12 place-content-end'>
          <h2 className="col-span-8 secondary-title p-0 m-0 text-sm text-start">Order Summary</h2>
          <div className='no-print col-span-2 flex justify-end items-center'>
            <PrintIcon className=' h-4 w-4 cursor-pointer stroke-dark' onClick={handlePrint} />
          </div>
          <div className='no-print col-span-2 flex justify-end items-center'>
            <EditIcon className=" col-span-2 h-4 w-4 cursor-pointer stroke-primary hover:stroke-secondary" onClick={() => setEditing(!editing)} />
          </div>
        </div>

        {/* New Fields */}
        <div className="my-2 text-xs">
          <div className="flex justify-between">
            <p>Order Reference</p>
            <p>{props.order.reference}</p>
          </div>
          <div className="flex justify-between">
            <p>Client Name</p>
            <p>{props.order.client_name}</p>
          </div>
          <div className="flex justify-between">
            <p>Employee Name</p>
            <p>{props.order.employee_name}</p>
          </div>
          <div className="flex justify-between">
            <p>Order Type</p>
            <p>{props.order.type}</p>
          </div>
          <div className="flex justify-between">
            <p>Date - Time</p>
            <p>{props.order.date.toISOString().split("T")[0]} - {props.order.time.toLocaleTimeString()}</p>
          </div>

        </div>

        {/* Order Items */}
        <div className='overflow-auto h-4/5 text-xs'>
          <div className="my-1 ">
            {props.orderItems.map((item, index) => (
              <div key={index} className="flex justify-between">
                <p>{item.product_name} (x{item.quantity})</p>
                {!editing && <p>${item.total.toFixed(2)}</p>}
                {editing && <span className='cursor-pointer text-red-800 text-sm' onClick={handleRemoveItem(item.product_id)} >Remove</span>}
              </div>
            ))}
          </div>
        </div>
      </div>



      {/* Action Buttons */}
      <div className="h-fit mt-2 text-sm ">
        <hr className='my-2' />

        <div>

          <div className="flex justify-between">
            <p className='italic'>Subtotal</p>
            <p>${subtotal.toFixed(2)}</p>
          </div>
          <div className="flex justify-between">
            <p className='italic'>Discount</p>
            {!editing && <p>${discount.toFixed(2)}</p>}
            {editing && <input type='number'
              className='border border-gray-300 rounded-md p-1 w-16 outline-none'
              value={discount} onChange={(e) => setDiscount(Number(e.target.value))} />}
          </div>
          <div className="flex justify-between">
            <p className='italic'>Tax</p>
            <p>${tax.toFixed(2)}</p>
          </div>
          <hr />

          <div className="mt-4 flex justify-between">
            <p  className=" italic font-bold">Total</p>
            <p className="font-bold">${total.toFixed(2)}</p>
          </div>

        </div>

        <div>
          <div>
            <p className='text-center text-sm'>Notes</p>
            {!editing && <p className='text-xs text-justify'>{notes}</p>}
            {editing && <textarea
              className="border border-gray-300 rounded-md p-1 w-full outline-none"
              value={notes} onChange={(e) => setNotes(e.target.value)} />}
          </div>

        </div>

      </div>
      <div className='text-xs'>
        {error && <ErrorDisplay message={error} />}
        {success && <SuccessDisplay message={success} />}
      </div>


      <div className='flex flex-row justify-between'>
        <button
        onClick={handleCancelChanges}
          className="no-print w-full mt-2 mx-2 neutral-button"
        >
          Reset
        </button>

        <button
          onClick={handleSaveOrder}
          disabled={loading}
          className="no-print w-full mt-2 mx-2 submit-button"
        >
          Save
        </button>

      </div>
    </div>
  )
}