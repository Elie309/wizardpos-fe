import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import OrdersPage from "./pages/OrdersPage";
import ReservationPage from "./pages/ReservationPage";
import Navbar from "./components/Navbar";
import ErrorPage from "./pages/ErrorPage";
import EmployeePage from "./pages/admin/EmployeePage";
import EmployeeProfilePage from "./pages/EmployeeProfilePage";
import Login from "./pages/Auth/Login";
import { useState } from "react";
import AuthContext, { AuthContextType } from "./utils/AuthContext";


function App() {

  //Handle login and logout
  const [user, setUser] = useState(false);

  if (!user) {
    window.history.pushState({}, '', '/login');
    return <Login />;
  }else{
    console.log('User is logged in');
    window.history.pushState({}, '', '/orders');
  }

  return (
    <Router>
      {/* Add the Navbar to every page */}
      <div className="p-4">
        <Routes>
            {/* <AuthContext.Provider value={user} > */}
              <Navbar />

              <Route path="/orders" element={<OrdersPage />} />
              <Route path="/reservations" element={<ReservationPage />} />
              <Route path="/employees" element={<EmployeePage />} />
              <Route path="/employees/:id" element={<EmployeeProfilePage />} />
            {/* </AuthContext.Provider> */}

          <Route path="/login" element={<Login />} />

          <Route path="*" element={<ErrorPage />} /> {/* This will catch all undefined routes */}


        </Routes>
      </div>
    </Router>
  )
}

export default App
