import { useEffect, useState } from "react";
import Loading from "../../components/Utils/Loading";
import ErrorDisplay from "../../components/Utils/ErrorComponent";
import SuccessDisplay from "../../components/Utils/SuccessComponent";
import SwitchInput from "../../components/Utils/SwitchInput";
import { useNavigate } from "react-router-dom";
import { RootState } from '../../utils/store';
import { useSelector } from 'react-redux';
import Employee, { EmployeeRole, IEmployee } from "../../types/Employee";
import EmployeeService from "../../services/EmployeeService";


type IProps = {
    isEdit: boolean;
}



export default function SaveEmployeePage({ isEdit }: IProps) {

    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState<IEmployee>({
        phone_number: "",
        email: "",
        password: "",
        first_name: "",
        last_name: "",
        role:  EmployeeRole.user,
        is_active: true
    });
    const [error, setError] = useState<boolean>();
    const [errorMessage, setErrorMessage] = useState<string>();
    const [success, setSuccess] = useState<boolean>();
    const [loadingSubmit, setLoadingSubmit] = useState<boolean>();

    const [initialEmployeeId, setInitialEmployeeId] = useState<string>("");
    const [initialEmployeeName, setInitialEmployeeName] = useState<string>("");

    const navigate = useNavigate();
    const user  = useSelector((state: RootState) => state.user);


    const loadEmployee = async () => {
        setLoading(true);
        setErrorMessage("");
        setError(false);
        try {
            let employee_id = window.location.pathname.split("/")[2]
            const response = await EmployeeService.get(employee_id);

            if (response.success) {
                if (response.data === null) {
                    setErrorMessage("Employee not found")
                    setError(true)
                } else {

                    let employee = response.data as Employee;
                    setFormData({
                        phone_number: employee.phone_number,
                        email: employee.email,
                        password: employee.password,
                        first_name: employee.first_name,
                        last_name: employee.last_name,
                        role: employee.role,
                        is_active: employee.is_active

                    })

                    setInitialEmployeeId(employee.id!);
                    setInitialEmployeeName(employee.first_name + " " + employee.last_name);
                }

            } else {
                setErrorMessage(response.message)
                setError(true)
            }


        } catch (error: any) {

            setErrorMessage("An error occurred, employee not found")
            setError(true)

        }finally{
            setLoading(false);
        }
    }

    useEffect(() => {

        if(user.role !== 'admin'){
            navigate('/');
        }

        if (isEdit) {
            loadEmployee();
        } else {
            setLoading(false)
        }
    }, [])


    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const handleSubmit = async (e: React.FormEvent<HTMLButtonElement>) => {

        e.preventDefault();
        setLoadingSubmit(true);
        setErrorMessage("");
        setError(false);
        setSuccess(false);

   

        try {
            let employee = new Employee();
            employee.phone_number = formData.phone_number;
            employee.email = formData.email;
            employee.password = formData.password;
            employee.first_name = formData.first_name;
            employee.last_name = formData.last_name;
            employee.role = formData.role;
            employee.is_active = formData.is_active;

            let response;

            if (isEdit) {

                response = await EmployeeService.update(initialEmployeeId, employee);
            } else {
                response = await EmployeeService.save(employee);
            }

            if (response.success) {
                setSuccess(true);
                setErrorMessage("");
                setError(false);

                if (!isEdit) {
                    setFormData({
                        phone_number: "",
                        email: "",
                        password: "",
                        first_name: "",
                        last_name: "",
                        role: EmployeeRole.user,
                        is_active: true
                    })
                }
                //The ID will not change, so we don't need to update the initial ID

            } else {
                setErrorMessage(response.message);
                setError(true);
            }


        } catch (error: any) {
            setErrorMessage("An error occurred, please try again");
            setError(true);
        }finally{
            setLoadingSubmit(false);
        }
    }


    if (loading) {
        return <Loading />;
    }

    return (
        <div className='w-full h-full p-8 mx-auto mt-8 shadow-lg max-w-3xl bg-white rounded overflow-auto'>

            <div className='flex flex-row justify-between items-center'>
                <p className='link-internal'><button onClick={() => navigate('/')} className=''>Home</button> / <button onClick={() => navigate('/employees')}>Employees</button> / {isEdit ? initialEmployeeName : "Add Employee"}</p>
            </div>

            <h1 className="primary-title ">{isEdit ? "Edit" : "Add"} Employee</h1>

            {error && <ErrorDisplay message={errorMessage || "An error occurred"} />}
            {success && <SuccessDisplay message="Employee saved successfully" />}

            <form>
                <div className="label-input-container">
                    <label className="main-label required-field" htmlFor="first_name">First Name</label>
                    <input type="text" name="first_name" value={formData.first_name} onChange={handleChange}/>
                </div>

                <div className="label-input-container">
                    <label className="main-label required-field" htmlFor="last_name">Last Name</label>
                    <input type="text" name="last_name" value={formData.last_name} onChange={handleChange}/>
                </div>

                <div className="label-input-container">
                    <label className="main-label required-field" htmlFor="phone_number">Phone Number</label>
                    <input type="text" name="phone_number" value={formData.phone_number} onChange={handleChange}/>
                </div>

                <div className="label-input-container">
                    <label className="main-label required-field" htmlFor="email">Email</label>
                    <input type="text" name="email" value={formData.email} onChange={handleChange}/>
                </div>

                <div className="label-input-container">
                    <label className="main-label" htmlFor="password">Password</label>
                    <input type="password" name="password" value={formData.password} onChange={handleChange}/>
                </div>

                <div className="label-input-container">
                    <label className="main-label" htmlFor="role">Role</label>
                    <select name="role" value={formData.role} onChange={handleChange}>
                        <option value={EmployeeRole.admin}>Admin</option>
                        <option value={EmployeeRole.manager}>Manager</option>
                        <option value={EmployeeRole.user}>User</option>
                    </select>
                </div>

             
                <div className="flex flex-row w-full justify-center">
                    <div className="flex flex-row justify-around w-1/2">
                        <label className="main-label" htmlFor="isActive">Active</label>
                        <SwitchInput name="isActive" value={formData?.is_active} onChange={() => {
                            setFormData({ ...formData, is_active: !formData.is_active })
                        }} />
                    </div>

                </div>

                <div className="label-input-container my-4 ">
                    <button className={`submit-button mx-auto w-3/4 md:w-1/4 ${loadingSubmit ? "cursor-wait" : ""} `}
                        disabled={loadingSubmit}
                        type="submit"
                        onClick={handleSubmit}>
                        {loadingSubmit ? "Loading..." : isEdit ? "Update" : "Save"}
                    </button>
                </div >

            </form>
        </div>
    )
}