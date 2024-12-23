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
import OrderService from "../../services/OrderService";
import Loading from "../../components/Utils/Loading";
import Toaster from "../../components/Toaster/Toaster";

export default function OrdersPage() {

  const [currentOrder, setCurrentOrder] = useState<Order>(new Order());
  const [orderItems, setOrderItems] = useState<OrderItem[]>(currentOrder.order_items);
  const [showProductMenu, setShowProductMenu] = useState(false);

  const [isEditOrder, setIsEditOrder] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const [currentDate, setCurrentDate] = useState<string>(new Date().toLocaleDateString("en-CA"));
  const [orders, setOrders] = useState<Order[] | null>(null);

  //user from redux
  const user = useSelector((state: RootState) => state.user);

  const clientPopoverHandlerRef = useRef<{ open: () => void, close: () => void }>(null);
  const orderPopoverHandlerRef = useRef<{ open: () => void, close: () => void }>(null);


  useEffect(() => {
    document.title = "Orders";
  }, []);

  useEffect(() => {
    setOrderItems(currentOrder.order_items);
  }, [currentOrder]);

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
          item.order_id = currentOrder.id;
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
      orderItem.order_id = currentOrder.id;
      orderItem.product_name = product.name;
      orderItem.product_price = product.price;
      orderItem.quantity = 1;
      orderItem.total = product.price;

      setOrderItems([...orderItems, orderItem]);
    }
  };

  const handleOrders = async () => {
    setLoading(true);

    try {

      let response = await OrderService.getOrders(currentDate);

      if (response.success) {

        let orders = response.data as Order[];
        setOrders(orders);

      } else {
        setError(response.message);
      }


    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }

  }

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
    newOrder.time = new Date().toLocaleTimeString();
    newOrder.date = new Date().toLocaleDateString("en-CA");

    
    setCurrentOrder(newOrder);
    clientPopoverHandlerRef.current?.close();
    orderPopoverHandlerRef.current?.open();
  }

  const handleOrderSaveSuccessful = (order: Order, showProductMenu: boolean) => {
    orderPopoverHandlerRef.current?.close();
    setCurrentOrder(order);
    setOrderItems(order.order_items);
    setShowProductMenu(showProductMenu);
    setSuccess("Order saved successfully");

    handleOrders();

  }

  const handleProductsButtonClick = () => {
    if (currentOrder.id && currentOrder.client_id && currentOrder.client_name) {
      setShowProductMenu(true);
    } else {
      setError("Please select or create an order");
    }
  }

  useEffect(() => {
    handleOrders();
  }, [currentDate]);

 useEffect(() => {

  if(success){
    setTimeout(() => {
      setSuccess(null);
    }, 5000);
  }
  
}, [success]);

useEffect(() => {
  if(error){
    setTimeout(() => {
      setError(null);
    }, 5000);
  }
}, [error]);

  return (
    <div className="flex flex-row p-8 w-full h-full">
      <OrderSummary
        order={currentOrder}
        orderItems={orderItems}
        onRemoveItem={handleRemoveItem}
        onClickReset={() => {
          orderPopoverHandlerRef.current?.close();
          setShowProductMenu(false);
          setOrderItems([]);
          setCurrentOrder(new Order());
        }}
        onErrorChange={(error) => setError(error)}

        onOrderSummarySaveSuccessful={
          (order) => handleOrderSaveSuccessful(order, false)}
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
          onSaveSuccessful={
            (order) => handleOrderSaveSuccessful(order, true)}
        />
      </Popover>
      <div className="flex flex-row">

        {/* Products */}
        <div tabIndex={-1} className={`flex flex-col min-w-full h-full transition-transform duration-500 
        ${showProductMenu ? "translate-x-0" : "translate-x-full"}`}
        >
          <div className="no-print w-full h-fit flex flex-row px-8">
            <button onClick={() => setShowProductMenu(false)} className="my-auto cursor-pointer no-print">
              <svg
                viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="size-6 text-dark fill-none">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3" />
              </svg>
            </button>
            <h1 className="primary-title">Product Menu</h1>
          </div>
          <ProductMenu onClickMenuProduct={handleProductClick} />
        </div>


        {/* Orders */}
        <div tabIndex={-1} className={`no-print flex flex-col min-w-full h-full transition-transform duration-500 
  ${showProductMenu ? "translate-x-full" : "-translate-x-full"}`}
        >
          {loading ? (
            <div className="w-screen h-full flex justify-center items-center">
              <Loading />
            </div>
          ) : (
            orders && (
              <OrdersHandler
                orders={orders}
                onDateChange={(date) => setCurrentDate(date)}
                currentDate={currentDate}
                onClickOrder={handleOnClickOrder}
                onClickNewOrder={handleOnClickNewOrder}
                onDoubleClickOrder={handleOnDoubleClickOrder}
                onProductsButtonClick={handleProductsButtonClick}
              />
            )
          )}
        </div>
      </div>

      {success && <Toaster message={success || ""} success={true} duration={5050} />}
      {error && <Toaster message={error || ""} success={false} duration={5050} />}

    </div>
  );
}
