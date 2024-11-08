// src/pages/ReservationPage.tsx
import { useEffect, useState } from "react";
import { Table } from "../../types/Table";

// Sample table data
const sampleTables: Table[] = [
    { id: 1, name: "Table 1", image: "🪑", reserved: false },
    { id: 2, name: "Table 2", image: "🪑", reserved: false },
    { id: 3, name: "Table 3", image: "🪑", reserved: false },
    { id: 4, name: "Table 4", image: "🪑", reserved: false },
    { id: 5, name: "Table 5", image: "🪑", reserved: false },
    { id: 6, name: "Table 6", image: "🪑", reserved: false },
    { id: 7, name: "Table 7", image: "🪑", reserved: false },
    { id: 8, name: "Table 8", image: "🪑", reserved: false },
    { id: 9, name: "Table 9", image: "🪑", reserved: false },
    { id: 10, name: "Table 10", image: "🪑", reserved: false },
];

export default function ReservationPage() {

    const [tables, setTables] = useState<Table[]>(sampleTables);
    const [selectedTable, setSelectedTable] = useState<number | null>(null);

    const handleSelectedTable = (id: number) => {
        console.log(`Table ${id} selected`);
    };

    useEffect(() => {

        setTables(sampleTables);
    }, []);

    return (
        <div className="p-8">
            <h1 className="text-2xl font-bold mb-6">Table Reservation</h1>

            <div className="grid grid-cols-2 gap-6">
                {tables.map((table) => (
                    <div
                        key={table.id}
                        onClick={() => handleSelectedTable(table.id)}
                        className={`p-6 border rounded cursor-pointer text-center text-5xl ${table.reserved
                                ? "bg-red-300 cursor-not-allowed"
                                : selectedTable === table.id
                                    ? "bg-green-300"
                                    : "hover:bg-gray-100"
                            }`}
                    >
                        {table.image}
                        <p className="text-lg mt-2">{table.name}</p>
                        {table.reserved && (
                            <div className="text-sm mt-2">
                                <p><strong>Reservation ID:</strong> {table.reservationId}</p>
                                <p><strong>Client:</strong> {table.clientName}</p>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
