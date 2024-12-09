// src/pages/OrdersPage.tsx
import { useEffect, useRef, useState } from "react";
import OrderSummary from "../../components/OrdersComponent.tsx/OrderSummary";
import ProductMenu from "../../components/Products/ProductMenu";
import Product from "../../types/Product";
import OrderItem from "../../types/OrderItem";
import OrdersHandler from "../../components/OrdersComponent.tsx/OrdersHandler";
import Order from "../../types/Order";
import Popover from "../../components/Utils/Popover";
import ClientPopHandler from "../../components/ClientHelper/ClientPopHandler";
import Client from "../../types/Client";

export default function OrdersPage() {

  const [currentOrder, setCurrentOrder] = useState<Order>(new Order());
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);
  const [showProductMenu, setShowProductMenu] = useState(false);

  const clientHandlerRef = useRef<{ open: () => void, close: () => void }>(null);


  useEffect(() => {
    document.title = "Orders";
  }, []);

  const handleRemoveItem = (productId: string) => {
    for (let i = 0; i < orderItems.length; i++) {
      if (orderItems[i].product_id.toString() === productId.toString()) {
        if (orderItems[i].quantity > 1) {
          orderItems[i].quantity -= 1;
          orderItems[i].total -= orderItems[i].product_price;
        } else {
          orderItems.splice(i, 1);
        }
        setOrderItems([...orderItems]);
        break;
      }
    }
  };

  const handleSaveOrder = (orderItems: OrderItem[], total: number, discount: number, tax: number, subtotal: number) => {
    console.log(orderItems, total, discount, tax, subtotal);
  };

  const handleProductClick = (product: Product) => {
    if (orderItems.some((item) => item.product_id.toString() === product.id.toString())) {
      const newOrderItems = orderItems.map((item) => {
        if (item.product_id.toString() === product.id.toString()) {
          item.quantity += 1;
          item.total = item.quantity * item.product_price;
        }
        return item;
      });

      setOrderItems(newOrderItems);
    } else {
      const orderItem = new OrderItem();
      orderItem.product_id = product.id.toString();
      orderItem.product_sku = product.sku;
      orderItem.product_name = product.name;
      orderItem.product_price = product.price;
      orderItem.quantity = 1;
      orderItem.total = product.price;

      setOrderItems([...orderItems, orderItem]);
    }
  };

  const handleCurrentOrder = (order: Order) => {
    setCurrentOrder(order);
  }

  const handleOnClickNewOrder = () => {
    clientHandlerRef.current?.open();
  }

  const onSelectClientHandler = (client: Client) => {

    const newOrder = new Order();
    newOrder.client_id = client.client_id!;
    newOrder.client_name = client.client_first_name + " " + client.client_last_name;

    setCurrentOrder(newOrder);
    clientHandlerRef.current?.close();
    setShowProductMenu(true);
  }

  return (
    <div className="flex flex-row p-8 w-full h-full">
      <OrderSummary
        order={currentOrder}
        handleSave={handleSaveOrder}
        orderItems={orderItems}
        onRemoveItem={handleRemoveItem}
      />
      <Popover
        id="client-handler"
        classNameButton="bg-blue-500 text-white p-2 rounded"
        classNameMainDiv="max-w-3xl"
        title="Search Client"
        ref={clientHandlerRef}
        useButton={false}
      >
        <ClientPopHandler
          onClientSelect={onSelectClientHandler}
        />
      </Popover>
      <div className="flex flex-row">

        {/* Products */}
        <div className={`flex flex-col min-w-full h-full transition-transform duration-500 
        ${showProductMenu ? "translate-x-0" : "translate-x-full"}`}
        >
          <div className="w-full h-fit">
            <h1 className="primary-title">Product Menu</h1>
          </div>
          <ProductMenu onClickMenuProduct={handleProductClick} />
        </div>


        {/* Orders */}
        <div className={`no-print flex flex-col min-w-full h-full transition-transform duration-500 
                        ${showProductMenu ? "translate-x-full" : "-translate-x-full"}`}
        >
          <OrdersHandler
            onClickOrder={handleCurrentOrder}
            handleOnClickNewOrder={handleOnClickNewOrder}
          />
        </div>

      </div>



    </div>
  );
}
