// src/pages/EmployeeProfilePage.tsx
import { useParams, Link } from "react-router-dom";
import { employees } from "../types/Employee";

export default function EmployeeProfilePage() {
  const { id } = useParams<{ id: string }>();
  const employee = employees.find((emp) => emp.id === id);

  if (!employee) {
    return (
      <div className="p-8">
        <h1 className="text-2xl font-bold mb-6">Employee Not Found</h1>
        <Link to="/employees" className="text-blue-500 hover:underline">
          Back to Employee List
        </Link>
      </div>
    );
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Employee Profile</h1>
      <p>
        <strong>Username:</strong> {employee.username}
      </p>
      <p>
        <strong>Password:</strong> {employee.password}
      </p>
      <Link to="/employees" className="text-blue-500 hover:underline mt-4 block">
        Back to Employee List
      </Link>
    </div>
  );
}
