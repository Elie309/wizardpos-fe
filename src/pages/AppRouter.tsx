import OrdersPage from "./Orders/OrdersPage.tsx";
import ReservationPage from "./Reservations/ReservationPage.tsx";
import ErrorPage from "./Others/ErrorPage.tsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Main from "./Main.tsx";
import ProductListPage from "./Products/ProductListPage.tsx";
import SaveProductPage from "./Products/SaveProductPage.tsx";
import CategoryListPage from "./Categories/CategoryListPage.tsx";
import SaveCategoryPage from "./Categories/SaveCategoryPage.tsx";
import UploadImagesPage from "./Others/UploadImagesPage.tsx";
import ClientListPage from "./Clients/ClientListPage.tsx";
import SaveClientPage from "./Clients/SaveClientPage.tsx";
import RestaurantTableListPage from "./RestaurantTable/RestaurantTableListPage.tsx";
import SaveRestaurantTable from "./RestaurantTable/SaveRestaurantTable.tsx";
import EmployeePage from "./Admin/EmployeePage.tsx";
import Reports from "./Others/Reports.tsx";




export default function AppRouter() {

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Main />} />

                {/* Products */}
                <Route path="/products" element={<ProductListPage />} />
                <Route path="/products/:id" element={<SaveProductPage isEdit={true} />} />
                <Route path="/products/add" element={<SaveProductPage isEdit={false} />} />

                {/* Categories */}
                <Route path="/categories" element={<CategoryListPage />} />
                <Route path="/categories/:id" element={<SaveCategoryPage isEdit={true} />} />
                <Route path="/categories/add" element={<SaveCategoryPage isEdit={false} />} />

                {/* Uploads */}
                <Route path="/uploads" element={<UploadImagesPage />} />


                {/* Clients */}
                <Route path="clients" element={<ClientListPage />} />
                <Route path="/clients" element={<CategoryListPage />} />
                <Route path="/clients/:id" element={<SaveClientPage isEdit={true} />} />
                <Route path="/clients/add" element={<SaveClientPage isEdit={false} />} />

                {/* Tables */}
                <Route path="/tables" element={<RestaurantTableListPage />} />
                <Route path="/tables/:id" element={<SaveRestaurantTable isEdit={true} />} />
                <Route path="/tables/add" element={<SaveRestaurantTable isEdit={false} />} />


                {/* Reservations */}
                <Route path="/reservations" element={<ReservationPage />} />


                <Route path="/orders" element={<OrdersPage />} />

                {/* Admin & Manager*/}
                <Route path="/reports" element={<Reports />} />

                <Route path="/employees" element={<EmployeePage />} />
                <Route path="*" element={<ErrorPage />} />
            </Routes>
        </BrowserRouter>
    )
}