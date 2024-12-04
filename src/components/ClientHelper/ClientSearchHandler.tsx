
import { useEffect, useState } from "react";
import Client from "../../types/Client";
import ClientServices from "../../services/ClientServices";
import Loading from "../Loading/Loading";

type IProps = {
    onClientSelect: (client: Client) => void;
    onAddClientButtonClick: () => void;
}


export default function ClientSearchHandler(props: IProps) {



    const [clients, setClients] = useState<Client[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>('');


    const [loading, setLoading] = useState(false);



    const handleRowClick = (client: Client) => {
        props.onClientSelect(client);
    };

    const loadClients = async () => {
        setLoading(true);
        try {
            const response = await ClientServices.getAll(50, 1, searchTerm);

            if (!response.success) {
                setLoading(false);
                setClients([]);
                return;
            }
            setClients(response.data as Client[]);
            setLoading(false);

        } catch (error) {
            setLoading(false);
        }
    };


    useEffect(() => {
        if (searchTerm !== '' && searchTerm.length > 2) {
            loadClients();
        }
        if (searchTerm === '') {
            setClients([]);
        }



    }, [searchTerm]);



    return (
        <div className='w-full px-4 bg-white rounded overflow-auto '>


            <div className='w-full grid grid-cols-10 gap-2 items-center mb-8'>
                <input
                    className="main-input py-1 col-span-10 md:col-span-8"
                    type="text"
                    placeholder="Search clients..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <a onClick={props.onAddClientButtonClick}
                    className='submit-button p-1 py-2 sm:p-2 text-sm text-center col-span-10 md:col-span-2
                            cursor-pointer
                        '>
                    Add Client
                </a>

            </div>




            <div className={`overflow-y-hidden overflow-x-auto min-h-64 ${loading ? "flex items-center justify-center" : ""}`}>

                {loading && <Loading />}

                {!loading && <table className='table-custom '>
                    <thead>
                        <tr>
                            <th>Full Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                        </tr>
                    </thead>
                    <tbody >

                        {!loading && clients.length === 0 && (
                            <tr>
                                <td colSpan={3} className='text-center cursor-default  hover:bg-white'>
                                    <p className="text-gray-400">No clients found</p>
                                </td>
                            </tr>
                        )}

                        {!loading && clients.length > 0 && (clients.map((client) => (
                            <tr key={client.client_id} onClick={() => handleRowClick(client)}>
                                <td >{client.getFullName()}</td>
                                <td >{client.client_email}</td>
                                <td >{client.client_phone_number}</td>
                            </tr>
                        )))}
                    </tbody>
                </table>}
            </div>

        </div>
    );


}