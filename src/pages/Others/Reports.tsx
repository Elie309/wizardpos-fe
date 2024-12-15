import { useEffect, useState } from "react";
import Loading from "../../components/Utils/Loading";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../utils/store";
import Order from "../../types/Order";
import ReportService from "../../services/ReportService";
import * as XLSX from 'xlsx';

export default function Reports() {

    const [report, setReport] = useState<Order[]>([]);
    const [startDate, setStartDate] = useState<Date>(new Date());
    const [endDate, setEndDate] = useState<Date | null>(new Date());
    const [selectReportType, setSelectReportType] = useState<string>('daily');

    const [total_sales, setTotalSales] = useState<number>(0);
    const [total_orders, setTotalOrders] = useState<number>(0);

    const user = useSelector((state: RootState) => state.user);

    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();


    const loadReport = async () => {
        setLoading(true);
        try {
            let response = null;
            if (selectReportType === 'daily') {
                response = await ReportService.getReport(startDate);
            } else {
                response = await ReportService.getReport(startDate, endDate!);
            }

            if (!response.success) {
                setReport([]);
                return;
            }

            setTotalSales(response.totals.total_sales);
            setTotalOrders(response.totals.total_orders);
            setReport(response.data as Order[]);
            setLoading(false);


        } catch (error) {
            setLoading(false);
        } finally {
            setLoading(false);
        }
    };


    const downloadExcel = () => {
        let reportSheet = report.map((order) => {
            let { id, client_id, employee_id, order_items, notes, created_at, updated_at, deleted_at, ...orderData } = order;
            let newOrder = {
                ...orderData,
                notes: notes,
            }
            return newOrder;
        });

        const worksheet = XLSX.utils.json_to_sheet(reportSheet);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, `REPORT - ${selectReportType.toUpperCase()}`);

        // Adjust column titles
        const columns = Object.keys(reportSheet[0]).map(key => key.replace(/_/g, ' ').toUpperCase());
        XLSX.utils.sheet_add_aoa(worksheet, [columns], { origin: 'A1' });


        XLSX.writeFile(workbook, `report_${new Date().toISOString().split('T')[0]}_${selectReportType}.xlsx`);
    };


    useEffect(() => {
        document.title = 'Reports';
        if (user.role !== 'admin' && user.role !== 'manager') {
            navigate('/');
        }

        loadReport();
    }, []);

    useEffect(() => {

        if (selectReportType === 'daily') {
            setStartDate(new Date());
            setEndDate(null);
        } else if (selectReportType === 'weekly') {

            let date = new Date();
            let day = date.getDay();
            let diff = date.getDate() - day + (day == 0 ? -6 : 1);
            let monday = new Date(date.setDate(diff));
            setStartDate(monday);
            setEndDate(new Date());

        } else if (selectReportType === 'monthly') {
            let date = new Date();
            let firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
            let lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
            setStartDate(firstDay);
            setEndDate(lastDay);
        } else {
            setStartDate(new Date());
            setEndDate(null);
        }

    }, [selectReportType]);

    useEffect(() => {
        loadReport();
    }, [startDate, endDate]);

    return (
        <div className='w-full h-full p-8 mx-auto mt-8 shadow-lg max-w-5xl bg-white rounded overflow-auto'>

            <div className='flex flex-row justify-between items-center'>
                <p className='link-internal'><button onClick={() => navigate("/")} >Home</button> / Reports</p>

                <div className='grid grid-cols-2 gap-2 my-2'>
                    <button onClick={downloadExcel} className="reverse-button cursor-pointer flex flex-row items-center justify-end">
                        Download Excel
                    </button>

                    <select disabled={user.role !== "admin"} value={selectReportType} onChange={(e) => setSelectReportType(e.target.value)} className='main-input'>
                        <option value="daily">Daily</option>
                        <option value="weekly">Weekly</option>
                        <option value="monthly">Monthly</option>
                    </select>
                </div>
            </div>
            <h2 className='primary-title'>Report</h2>



            {loading && <Loading />}
            {!loading && report.length === 0 && (
                <div className='text-center'>Reports couldn't be loaded</div>
            )}

            <div className="my-10 text-lg font-semibold">
                <div className='flex flex-col items-center'>
                    <p>
                        <span className='font-bold'>Total Sales:</span> {total_sales}
                    </p>
                    <p>
                        <span className='font-bold'>Total Orders:</span> {total_orders}
                    </p>
                </div>
            </div>

            {!loading && report.length > 0 &&
                <div className='overflow-y-hidden overflow-x-auto'>


                    <table className='table-custom'>
                        <thead>
                            <tr>
                                <th>Count</th>
                                <th>Reference</th>
                                <th>Client</th>
                                <th>Date</th>
                                <th>Total</th>
                                <th>Status</th>
                                <th>Notes</th>
                            </tr>
                        </thead>
                        <tbody >
                            {report.map((report, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{report.reference}</td>
                                    <td>{report.client_name}</td>
                                    <td>{report.date}</td>
                                    <td>{report.total}</td>
                                    <td>{report.status}</td>
                                    <td className="max-w-48 truncate">{report.notes}</td>
                                </tr>

                            ))}
                        </tbody>
                    </table>
                </div>
            }

        </div>
    );

}