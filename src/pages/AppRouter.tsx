import OrdersPage from "./Orders/OrdersPage.tsx";
import ReservationPage from "./Reservations/ReservationPage.tsx";
import ErrorPage from "./Others/ErrorPage.tsx";
import EmployeeProfilePage from "./Auth/EmployeeProfilePage.tsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Main from "./Main.tsx";
import EmployeePage from "./Admin/EmployeePage.tsx";
import ProductListPage from "./Products/ProductListPage.tsx";
import SaveProductPage from "./Products/SaveProductPage.tsx";



export default function AppRouter() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Main />} />
                
                <Route path="/products" element={<ProductListPage />} />
                <Route path="/products/:id" element={<SaveProductPage edit={true} />} />
                <Route path="/products/add" element={<SaveProductPage edit={false} />} />
                
                <Route path="/orders" element={<OrdersPage />} />

                <Route path="/reservations" element={<ReservationPage />} />
                <Route path="/employees/:id" element={<EmployeeProfilePage />} />
                <Route path="/employees" element={<EmployeePage />} />
                <Route path="*" element={<ErrorPage />} />
            </Routes>
        </BrowserRouter>
    )
}