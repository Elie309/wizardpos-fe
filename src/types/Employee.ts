export interface Employee {
    id: string;
    username: string;
    password: string;
}

export const employees: Employee[] = [
    { id: "emp1", username: "john_doe", password: "password123" },
    { id: "emp2", username: "jane_doe", password: "secret456" },
];
