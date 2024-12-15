
import Order from "../types/Order";
import api from "../utils/Axios";
import ServicesErrorHandler from "./ServicesErrorHandler";

type IReportService = {
    success: boolean;
    message: string;
    data: Order | Order[] | null;
    totals?: any;
}

export default class ReportService{

    static async getReport(start_date: Date, end_date?: Date): Promise<IReportService> {
        try {
            let response = null;

            if(!end_date){
                response = await api.get('/reports?start_date=' + start_date.toISOString().split('T')[0]);

            }else{
                response = await api.get('/reports?start_date=' + start_date.toISOString().split('T')[0] + '&end_date=' + end_date.toISOString().split('T')[0]);
            }

            if (response.status === 200) {
                let orders = response.data!.data.orders.map((order: any) => Order.fromJson(order));

                let totals = response.data!.data.totals;

                return {
                    success: true,
                    message: 'Report fetched successfully',
                    data: orders,
                    totals: totals
                };
            }
            return {
                success: false,
                message: 'Failed to fetch report',
                data: null
            }
        } catch (error: any) {
            return ServicesErrorHandler(error);
        }
    }

}