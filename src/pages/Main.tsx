import { Link, useNavigate } from "react-router-dom"
import LogoFilled from "../components/Icons/LogoFilled"
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../utils/store";
import { clearUser } from "../utils/Slices/userSlice";
import api from "../utils/Axios";
import LogoutIcon from "../components/Icons/LogoutIcon";

const Elements = [
    ['Orders', '/orders'],
    ['Reservations', '/reservations'],
    ['Clients', '/clients'],
]
const ManagerElements = [
    ['Products', '/products'],
]


const AdminElements = [
    ['Employees', '/employees'],
    ['Tables', '/tables'],
]

export default function Main() {


      const dispatch = useDispatch();
        const employee = useSelector((state: RootState) => state.user);
    
    
        const navigate = useNavigate();
    
        const handleLogout = async () => {
            try {
              
                const response = await api.post('auth/logout');
    
                if (response.status === 200) {
    
                    sessionStorage.removeItem('token');
                    sessionStorage.removeItem('user');
    
                    dispatch(clearUser())
                } 

                navigate('/login');
              
            } catch (error: any) {
                navigate('/login');
            } finally {
                sessionStorage.removeItem('token');
                sessionStorage.removeItem('user');
            }
    
        }

    return (
        <div className="flex flex-col justify-start items-center w-full h-full bg-dark">
           <div className="flex flex-row">
             <LogoFilled className="fill-main" />
             <div className="pt-14 cursor-pointer"  onClick={handleLogout}>
                <LogoutIcon className="fill-main w-8 h-8"  />
                <p className="text-white">logout</p>
             </div>
           </div>

            <p className="inverse-primary-title">Hello! {employee.name}</p>

            <div className="flex flex-row w-full justify-center">
                <div className="max-w-lg grid grid-cols-3 gap-4 h-fit">
                    {Elements.map((element, index) => {
                        return (
                            <Link className="button-menu " key={index} to={element[1]}>{element[0]}</Link>
                        )
                    })}

                    {(employee.role === 'manager' || employee.role === "admin" )&& ManagerElements.map((element, index) => {
                        return (
                            <Link className="button-menu " key={index} to={element[1]}>{element[0]}</Link>
                        )
                    })}

                    {employee.role === 'admin' && AdminElements.map((element, index) => {
                        return (
                            <Link className="button-menu " key={index} to={element[1]}>{element[0]}</Link>
                        )
                    })}

                </div>
            </div>


        </div>
    )
}