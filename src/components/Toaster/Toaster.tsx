interface ToasterProps {
    message: string;
    success: boolean;
    duration: number; // Add duration prop
}

const Toaster: React.FC<ToasterProps> = ({ success, message, duration }) => {

    return (
        <div className={`fixed top-2 right-14 w-80 text-center border
        ${success ? "border-green-800 bg-green-100 text-green-600" : "border-red-800 text-red-600 bg-red-100"} 
         p-2 rounded z-50`}
        >
            {message}
            <div className="w-full bg-gray-200 h-1 mt-2">
                <div
                    className={`h-1 ${success ? "bg-green-800" : "bg-red-800"}`}
                    style={{ animation: `progress ${duration}ms linear` }}
                ></div>
            </div>
        </div>
    );
};

export default Toaster;
