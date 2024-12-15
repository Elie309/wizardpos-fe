import Employee, { IEmployee } from "../types/Employee";
import api from "../utils/Axios";
import ServicesErrorHandler from "./ServicesErrorHandler";

type IEmployeeResponse = {
    success: boolean;
    message: string;
    data: Employee | Employee[] | null;
}

export default class EmployeeService {

    static async getAll(): Promise<IEmployeeResponse> {
        try {
            const response = await api.get('/employees');
            let employees: Employee[] = [];
            if (response.status === 200) {
                employees = response.data.data.map((employee: IEmployee) => Employee.fromJson(employee));
                return {
                    success: true,
                    message: 'Employees fetched successfully',
                    data: employees,
                };
            } else {
                return {
                    success: false,
                    message: 'Failed to fetch employees',
                    data: null
                };
            }
        } catch (error: any) {
            return ServicesErrorHandler(error);
        }
    }

    static async get(employee_id: string): Promise<IEmployeeResponse> {
        try {
            const response = await api.get('/employees/' + employee_id);
            if (response.status === 200) {
                const employee = Employee.fromJson(response.data.data);
                return {
                    success: true,
                    message: 'Employee fetched successfully',
                    data: employee
                };
            } else {
                return {
                    success: false,
                    message: 'Failed to fetch employee',
                    data: null
                };
            }
        } catch (error: any) {
            return ServicesErrorHandler(error);
        }
    }

    static async save(employee: Employee): Promise<IEmployeeResponse> {
        try {
            const response = await api.post('employees', employee.toFormData());
            if (response.status === 201) {
                const employee = Employee.fromJson(response.data.data);
                return {
                    success: true,
                    message: 'Employee saved successfully',
                    data: employee
                };
            } else {
                return {
                    success: false,
                    message: 'Failed to save employee',
                    data: null
                };
            }
        } catch (error: any) {
            return ServicesErrorHandler(error);
        }
    }

    static async update(employee_id: string, employee: Employee): Promise<IEmployeeResponse> {
        try {
            const response = await api.post('employees/' + employee_id, employee.toFormData());
            if (response.status === 200) {
                const employee = Employee.fromJson(response.data.data);
                return {
                    success: true,
                    message: 'Employee updated successfully',
                    data: employee
                };
            } else {
                return {
                    success: false,
                    message: 'Failed to update employee',
                    data: null
                };
            }
        } catch (error: any) {
            return ServicesErrorHandler(error);
        }
    }

    static async delete(employee_id: string): Promise<IEmployeeResponse> {
        try {
            const response = await api.delete('employees/' + employee_id);
            if (response.status === 200) {
                return {
                    success: true,
                    message: 'Employee deleted successfully',
                    data: null
                };
            } else {
                return {
                    success: false,
                    message: 'Failed to delete employee',
                    data: null
                };
            }
        } catch (error: any) {
            return ServicesErrorHandler(error);
        }
    }
}