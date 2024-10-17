import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import OrdersPage from "./pages/OrdersPage";
import ReservationPage from "./pages/ReservationPage";
import Navbar from "./components/Navbar";
import ErrorPage from "./pages/ErrorPage";
import EmployeePage from "./pages/admin/EmployeePage";
import EmployeeProfilePage from "./pages/EmployeeProfilePage";


function App() {

  return (
    <Router>
      <Navbar /> {/* Add the Navbar to every page */}
      <div className="p-4">
        <Routes>
          <Route path="/orders" element={<OrdersPage />} />
          <Route path="/reservations" element={<ReservationPage />} />
          <Route path="/employees" element={<EmployeePage />} />
          <Route path="/employees/:id" element={<EmployeeProfilePage />} />
          <Route path="*" element={<ErrorPage />} /> {/* This will catch all undefined routes */}
        </Routes>
      </div>
    </Router>
  )
}

export default App
