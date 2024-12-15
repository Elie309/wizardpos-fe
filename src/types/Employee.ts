export enum EmployeeRole {
    admin = 'admin',
    manager = 'manager',
    user = 'user'
}

export type IEmployee = {
    id?: string;
    phone_number: string;
    email: string;
    password: string;
    first_name: string;
    last_name: string;
    role: EmployeeRole;
    is_active: boolean;
}

export default class Employee {

    id: string;
    phone_number: string;
    email: string;
    password: string;
    first_name: string;
    last_name: string;
    role: EmployeeRole;
    is_active: boolean;


    constructor() {
        this.id = '';
        this.phone_number = '';
        this.email = '';
        this.password = '';
        this.first_name = '';
        this.last_name = '';
        this.role = EmployeeRole.user;
        this.is_active = true;
       
    }

    static fromJson(data: any): Employee {
        const employee = new Employee();
        employee.id = data.employee_id;
        employee.phone_number = data.employee_phone_number;
        employee.email = data.employee_email;
        employee.first_name = data.employee_first_name;
        employee.last_name = data.employee_last_name;
        employee.role = data.employee_role;
        employee.is_active = data.employee_is_active;
        return employee;
    }

   toFormData(): FormData {
    let formData = new FormData();
    formData.append('employee_id', this.id);
    formData.append('employee_phone_number', this.phone_number);
    formData.append('employee_email', this.email);
    formData.append('employee_first_name', this.first_name);
    formData.append('employee_last_name', this.last_name);
    formData.append('employee_role', this.role);
    formData.append('employee_is_active', this.is_active ? '1' : '0');

    if( this.password !== undefined && this.password !== null && this.password.trim() !== ''){
        formData.append('employee_password', this.password);
    }
    return formData;
   }



}