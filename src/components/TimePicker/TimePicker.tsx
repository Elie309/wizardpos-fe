import { useState, ChangeEvent, useEffect } from 'react';

interface Time {
    hours: string;
    minutes: string;
}

interface TimePickerProps {
    initialTime?: string;
    onChange: (time: string) => void;
    readOnly?: boolean;
}

export default function TimePicker({ initialTime, onChange, readOnly }: TimePickerProps) {
    const [time, setTime] = useState<Time>({ hours: '', minutes: '' });

    useEffect(() => {
        if (initialTime) {
            let strings = initialTime.split(':');
            setTime({ hours: strings[0], minutes: strings[1] });
        }
    }, [initialTime]);

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        if (isValidTime(value, name)) {
            const newTime = { ...time, [name]: value };
            setTime(newTime);
            onChange(formatTime(newTime));
        }
    };

    const isValidTime = (value: string, type: string): boolean => {
        const num = parseInt(value, 10);
        if (isNaN(num)) return false;
        if (type === 'hours' && (num < 0 || num > 23)) return false;
        if (type === 'minutes') {
            if (num < 0 || num > 59) return false;
        }
        return true;
    };

    const formatTime = (time: Time): string => {
        return `${time.hours}:${time.minutes}`;
    };

    return (
        <div className="relative">
            <div className="flex space-x-2">
                <input
                    type="number"
                    min={0}
                    max={23}
                    name="hours"
                    value={time.hours}
                    onChange={handleChange}
                    placeholder="HH"
                    disabled={readOnly || false}
                    className="main-input border p-2 rounded w-16 text-center"
                />

                :
                <input
                    type="number"
                    min={0}
                    max={59}
                    name="minutes"
                    value={time.minutes}
                    onChange={handleChange}
                    placeholder="MM"
                    disabled={readOnly || false}
                    className="main-input border p-2 rounded w-16 text-center"
                />

            </div>
        </div>
    );
}