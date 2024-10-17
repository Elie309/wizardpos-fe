// // src/pages/EmployeePage.tsx
// import { useState } from "react";
// import { Employee, employees as initialEmployees } from "../../types/Employee";
// import { generateId } from "../../utils/generateId";

// export default function EmployeePage() {
//     const [employees, setEmployees] = useState<Employee[]>(initialEmployees);
//     const [newEmployee, setNewEmployee] = useState({ username: "", password: "" });

//     const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//         const { name, value } = e.target;
//         setNewEmployee((prev) => ({ ...prev, [name]: value }));
//     };

//     const handleAddEmployee = () => {
//         if (!newEmployee.username || !newEmployee.password) {
//             alert("Please fill out all fields.");
//             return;
//         }

//         const newEmp: Employee = {
//             id: generateId(),
//             username: newEmployee.username,
//             password: newEmployee.password,
//         };

//         setEmployees([...employees, newEmp]);
//         setNewEmployee({ username: "", password: "" });
//     };

//     const handleDeleteEmployee = (id: string) => {
//         setEmployees(employees.filter((emp) => emp.id !== id));
//     };

//     return (
//         <div className="p-8">
//             <h1 className="text-2xl font-bold mb-6">Employee Management</h1>

//             {/* Add Employee Form */}
//             <div className="mb-6">
//                 <h2 className="text-xl font-semibold mb-4">Add New Employee</h2>
//                 <input
//                     type="text"
//                     name="username"
//                     placeholder="Username"
//                     value={newEmployee.username}
//                     onChange={handleInputChange}
//                     className="w-full px-4 py-2 border rounded mb-4"
//                 />
//                 <input
//                     type="password"
//                     name="password"
//                     placeholder="Password"
//                     value={newEmployee.password}
//                     onChange={handleInputChange}
//                     className="w-full px-4 py-2 border rounded mb-4"
//                 />
//                 <button
//                     onClick={handleAddEmployee}
//                     className="w-full bg-blue-500 text-white py-2 rounded"
//                 >
//                     Add Employee
//                 </button>
//             </div>

//             {/* Employee List */}
//             <div>
//                 <h2 className="text-xl font-semibold mb-4">Employee List</h2>
//                 {employees.length > 0 ? (
//                     <ul>
//                         {employees.map((emp) => (
//                             <li key={emp.id} className="flex justify-between items-center mb-2">
//                                 <span>{emp.username}</span>
//                                 <button
//                                     onClick={() => handleDeleteEmployee(emp.id)}
//                                     className="text-red-500"
//                                 >
//                                     Delete
//                                 </button>
//                             </li>
//                         ))}
//                     </ul>
//                 ) : (
//                     <p className="text-gray-500">No employees added yet.</p>
//                 )}
//             </div>
//         </div>
//     );
// }


// src/pages/EmployeePage.tsx
import { useState } from "react";
import { Employee, employees as initialEmployees } from "../../types/Employee";
import { generateId } from "../../utils/generateId";
import { Link } from "react-router-dom";

export default function EmployeePage() {
  const [employees, setEmployees] = useState<Employee[]>(initialEmployees);
  const [newEmployee, setNewEmployee] = useState({ username: "", password: "" });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewEmployee((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddEmployee = () => {
    if (!newEmployee.username || !newEmployee.password) {
      alert("Please fill out all fields.");
      return;
    }

    const newEmp: Employee = {
      id: generateId(),
      username: newEmployee.username,
      password: newEmployee.password,
    };

    setEmployees([...employees, newEmp]);
    setNewEmployee({ username: "", password: "" });
  };

  const handleDeleteEmployee = (id: string) => {
    setEmployees(employees.filter((emp) => emp.id !== id));
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Employee Management</h1>

      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-4">Add New Employee</h2>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={newEmployee.username}
          onChange={handleInputChange}
          className="w-full px-4 py-2 border rounded mb-4"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={newEmployee.password}
          onChange={handleInputChange}
          className="w-full px-4 py-2 border rounded mb-4"
        />
        <button
          onClick={handleAddEmployee}
          className="w-full bg-blue-500 text-white py-2 rounded"
        >
          Add Employee
        </button>
      </div>

      <h2 className="text-xl font-semibold mb-4">Employee List</h2>
      {employees.length > 0 ? (
        <ul>
          {employees.map((emp) => (
            <li
              key={emp.id}
              className="flex justify-between items-center mb-2"
            >
              <Link to={`/employees/${emp.id}`} className="hover:underline">
                {emp.username}
              </Link>
              <button
                onClick={() => handleDeleteEmployee(emp.id)}
                className="text-red-500"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">No employees added yet.</p>
      )}
    </div>
  );
}
