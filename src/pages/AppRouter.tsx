import Navbar from "../components/Navbar.tsx";
import OrdersPage from "./Orders/OrdersPage.tsx";
import ReservationPage from "./Reservations/ReservationPage.tsx";
import ErrorPage from "./Others/ErrorPage.tsx";
import EmployeePage from "./Admin/EmployeePage.tsx";
import EmployeeProfilePage from "./Auth/EmployeeProfilePage.tsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";



export default function AppRouter() {
    return (
        <BrowserRouter>
            <Navbar />
            <Routes>
                <Route path="/orders" element={<OrdersPage />} />
                <Route path="/reservations" element={<ReservationPage />} />
                <Route path="/employees/:id" element={<EmployeeProfilePage />} />
                <Route path="/employees" element={<EmployeePage />} />
                <Route path="*" element={<ErrorPage />} />
            </Routes>
        </BrowserRouter>
    )
}