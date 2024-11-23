import React, { useEffect } from 'react';
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import SchedularItem from './SchedularItem';
import Drawer from '../Drawer/Drawer';
import ReservationForm from './ReservationForm';

import RestaurantTable from '../../types/RestaurantTable';
import SettingsIcon from '../Icons/SettingsSVG';



const schedulerData = [

    { startDate: '2018-11-01T12:00', endDate: '2018-11-01T13:30', title: 'Go to a gym', asset: 1 },
    { startDate: '2018-11-01T14:00', endDate: '2018-11-01T15:00', title: 'Meeting', asset: 2 },
    { startDate: '2018-11-01T16:00', endDate: '2018-11-01T17:00', title: 'Meeting', asset: 3 },
    { startDate: '2018-11-01T17:30', endDate: '2018-11-01T18:30', title: 'Meeting', asset: 1 },
    { startDate: '2018-11-01T19:00', endDate: '2018-11-01T20:00', title: 'Meeting', asset: 2 },
    { startDate: '2018-11-01T20:30', endDate: '2018-11-01T21:30', title: 'Meeting', asset: 4 },
    { startDate: '2018-11-01T22:00', endDate: '2018-11-01T24:00', title: 'Meeting', asset: 3 },

];

function getHour(dateString: string) {
    const date = new Date(dateString);
    return date.getHours() + date.getMinutes() / 60;
}


type IProps = {
    PinDrawer?: boolean;
}

export default function Scheduler(props: IProps) {

    const [date, setDate] = React.useState<Date | null>(new Date());
    const [tables, setTables] = React.useState<RestaurantTable[]>([]);
    const [currentTables, setCurrentTables] = React.useState(tables);
    const drawerRef = React.useRef<{ toggleDrawer: () => void, openDrawer: () => void }>(null);

    const handleAssetsChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        if (e.target.value === 'All') {
            setCurrentTables(tables);
        } else {
            setCurrentTables([tables.find((table) => table.table_id.toString() === e.target.value)!]);
        }
    }

    const handleDateSelect = (date: Date | null) => {
        setDate(date);
    };

    const handleDateChange = (date: Date | null) => {
        setDate(date);
    };


    const handleOnAssetClick = () => {
        if (drawerRef.current) {
            drawerRef.current.openDrawer();
        }
    };


    useEffect(() => {
        // Fetch assets
        const tables: RestaurantTable[] = [
            RestaurantTable.create(1, 'Room 1', "Description 1", 10),
            RestaurantTable.create(2, 'Room 2', "Description 2", 20),
            RestaurantTable.create(3, 'Room 3', "Description 3", 30),
            RestaurantTable.create(4, 'Gym', "Description 4", 40),
        ];
        setTables(tables);
        setCurrentTables(tables);
    }, []);



    const FormComponent = () => {

        if (props.PinDrawer) {
            return (
                <Drawer ref={drawerRef} title="Add Reservation">
                    <ReservationForm />
                </Drawer>
            );
        } else {

            return (
                <div>
                    <ReservationForm />
                </div>
            );
        }

    }

    const handleSettings = () => {
        console.log('Settings');
    }



    return (
        <div className="h-screen flex flex-col bg-gray-100">
            <div className='flex flex-row'>
                <h1 className='primary-title'>Table Reservations</h1>
                <div className='flex flex-row items-center'>

                <SettingsIcon className="fill-secondary h-8 w-8 cursor-pointer" onClick={handleSettings} />
                </div>

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

                <select className="border border-gray-300 rounded-lg p-2 m-2" onChange={handleAssetsChange}>
                    <option value="All">All</option>
                    {tables.map((table) => (
                        <option key={table.table_id} value={table.table_id}>
                            {table.table_name}
                        </option>
                    ))}
                </select>

                <button className="submit-button text-white p-2 rounded-lg m-2">Add Event</button>


            </div>

            <div className='overflow-auto flex flex-row justify-start'>

                <FormComponent />

                <div className="flex-grow overflow-scroll ">

                    <div className={`flex min-h-full mx-4 py-8 ${currentTables.length == 1 ? "justify-center" : "justify-start"}`}>

                        {currentTables.map((table) => (
                            <div key={table.table_id} className="p-4 border rounded-lg shadow-lg mx-2 bg-white flex flex-col min-h-full min-w-[250px]">
                                <h2 className="text-xl font-semibold mb-2">{table.table_name}</h2>
                                <div className="relative flex-grow">
                                    {[...Array(24)].map((_, hour) => (
                                        <div key={hour} className="border-t border-gray-200 h-16 relative">
                                            <span className="absolute left-0 text-xs text-gray-500">{hour}:00</span>
                                        </div>
                                    ))}
                                    {schedulerData
                                        .filter((event) => event.asset === table.table_id)
                                        .map((event, index) => (
                                            <SchedularItem
                                                onClick={() => handleOnAssetClick()}
                                                key={index}
                                                title={event.title}
                                                startDate={event.startDate}
                                                endDate={event.endDate}
                                                style={{
                                                    top: `${getHour(event.startDate) * 4}rem`,
                                                    height: `${(new Date(event.endDate).getTime() - new Date(event.startDate).getTime()) / (1000 * 60 * 60) * 4}rem`,
                                                    left: '2rem',
                                                    right: '1rem',
                                                }}

                                            />
                                        ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            </div>

        </div>
    );
}