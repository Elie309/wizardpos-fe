import { Link } from "react-router-dom";

export default function ErrorPage () {
    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <div className="text-center">
                <h1 className="text-9xl font-bold text-gray-500">404</h1>
                <h2 className="text-2xl font-semibold text-gray-700">Oops! Page not found</h2>
                <p className="mt-4 text-gray-500">
                    The page you are looking for does not exist. It might have been removed or is temporarily unavailable.
                </p>
                <Link
                    to="/"
                    className="submit-button mt-6 inline-block"
                >
                    Go to Home
                </Link>
            </div>
        </div>
    );
};
