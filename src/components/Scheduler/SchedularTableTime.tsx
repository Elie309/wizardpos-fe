import { useEffect } from "react";
import Reservation from "../../types/Reservation";
import RestaurantTable from "../../types/RestaurantTable"
import SchedularItem from "./SchedularItem";

type IProps = {
    table: RestaurantTable;
    reservations: Reservation[];
    onReservationClick: (reservation: Reservation) => void;
}

function getHour(dateString: string) {
    const date = new Date(dateString);
    return date.getHours() + date.getMinutes() / 60;
}


export default function SchedularTableTime({ table, reservations, onReservationClick }: IProps) {


    const handleOnAssetClick = (reservation: Reservation) => {

        //Handle the click event
        onReservationClick(reservation);       
    };

    useEffect(() => {
        reservations.filter((reservations) => Number(reservations.table_id) === Number(table.table_id));

    }, [reservations, table])

    

    return (
        <div key={table.table_id} className="p-4 border rounded-lg shadow-lg mx-2 bg-white flex flex-col min-h-full min-w-[250px]">
            <h2 className="text-xl font-semibold mb-2">{table.table_name}</h2>
            <div className="relative flex-grow">
                {[...Array(24)].map((_, hour) => (
                    <div key={hour} className="border-t border-gray-200 h-8 relative">
                        <span className="absolute left-0 text-xs text-gray-500">{hour}:00</span>
                    </div>
                ))}
                {reservations && reservations
                    .filter((reservations) => Number(reservations.table_id) === Number(table.table_id))
                    .map((reservation, index) => (
                        <SchedularItem
                            onClick={() => handleOnAssetClick(reservation)}
                            key={index}
                            title={reservation.client_name}
                            startDate={reservation.starting_time}
                            endDate={reservation.ending_time}
                            status={reservation.status}
                            style={{
                                top: `${getHour(reservation.starting_time) * 2}rem`,
                                height: `${(new Date(reservation.ending_time).getTime() - new Date(reservation.starting_time).getTime()) / (1000 * 60 * 60) * 2}rem`,
                                left: '2rem',
                                right: '1rem',
                            }}
                        />

                    ))}
            </div>
        </div>
    )
}
