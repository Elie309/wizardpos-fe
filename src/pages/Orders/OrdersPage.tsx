// src/pages/OrdersPage.tsx
import OrderSummary from "../../components/OrdersComponent.tsx/OrderSummary";
import ProductMenu from "../../components/Products/ProductMenu";


export default function OrdersPage() {





  return (
    <div className="flex flex-row p-8 w-full h-full">
      <OrderSummary />
      <ProductMenu />
    </div>
  );
}
