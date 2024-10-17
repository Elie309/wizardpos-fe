import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const location = useLocation(); // Get the current route to highlight the active link

  const navLinkClass = (path: string) =>
    location.pathname === path
      ? "text-blue-500 font-bold underline"
      : "text-gray-700 hover:text-blue-500";

  return (
    <nav className="bg-white shadow p-4">
      <ul className="flex space-x-6">
        <li>
          <Link to="/orders" className={navLinkClass("/")}>
            Orders
          </Link>
        </li>
        <li>
          <Link to="/reservations" className={navLinkClass("/reservations")}>
            Reservations
          </Link>
        </li>
        <li>
          <Link to="/employees" className={navLinkClass("/employees")}>
            Employees
          </Link>
        </li>
      </ul>
    </nav>
  );
}
