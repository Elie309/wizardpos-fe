import { useEffect } from "react";
import Schedular from "../../components/Scheduler/Scheduler";



export default function ReservationPage() {

    useEffect(() => {
        document.title = 'Reservations';
    }, []);


    return (
        <div className="w-full h-full">
            <Schedular />
        </div>
    );
}
