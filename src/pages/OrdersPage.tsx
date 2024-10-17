// src/pages/OrdersPage.tsx
import { useState } from "react";
import { Product, Category } from "../types/Product";

export const categories: Category[] = [
  { id:"cat0", name: "All" },
  { id: "cat1", name: "Beverages" },
  { id: "cat2", name: "Snacks" },
  { id: "cat3", name: "Main Course" },
];

export const products: Product[] = [
  { id: "prod1", name: "Coffee", price: 5, categoryId: "cat1", quantity: 1 },
  { id: "prod2", name: "Tea", price: 4, categoryId: "cat1", quantity: 1 },
  { id: "prod3", name: "Chips", price: 2, categoryId: "cat2" , quantity: 1},
  { id: "prod4", name: "Burger", price: 10, categoryId: "cat3" , quantity: 1},
];


export default function OrdersPage() {
  const [order, setOrder] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<Category>(categories[0]);


  const addToOrder = (product: Product) => {
    const existingProduct = order.find((p) => p.id === product.id);
    if (existingProduct) {
      setOrder(
        order.map((p) =>
          p.id === product.id
            ? { ...p, quantity: p.quantity + 1 }
            : p
        )
      );
    } else {
      setOrder([...order, { ...product }]);
    }
  };

  const removeFromOrder = (id: string) => {
    setOrder(order.filter((product) => product.id !== id));
  };

  const calculateTotal = () =>
    order.reduce((total, item) => total + item.price * item.quantity, 0);

  const handleSaveOrder = () => {
    alert("Order saved!");
    console.log("Saved Order:", order);
  };

  const handleCloseOrder = () => {
    setOrder([]);
    alert("Order closed.");
  };

  const handleSettleOrder = () => {
    const total = calculateTotal();
    alert(`Order settled. Total amount: $${total}`);
  };

  const filteredProducts = products.filter(
    (product) =>
      selectedCategory === categories[0] || product.categoryId === selectedCategory.id
  );


  return (
    <div className="grid grid-cols-3 gap-6">
      {/* Product List */}
      <div className="col-span-2">
        <h2 className="text-2xl font-bold mb-4">Products</h2>

        {/* Category Filter */}
        <div className="mb-4 flex space-x-4">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded ${
                selectedCategory === category
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200"
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-3 gap-4">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="border p-4 rounded shadow hover:bg-gray-100 cursor-pointer"
              onClick={() => addToOrder(product)}
            >
              <h3 className="text-lg font-semibold">{product.name}</h3>
              <p className="text-gray-600">${product.price}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Order Summary */}
      <div className="col-span-1 border p-4 rounded shadow">
        <h2 className="text-2xl font-bold mb-4">Order Summary</h2>
        {order.length === 0 ? (
          <p className="text-gray-500">No products added.</p>
        ) : (
          <div>
            {order.map((item) => (
              <div key={item.id} className="flex justify-between items-center mb-2">
                <span>
                  {item.name} (x{item.quantity})
                </span>
                <div className="flex space-x-2 items-center">
                  <span>${item.price * item.quantity}</span>
                  <button
                    onClick={() => removeFromOrder(item.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    ✕
                  </button>
                </div>
              </div>
            ))}
            <hr className="my-2" />
            <div className="flex justify-between font-bold">
              <span>Total</span>
              <span>${calculateTotal()}</span>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="mt-4 space-y-2">
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
    </div>
  );
}
