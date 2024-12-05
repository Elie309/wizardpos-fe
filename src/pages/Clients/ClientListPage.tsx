import { useEffect, useState } from "react";
import Client from "../../types/Client";
import ClientServices from "../../services/ClientServices";
import Loading from "../../components/Utils/Loading";
import Pager from "../../components/Utils/Pager";

export default function ClientListPage() {


    const [clients, setClients] = useState<Client[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>('');

    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [perPage, setPerPage] = useState(10);


    const [loading, setLoading] = useState(true);


    const handleRowClick = (client_id: string) => {
        window.location.href = `/clients/${client_id}`;
    };

    const loadClients = async () => {
        setLoading(true);
        try {
            const response = await ClientServices.getAll(perPage, currentPage, searchTerm);

            if (!response.success) {
                setLoading(false);
                setClients([]);
                return;
            }
            setClients(response.data as Client[]);
            setLoading(false);

            if (response.details) {
                setTotalPages(response.details.pageCount);
                setCurrentPage(response.details.currentPage);
                setPerPage(response.details.perPage);
            }


        } catch (error) {
            setLoading(false);
        }
    };


    useEffect(() => {
        loadClients();
    }, [currentPage, perPage, searchTerm]);


    return (
        <div className='w-full h-full p-8 mx-auto mt-8 shadow-lg max-w-5xl bg-white rounded overflow-auto'>

            <div className='flex flex-row justify-between items-center'>
                <p className='link-internal'><a href='/' className=''>Home</a> / Clients</p>
            </div>
            <h2 className='primary-title'>Clients</h2>

            <div className='w-full grid grid-cols-10 gap-2 items-center mb-8'>
                <input
                    className="main-input py-1 col-span-10 md:col-span-6"
                    type="text"
                    placeholder="Search clients..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <select
                    className='main-input text-sm py-2 col-span-5 md:col-span-2'
                    value={perPage}
                    onChange={(e) => {
                        setPerPage(parseInt(e.target.value));
                    }}
                >
                    <option value='10'>10 per page</option>
                    <option value='20'>20 per page</option>
                    <option value='50'>50 per page</option>
                    <option value='100'>100 per page</option>
                </select>
                <a href='clients/add' className='submit-button p-1 py-2 sm:p-2 text-sm text-center col-span-5 md:col-span-2'>Add Client</a>

            </div>

            {loading && <Loading />}
            {!loading && clients.length === 0 && (
                <div className='text-center'>No clients found</div>
            )}

            {!loading && clients.length > 0 &&
                <div className='overflow-y-hidden overflow-x-auto'>


                    <table className='table-custom'>
                        <thead>
                            <tr>
                                <th>Full Name</th>
                                <th>Email</th>
                                <th>Phone</th>
                            </tr>
                        </thead>
                        <tbody >
                            {clients.map((client) => (
                                <tr key={client.client_id} onClick={() => handleRowClick(client.client_id!)}>
                                    <td >{client.getFullName()}</td>
                                    <td >{client.client_email}</td>
                                    <td >{client.client_phone_number}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            }

            <Pager currentPage={currentPage} perPage={perPage} totalPages={totalPages} key={123} onPageChange={(index: number) => {
                setCurrentPage(index);
            }} />
        </div>
    );
}