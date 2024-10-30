import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useSelector } from 'react-redux';
import { RootState } from './utils/store.ts';
import OrdersPage from "./pages/OrdersPage";
import ReservationPage from "./pages/ReservationPage";
import Navbar from "./components/Navbar";
import ErrorPage from "./pages/ErrorPage";
import EmployeePage from "./pages/admin/EmployeePage";
import EmployeeProfilePage from "./pages/EmployeeProfilePage";
import Login from "./pages/Auth/Login";

function App() {
  const isAuthenticated = useSelector((state: RootState) => state.user.isAuthenticated);

  if (!isAuthenticated) {
    window.history.pushState({}, '', '/login');
    return <Login />;
  }

  return (
    <Router>
      <Routes>
          <Route path="/orders" element={<OrdersPage />} />
          <Route path="/reservations" element={<ReservationPage />} />
          <Route path="/employees" element={<EmployeePage />} />
          <Route path="/employees/:id" element={<EmployeeProfilePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<ErrorPage />} />
      </Routes>

    </Router>
  );
}

export default App;
