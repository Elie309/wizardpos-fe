interface ToasterProps {
    message: string;
    success: boolean;
    duration: number; // Add duration prop
}

const Toaster: React.FC<ToasterProps> = ({ success, message, duration }) => {

    return (
        <div className={`fixed top-2 right-10 w-64 text-center border
        ${success ? "border-green-700 bg-green-100" : "border-red-700 bg-red-100"} 
        text-gray-800 p-2 rounded z-50`}
        >
            {message}
            <div className="w-full bg-gray-200 h-1 mt-2">
                <div
                    className={`h-1 ${success ? "bg-green-700" : "bg-red-700"}`}
                    style={{ animation: `progress ${duration}ms linear` }}
                ></div>
            </div>
        </div>
    );
};

export default Toaster;
