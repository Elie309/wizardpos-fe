import { useState } from "react";

type IProps = {
    style: React.CSSProperties;
    title: string;
    startDate: string;
    endDate: string;
    onClick: () => void;
}


enum ReservationState {
    AVAILABLE = "available",
    RESERVED = "reserved",
    UNAVAILABLE = "unavailable"
} 


function formatTime(dateString: string) {
    const date = new Date(dateString);
    return `${date.getHours()}:${date.getMinutes().toString().padStart(2, '0')}`;
}



export default function SchedularItem(props: IProps) {


    const [reservationStatus, setReservationStatus] = useState(ReservationState.RESERVED);
    

    const handleOnClick = () => {
        
        props.onClick();
        setReservationStatus(ReservationState.AVAILABLE);
    }

    return (
        <div
            onClick={handleOnClick}
            className={`absolute cursor-pointer ${reservationStatus === ReservationState.AVAILABLE ? "bg-blue-500" : "bg-gray-400"} text-white p-1 rounded-lg`}
            style={props.style}
        >
            <h3 className="text-sm font-medium">{props.title}</h3>
            <p className="text-xs">
                {formatTime(props.startDate)} - {formatTime(props.endDate)}
            </p>
        </div>
    )
}