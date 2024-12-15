import { useEffect, useState } from "react";
import Loading from "../../components/Utils/Loading";
import { useNavigate } from "react-router-dom";
import { RootState } from '../../utils/store';
import { useSelector } from 'react-redux';
import Employee from "../../types/Employee";
import EmployeeService from "../../services/EmployeeService";
import ErrorDisplay from "../../components/Utils/ErrorComponent";


export default function EmployeeListPage() {


    const [employees, setEmployees] = useState<Employee[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [initialEmployees, setInitialEmployees] = useState<Employee[]>([]);


    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const navigate = useNavigate();
    const user = useSelector((state: RootState) => state.user);

    const handleRowClick = (employee_id: string) => {
        navigate(`/employees/${employee_id}`);
    };

    const loadEmployees = async () => {
        setLoading(true);
        try {
            const response = await EmployeeService.getAll();

            if (!response.success) {
                setEmployees([]);
                return;
            }
            setEmployees(response.data as Employee[]);
            setInitialEmployees(response.data as Employee[]);



        } catch (error) {
            setError('Failed to fetch employees');
        } finally {
            setLoading(false);
        }
    };


    useEffect(() => {
        if (user.role !== 'admin') {
            navigate('/');
        }

        loadEmployees();
    }, []);

    useEffect(() => {
        const results = initialEmployees.filter((employee) =>
            (employee.first_name + " " + employee.last_name).toLowerCase().includes(searchTerm.toLowerCase())
        );
        setEmployees(results);
    }, [searchTerm]);


    return (
        <div className='w-full h-full p-8 mx-auto mt-8 shadow-lg max-w-5xl bg-white rounded overflow-auto'>

            <div className='flex flex-row justify-between items-center'>
                <p className='link-internal'><button onClick={() => navigate('/')} className=''>Home</button> / Employees </p>
            </div>
            <h2 className='primary-title'>Employees</h2>

            <div className='w-full grid grid-cols-10 gap-2 items-center mb-8'>
                <input
                    className="main-input py-1 col-span-10 md:col-span-8"
                    type="text"
                    placeholder="Search Employees..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button onClick={() => navigate('/employees/add')} className='submit-button p-1 py-2 sm:p-2 text-sm text-center col-span-10 md:col-span-2'>Add Employee</button>

            </div>

            {error && <ErrorDisplay message={error} />}

            {loading && <Loading />}
            {!loading && employees.length === 0 && (
                <div className='text-center'>No employee found</div>
            )}

            {!loading && employees.length > 0 &&
                <div className='overflow-y-hidden overflow-x-auto'>


                    <table className='table-custom'>
                        <thead>
                            <tr>
                                <th>Full Name</th>
                                <th>Phone Number</th>
                                <th>Email</th>
                                <th>Role</th>
                                <th>Active</th>
                            </tr>
                        </thead>
                        <tbody >
                            {employees.map((employee) => (
                                <tr key={employee.id} onClick={() => handleRowClick(employee.id!)}>
                                    <td>{employee.first_name} {employee.last_name}</td>
                                    <td>{employee.phone_number}</td>
                                    <td>{employee.email}</td>
                                    <td>{employee.role}</td>
                                    <td>{employee.is_active ? 'Yes' : 'No'}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            }


        </div>
    );
}