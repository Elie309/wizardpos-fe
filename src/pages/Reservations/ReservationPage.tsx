import { useEffect, useState } from "react";
import Schedular from "../../components/Scheduler/Scheduler";


type ISettings = {
    PinDrawer: boolean
}

const initialSettings: ISettings  = {
    PinDrawer: true
}

export default function ReservationPage() {

    const [settings, setSettings] = useState<ISettings>(initialSettings);

    const loadSettings = () => {
        if(localStorage.getItem('settings')) {
            setSettings(JSON.parse(localStorage.getItem('settings')!));
            localStorage.setItem('settings', JSON.stringify(initialSettings));
        }
    
    }

    useEffect(() => {
        loadSettings();
    }, []);

    return (
        <div className="">
            <Schedular PinDrawer={settings.PinDrawer} />
        </div>
    );
}
