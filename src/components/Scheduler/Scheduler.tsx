import React, { forwardRef } from 'react';
import DatePicker, { CalendarContainer } from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import SchedularItem from './SchedularItem';
import Drawer from '../Drawer/Drawer';


// Assets
const assets = [
    { id: 'Room_1', title: 'Room 1' },
    { id: 'Room_2', title: 'Room 2' },
    { id: 'Room_3', title: 'Room 3' },
    { id: 'Gym', title: 'Gym' },
    { id: 'Gym2', title: 'Gym2' },
    { id: 'Gym3', title: 'Gym3' },
    { id: 'Gym4', title: 'Gym4' },
    { id: 'Gym5', title: 'Gym5' },
];

const schedulerData = [
    { startDate: '2018-11-01T09:45', endDate: '2018-11-01T10:15', title: 'Meeting', asset: 'Room_1' },
    { startDate: '2018-11-01T12:00', endDate: '2018-11-01T13:30', title: 'Go to a gym', asset: 'Gym' },
    { startDate: '2018-11-01T14:00', endDate: '2018-11-01T15:00', title: 'Meeting', asset: 'Room_2' },
    { startDate: '2018-11-01T16:00', endDate: '2018-11-01T17:00', title: 'Meeting', asset: 'Room_3' },
    { startDate: '2018-11-01T17:30', endDate: '2018-11-01T18:30', title: 'Meeting', asset: 'Room_1' },
    { startDate: '2018-11-01T19:00', endDate: '2018-11-01T20:00', title: 'Meeting', asset: 'Room_2' },
    { startDate: '2018-11-01T20:30', endDate: '2018-11-01T21:30', title: 'Meeting', asset: 'Room_3' },
    { startDate: '2018-11-01T22:00', endDate: '2018-11-01T24:00', title: 'Meeting', asset: 'Room_1' },

];

function getHour(dateString: string) {
    const date = new Date(dateString);
    return date.getHours() + date.getMinutes() / 60;
}

export default function Scheduler() {

    const [date, setDate] = React.useState<Date | null>(new Date());
    const [currentAssets, setCurrentAssets] = React.useState(assets);
    const drawerRef = React.useRef<{ toggleDrawer: () => void, openDrawer: () => void}>(null);

    const handleAssetsChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        if (e.target.value === 'All') {
            setCurrentAssets(assets);
        } else {
            setCurrentAssets([assets.find((asset) => asset.id === e.target.value)!]);
        }
    }

    const handleDateSelect = (date: Date | null) => {
        setDate(date);
    };

    const handleDateChange = (date: Date | null) => {
        setDate(date);
    };


    const handleOnAssetClick = (assetId: string) => {
        if (drawerRef.current) {
            drawerRef.current.openDrawer();
        }
    };




    return (
        <div className="h-screen flex flex-col bg-gray-100">
            <h1 className='primary-title'>Table Reservations</h1>

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
                    {assets.map((asset) => (
                        <option key={asset.id} value={asset.id}>
                            {asset.title}
                        </option>
                    ))}
                </select>

                <button className="submit-button text-white p-2 rounded-lg m-2">Add Event</button>

            </div>
            <Drawer ref={drawerRef}>
                <h2>Testtt</h2>
            </Drawer>



            <div className="flex-grow overflow-scroll ">

                <div className={`flex min-h-full mx-4 py-8 ${currentAssets.length == 1 ? "justify-center": "justify-start"}`}>

                    {currentAssets.map((asset) => (
                        <div key={asset.id} className="p-4 border rounded-lg shadow-lg mx-2 bg-white flex flex-col min-h-full min-w-[250px]">
                            <h2 className="text-xl font-semibold mb-2">{asset.title}</h2>
                            <div className="relative flex-grow">
                                {[...Array(24)].map((_, hour) => (
                                    <div key={hour} className="border-t border-gray-200 h-16 relative">
                                        <span className="absolute left-0 text-xs text-gray-500">{hour}:00</span>
                                    </div>
                                ))}
                                {schedulerData
                                    .filter((event) => event.asset === asset.id)
                                    .map((event, index) => (
                                        <SchedularItem
                                            onClick={() => handleOnAssetClick(asset.id)}
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
    );
}