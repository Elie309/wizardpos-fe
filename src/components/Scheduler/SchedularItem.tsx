import { useEffect, useState } from "react";
import { ReservationStatus } from "../../types/Reservation";

type IProps = {
    style: React.CSSProperties;
    title: string;
    startDate: string;
    endDate: string;
    status: string;
    onClick: () => void;
}


function formatTime(dateString: string) {
    const date = new Date(dateString);
    return `${date.getHours()}:${date.getMinutes().toString().padStart(2, '0')}`;
}



export default function SchedularItem(props: IProps) {


    const [reservationStatusColor, setReservationStatusColor] = useState('bg-yellow-500');
    

    const handleOnClick = () => {
        props.onClick();
    }

    useEffect(() => {

        //Set the reservation status and color based on the reservation state
        switch (props.status) {
            case ReservationStatus.PENDING:
                setReservationStatusColor('bg-yellow-500');
                break;
            case ReservationStatus.CONFIRMED:
                setReservationStatusColor('bg-green-500');
                break;
            case ReservationStatus.CANCELLED:
                setReservationStatusColor('bg-red-500');
                break;
            case ReservationStatus.COMPLETED:
                setReservationStatusColor('bg-blue-500');
                break;
            default:
                setReservationStatusColor('bg-yellow-500');
                break;
        }

    }, [props.status])

    return (
        <div
            onClick={handleOnClick}
            className={`absolute cursor-pointer ${reservationStatusColor} text-white p-1 rounded-lg`}
            style={props.style}
        >
            <h3 className="text-sm font-medium">{props.title}</h3>
            <p className="text-xs">
                {formatTime(props.startDate)} - {formatTime(props.endDate)}
            </p>
        </div>
    )
}