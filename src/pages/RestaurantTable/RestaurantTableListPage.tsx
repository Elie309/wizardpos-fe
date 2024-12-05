import { useEffect, useState } from "react";
import Loading from "../../components/Utils/Loading";
import RestaurantTable from "../../types/RestaurantTable";
import RestaurantTableService from "../../services/RestaurantTableService";
import { useNavigate } from "react-router-dom";

export default function RestaurantTableListPage() {


    const [restaurantTables, setRestaurantTables] = useState<RestaurantTable[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [initialTables, setInitialTables] = useState<RestaurantTable[]>([]);


    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();


    const handleRowClick = (table_id: string) => {
        navigate(`/tables/${table_id}`);
    };

    const loadTables = async () => {
        setLoading(true);
        try {
            const response = await RestaurantTableService.getAll();

            if (!response.success) {
                setLoading(false);
                setRestaurantTables([]);
                return;
            }
            setRestaurantTables(response.data as RestaurantTable[]);
            setInitialTables(response.data as RestaurantTable[]);
            setLoading(false);

            

        } catch (error) {
            setLoading(false);
        }
    };


    useEffect(() => {
        loadTables();
    }, []);

    useEffect(() => {
        const results = initialTables.filter((table) =>
            table.table_name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setRestaurantTables(results);
    }, [searchTerm]);


    return (
        <div className='w-full h-full p-8 mx-auto mt-8 shadow-lg max-w-5xl bg-white rounded overflow-auto'>

            <div className='flex flex-row justify-between items-center'>
                <p className='link-internal'><button onClick={() => navigate('/')} className=''>Home</button> / Tables</p>
            </div>
            <h2 className='primary-title'>Tables</h2>

            <div className='w-full grid grid-cols-10 gap-2 items-center mb-8'>
                <input
                    className="main-input py-1 col-span-10 md:col-span-8"
                    type="text"
                    placeholder="Search tables..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button onClick={() => navigate('/tables/add')} className='submit-button p-1 py-2 sm:p-2 text-sm text-center col-span-10 md:col-span-2'>Add Table</button>

            </div>

            {loading && <Loading />}
            {!loading && restaurantTables.length === 0 && (
                <div className='text-center'>No tables found</div>
            )}

            {!loading && restaurantTables.length > 0 &&
                <div className='overflow-y-hidden overflow-x-auto'>


                    <table className='table-custom'>
                        <thead>
                            <tr>
                                <th>Table Name</th>
                                <th>Max Capacity</th>
                                <th>Active</th>
                                <th>Description</th>

                            </tr>
                        </thead>
                        <tbody >
                            {restaurantTables.map((table) => (
                                <tr key={table.table_id} onClick={() => handleRowClick(table.table_id!)}>
                                    <td >{table.table_name}</td>
                                    <td >{table.table_max_capacity}</td>
                                    <td >{table.table_is_active ? "Yes" : "No"}</td>
                                    <td className="max-w-48 truncate">{table.table_description}</td>

                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            }


        </div>
    );
}