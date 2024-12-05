import React, { useEffect, useRef, useState } from 'react';
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import Drawer from '../Drawer/Drawer';
import ReservationForm from './ReservationForm';

import RestaurantTable from '../../types/RestaurantTable';
import RestaurantTableService from '../../services/RestaurantTableService';
import SchedularTableTime from './SchedularTableTime';
import Reservation from '../../types/Reservation';
import Loading from '../Utils/Loading';
import ErrorDisplay from '../Utils/ErrorComponent';
import ReservationService from '../../services/ReservationService';



export default function Scheduler() {

    const [date, setDate] = useState<Date>(new Date());
    const [tables, setTables] = useState<RestaurantTable[]>([]);
    const [currentTable, setCurrentTable] = useState<RestaurantTable | null>(null);

    const [reservations, setReservations] = useState<Reservation[] | null>(null);

    const [isFormEdit, setIsFormEdit] = useState(false);
    const [dataForm, setDataForm] = useState<Reservation | null>(null);


    const [loading, setLoading] = useState(false);
    const [error, setError] = React.useState<string | null>(null);

    const [isDrawerOpen, setIsDrawerOpen] = useState(false);



    const drawerRef = useRef<{ closeDrawer: () => void, openDrawer: () => void, isDrawerOpen: () => boolean }>(null);


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


    const onReservationClick = (reservation: Reservation) => {

        if (drawerRef.current?.isDrawerOpen()) {
            setIsDrawerOpen(false);
            drawerRef.current?.closeDrawer();

            setTimeout(() => {
                setDataForm(reservation);
                setIsFormEdit(true);
                setIsDrawerOpen(true);
                drawerRef.current?.openDrawer();
            }, 300);

        } else {

            setDataForm(reservation);
            setIsFormEdit(true);
            setIsDrawerOpen(true);
            drawerRef.current?.openDrawer();
        }


    }

    const onDrawerClose = () => {
        setIsDrawerOpen(false);
    }

    const addReservationHandler = () => {

        if (drawerRef.current?.isDrawerOpen()) {
            drawerRef.current?.closeDrawer();
            setIsDrawerOpen(false);

            setTimeout(() => {
                drawerRef.current?.openDrawer();
                setIsDrawerOpen(true);
                setDataForm(null);
                setIsFormEdit(false);
            }, 300);
        } else {
            setDataForm(null);
            setIsFormEdit(false);
            drawerRef.current?.openDrawer();
            setIsDrawerOpen(true);

        }



    }



    const loadAll = async () => {
        try {
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
        setLoading(true);
        loadAll();
    }, []);


    useEffect(() => {
        setLoading(true);
        loadAll();
    }, [date]);


    if (loading) {
        return <Loading />;
    }



    return (
        <div className="h-screen flex flex-col bg-gray-100 overflow-auto">
            <Drawer ref={drawerRef}
                title={isFormEdit ? "Edit Reservation" : "Add Reservation"}
                onDrawerClose={onDrawerClose}
            >
                {isDrawerOpen ?
                    <ReservationForm
                        isEdit={isFormEdit}
                        data={dataForm}
                        tables={tables}
                        currentDate={date.toISOString().split('T')[0]}
                        currentTable={currentTable}
                    /> : <div></div>}
            </Drawer>

            <div className="grid grid-cols-12 mx-10 ">
                <div className='col-span-12 md:col-span-9 overflow-auto'>

                    <div>


                        <div className='flex flex-row py-4'>
                            <h1 className='primary-title'>Table Reservations</h1>

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
                                onClick={addReservationHandler}
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

                    {currentTable && reservations && <SchedularTableTime table={currentTable} reservations={reservations} onReservationClick={onReservationClick} />}

                </div>

            </div>

        </div>
    );
}