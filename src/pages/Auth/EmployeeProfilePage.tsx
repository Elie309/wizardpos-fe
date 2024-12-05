import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearUser } from "../../utils/Slices/userSlice";
import { RootState } from "../../utils/store";
import api from "../../utils/Axios";
import { useState } from "react";

export default function EmployeeProfilePage() {


  const dispatch = useDispatch();
  const employee = useSelector((state: RootState) => state.user);

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const  handleLogout = async () => {
    try {
      setLoading(true);
      const response = await api.post('auth/logout');

      if (response.status === 200) {

        sessionStorage.removeItem('token');
        sessionStorage.removeItem('user');

        setLoading(false);
        dispatch(clearUser())

       navigate('/login');

      } else {
        setError(response.data.message);
        setLoading(false);
      }
    } catch (error: any) {
      setError(error.message);
      setLoading(false);
    }

  }


  return (
    <div className="p-8">
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold">Employee Profile</h1>
        <Link to="/employees" className="text-blue-500 font-bold">
          Back to Employees
        </Link>
      </div>

      <div className="mt-8">
        <div className="flex flex-row space-x-4">

          <div>
            <h2 className="text-xl font-bold">{employee?.name}</h2>
            <p className="text-gray-500">{employee?.role}</p>
            <p className="text-gray-500">{employee?.email}</p>
          </div>
        </div>
        <div className="mt-8">
          <button
            onClick={handleLogout}
            disabled={loading}
            className="bg-red-500 text-white px-4 py-2 rounded-md disabled:opacity-50"
          >
            Logout
          </button>
        </div>
        <div className="my-4">
          {error && <p className="text-red-500">{error}</p>}
        </div>
      </div>
    </div>
  );
}
