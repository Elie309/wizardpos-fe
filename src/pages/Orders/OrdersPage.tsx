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
import { useSelector } from "react-redux";
import { RootState } from "../../utils/store";
import OrderForm from "../../components/OrdersComponent.tsx/OrderForm";

export default function OrdersPage() {

  const [currentOrder, setCurrentOrder] = useState<Order>(new Order());
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);
  const [showProductMenu, setShowProductMenu] = useState(false);

  const [isEditOrder, setIsEditOrder] = useState(false);

  //user from redux
  const user = useSelector((state: RootState) => state.user);

  const clientPopoverHandlerRef = useRef<{ open: () => void, close: () => void }>(null);
  const orderPopoverHandlerRef = useRef<{ open: () => void, close: () => void }>(null);


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

  const handleOnDoubleClickOrder = (order: Order) => {
    setCurrentOrder(order);
    setIsEditOrder(true);
    orderPopoverHandlerRef.current?.open();
  }

  const handleOnClickOrder = (order: Order) => {
    setCurrentOrder(order);
  }

  const handleOnClickNewOrder = () => {
    clientPopoverHandlerRef.current?.open();
    setIsEditOrder(false);
  }

  const onSelectClientHandler = (client: Client) => {

    const newOrder = new Order();
    newOrder.client_id = client.client_id!;
    newOrder.client_name = client.client_first_name + " " + client.client_last_name;
    newOrder.phone_number = client.client_phone_number;
    newOrder.employee_name = user.name;

    setCurrentOrder(newOrder);
    clientPopoverHandlerRef.current?.close();
    orderPopoverHandlerRef.current?.open();
  }

  const handleOrderSaveSuccessful = () => {
    orderPopoverHandlerRef.current?.close();
  }

  return (
    <div className="flex flex-row p-8 w-full h-full">
      <OrderSummary
        order={currentOrder}
        orderItems={orderItems}
        onRemoveItem={handleRemoveItem}
        onClickCancel={() => {
          orderPopoverHandlerRef.current?.close();
          setShowProductMenu(false);
          setOrderItems([]);
          setCurrentOrder(new Order());
        }}
      />
      <Popover
        id="client-handler"
        classNameButton=""
        classNameMainDiv="max-w-3xl"
        title="Search Client"
        ref={clientPopoverHandlerRef}
        useButton={false}
      >
        <ClientPopHandler
          onClientSelect={onSelectClientHandler}
        />
      </Popover>

      <Popover
        id="order-handler"
        classNameButton=""
        classNameMainDiv="max-w-3xl"
        title="Order"
        ref={orderPopoverHandlerRef}
        useButton={false}
      >
        <OrderForm 
          order={currentOrder}
          isEdit={isEditOrder}
          onSaveSuccessful={handleOrderSaveSuccessful}
          onClickEditProducts={() => {
            orderPopoverHandlerRef.current?.close();
            setShowProductMenu(true);
          }}
        />
      </Popover>
      <div className="flex flex-row">

        {/* Products */}
        <div tabIndex={-1} className={`flex flex-col min-w-full h-full transition-transform duration-500 
        ${showProductMenu ? "translate-x-0" : "translate-x-full"}`}
        >
          <div className="w-full h-fit">
            <h1 className="primary-title">Product Menu</h1>
          </div>
          <ProductMenu onClickMenuProduct={handleProductClick} />
        </div>


        {/* Orders */}
        <div tabIndex={-1} className={`no-print flex flex-col min-w-full h-full transition-transform duration-500 
                        ${showProductMenu ? "translate-x-full" : "-translate-x-full"}`}
        >
          <OrdersHandler
            onClickOrder={handleOnClickOrder}
            onClickNewOrder={handleOnClickNewOrder}
            onDoubleClickOrder={handleOnDoubleClickOrder}
          />
        </div>

      </div>



    </div>
  );
}
