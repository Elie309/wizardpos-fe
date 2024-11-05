export default function OrderSummary() {

  const handleSaveOrder = () => {
    alert("Order saved!");
  }

  const handleSettleOrder = () => {
    alert("Order settled!");
  }

  const handleCloseOrder = () => {
    alert("Order closed!");
  }

  return (
    <div className="flex flex-col justify-between rounded-lg shadow-lg h-5/6 min-w-96 bg-white p-4">
      <div>
        <h2 className="text-2xl font-bold mb-4">Order Summary</h2>

        {/* Order Items */}
        <div className="space-y-2">
          <div className="flex justify-between">
            <p>Product 1</p>
            <p>$10.00</p>
          </div>
          <div className="flex justify-between">
            <p>Product 2</p>
            <p>$15.00</p>
          </div>
          <div className="flex justify-between">
            <p>Product 3</p>
            <p>$20.00</p>
          </div>
          <div className="flex justify-between">
            <p>Product 1</p>
            <p>$10.00</p>
          </div>
          <div className="flex justify-between">
            <p>Product 2</p>
            <p>$15.00</p>
          </div>
          <div className="flex justify-between">
            <p>Product 3</p>
            <p>$20.00</p>
          </div>
          <div className="flex justify-between">
            <p>Product 1</p>
            <p>$10.00</p>
          </div>
          <div className="flex justify-between">
            <p>Product 2</p>
            <p>$15.00</p>
          </div>
          <div className="flex justify-between">
            <p>Product 3</p>
            <p>$20.00</p>
          </div>

          {/* Total */}

        </div>
      </div>




      {/* Action Buttons */}
      <div className="mt-4 space-y-2">

        <div className="mt-4 flex justify-between">
          <p className="font-bold">Total</p>
          <p className="font-bold">$45.00</p>
        </div>


        <button
          onClick={handleSaveOrder}
          className="w-full px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Save Order
        </button>
        <button
          onClick={handleSettleOrder}
          className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Settle Order
        </button>
        <button
          onClick={handleCloseOrder}
          className="w-full px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
        >
          Close Order
        </button>
      </div>


    </div>
  )
}