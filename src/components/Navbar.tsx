import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const location = useLocation(); // Get the current route to highlight the active link

  const navLinkClass = (path: string) =>
    location.pathname === path
      ? "text-blue-500 font-bold"
      : "text-gray-700 hover:text-blue-500";

  return (
    <nav className="bg-white shadow py-4 px-8">
      <div className="flex flex-row justify-between">

        <ul className="flex space-x-6">
          <li>
            <Link to="/orders" className={navLinkClass("/orders")}>
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

        <ul>
          <li>
            <Link to="/employees/1" className={navLinkClass("/employees")}>
              <div className="w-8 h-8">
                <img src="profile.svg" alt="Profile" />
              </div>
            </Link>
          </li>
        </ul>
      </div>

    </nav>
  );
}
