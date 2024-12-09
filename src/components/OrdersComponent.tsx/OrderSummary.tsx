import { useEffect, useState } from 'react';
import OrderItem from '../../types/OrderItem';
import EditIcon from '../Icons/EditIcon';
import PrintIcon from '../Icons/PrintIcon';
import Order from '../../types/Order';

interface OrderSummaryProps {
  order: Order;
  orderItems: OrderItem[];
  onRemoveItem: (id: string) => void;
  handleSave: (orderItems: OrderItem[], total: number, discount: number, tax: number, subtotal: number) => void;
}

export default function OrderSummary({ order, orderItems, onRemoveItem, handleSave }: OrderSummaryProps) {

  const [editing, setEditing] = useState(false);

  const [total, setTotal] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [tax, setTax] = useState(0);
  const [subtotal, setSubtotal] = useState(0);

  const handleSaveOrder = () => {
    handleSave(orderItems, total, discount, tax, subtotal);

  }

  const handleRemoveItem = (id: string) => () => {
    onRemoveItem(id);
  }

  const handlePrint = () => {

    window.print();

  }

  const calculateTotal = () => {
    return orderItems.reduce((total, item) => total + item.total, 0);
  }

  useEffect(() => {
    setTotal(calculateTotal() - discount);
  }, [orderItems, discount]);

  useEffect(() => {
    setTax(total * 0.11);
  }, [total, discount, subtotal]);

  useEffect(() => {
    setSubtotal(total - discount - tax);
  }, [total, discount, tax]);


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
            <p>{order.reference}</p>
          </div>
          <div className="flex justify-between">
            <p>Client Name</p>
            <p>{order.client_name}</p>
          </div>
          <div className="flex justify-between">
            <p>Employee Name</p>
            <p>{order.employee_name}</p>
          </div>
          <div className="flex justify-between">
            <p>Order Type</p>
            <p>{order.type}</p>
          </div>
          <div className="flex justify-between">
            <p>Date - Time</p>
            <p>{order.date.toISOString().split("T")[0]} - {order.time.toLocaleTimeString()}</p>
          </div>

        </div>

        {/* Order Items */}
        <div className='overflow-auto h-full'>
          <div className="my-1 ">
            {orderItems.map((item, index) => (
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
      <div className="h-fit mt-2 text-sm">
        <hr className='my-2' />

        <div>

          <div className="flex justify-between">
            <p>Subtotal</p>
            <p>${subtotal.toFixed(2)}</p>
          </div>
          <div className="flex justify-between">
            <p>Discount</p>
            {!editing && <p>${discount.toFixed(2)}</p>}
            {editing && <input type='number'
              className='border border-gray-300 rounded-md p-1 w-16 outline-none'
              value={discount} onChange={(e) => setDiscount(Number(e.target.value))} />}
          </div>
          <div className="flex justify-between">
            <p>Tax</p>
            <p>${tax.toFixed(2)}</p>
          </div>
          <hr />

          <div className="mt-4 flex justify-between">
            <p className="font-bold">Total</p>
            <p className="font-bold">${total.toFixed(2)}</p>
          </div>

        </div>

        <div>
          <div>
            <p className='text-center text-sm'>Notes</p>
            {!editing && <p className='text-xs text-justify'>{order.notes}</p>}
            {editing && <textarea
              className="border border-gray-300 rounded-md p-1 w-full outline-none"
              value={order.notes || ""} onChange={(e) => order.notes = e.target.value} />}
          </div>

        </div>

      </div>

      <button
        onClick={handleSaveOrder}
        className="no-print w-full mt-2 submit-button"
      >
        Save Order
      </button>

    </div>
  )
}