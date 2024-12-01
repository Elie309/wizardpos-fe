import React, { useEffect, useRef, useState } from 'react';
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import Drawer from '../Drawer/Drawer';
import ReservationForm from './ReservationForm';

import RestaurantTable from '../../types/RestaurantTable';
// import SettingsIcon from '../Icons/SettingsSVG';
import RestaurantTableService from '../../services/RestaurantTableService';
import SchedularTableTime from './SchedularTableTime';
import Reservation from '../../types/Reservation';
import Loading from '../Loading/Loading';
import ErrorDisplay from '../Error/ErrorComponent';
import ReservationService from '../../services/ReservationService';



export default function Scheduler() {

    const [date, setDate] = useState<Date>(new Date());
    const [tables, setTables] = useState<RestaurantTable[]>([]);
    const [currentTable, setCurrentTable] = useState<RestaurantTable | null>(null);

    const [reservations, setReservations] = useState<Reservation[] | null>(null);


    const [loading, setLoading] = useState(false);
    const [error, setError] = React.useState<string | null>(null);




    const drawerRef = useRef<{ toggleDrawer: () => void, openDrawer: () => void }>(null);


    const handleDateSelect = (date: Date | null) => {
        if (date)
            setDate(date);
        else setDate(new Date());
    };

    const handleDateChange = (date: Date | null) => {
        if (date)
            setDate(date);
        else setDate(new Date());
    };




    const loadAll = async () => {
        try {
            setLoading(true);
            const tablesResponse = await RestaurantTableService.getActive();

            if (tablesResponse.success) {
                let tables = tablesResponse.data as RestaurantTable[];
                setTables(tables);
                if (tables.length > 0) {
                    setCurrentTable(tables[0]);
                }
            }

            const reservationsResponse = await ReservationService.getReservations(date);
            if (reservationsResponse.success) {
                let reservations = reservationsResponse.data as Reservation[];
                setReservations(reservations);
            }
        } catch (error: any) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    }



    useEffect(() => {
        loadAll();
    }, []);


    useEffect(() => {
        setLoading(true);
        loadAll();
    }, [date]);


    if (loading) {
        <Loading />
    }

    return (
        <div className="h-screen flex flex-col bg-gray-100 overflow-auto">
            <Drawer ref={drawerRef} title="Add Reservation">
                <ReservationForm />
            </Drawer>

            <div className="grid grid-cols-12 mx-10 ">
                <div className='col-span-12 md:col-span-9 overflow-auto'>

                    <div>


                        <div className='flex flex-row py-4'>
                            <h1 className='primary-title'>Table Reservations</h1>
                            {/* <div className='flex flex-row items-center'>

                                <SettingsIcon className="fill-secondary h-8 w-8 cursor-pointer" onClick={handleSettings} />
                            </div> */}

                            {error && <ErrorDisplay message={error} />}

                        </div>

                        <div className="label-input-container flex flex-row justify-center ">

                            <DatePicker
                                showIcon={true}
                                toggleCalendarOnIconClick={true}
                                className='text-center cursor-pointer select-none '
                                selected={date}
                                onSelect={handleDateSelect}
                                onChange={handleDateChange}
                                dateFormat="dd-MMM-yyyy"
                                wrapperClassName='p-4 '
                            />

                            <button className="submit-button text-white p-2 rounded-lg m-2"
                                onClick={() => drawerRef.current?.openDrawer()}
                            >Add Reservation</button>


                        </div>





                        <div className='h-fit flex flex-row flex-wrap  justify-center'>
                            {/* SHOW TABLES in clickable objects */}

                            {tables.map((table) => (
                                <div key={table.table_id}
                                    onClick={() => setCurrentTable(table)}
                                    className="border m-4 cursor-pointer w-60 rounded-lg overflow-hidden shadow-lg">
                                    <img src="table-dining-sets.webp" alt={table.table_name} className="w-full h-32 object-cover" />
                                    <div className="p-4">
                                        <h2 className="text-lg font-semibold">{table.table_name}</h2>
                                        <p className="text-gray-600">Max Capacity: {table.table_max_capacity}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>



                <div className={`col-span-12 md:col-span-3 md:overflow-auto py-4 `}>
                    <h2 className='secondary-title md:hidden'>Hours</h2>

                    {currentTable && reservations && <SchedularTableTime table={currentTable} reservations={reservations} />}

                </div>

            </div>

        </div>
    );
}