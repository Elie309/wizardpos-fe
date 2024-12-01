import { AxiosError } from "axios";
import Client, { IClient } from "../types/Client";
import api from "../utils/Axios";
import ServicesErrorHandler from "./ServicesErrorHandler";

type IClientResponse = {
    success: boolean;
    message: string;
    data: Client | Client[] | null;
    details?: any;
}


export default class ClientServices {


    static async getAll(rowPerPage: number, currentPage: number, search?: string): Promise<IClientResponse> {

        try {
            if (isNaN(rowPerPage) || isNaN(currentPage)) {
                return {
                    success: false,
                    message: 'Invalid row per page or page number',
                    data: null
                };
            }

            if (rowPerPage < 1 || currentPage < 1) {
                return {
                    success: false,
                    message: 'Invalid row per page or page number',
                    data: null
                };
            }

            if (!(search && search.trim().length > 0)) {
                search = '';
            }
            //escape search
            search = encodeURIComponent(search);

            const response = await api.get('/clients?perPage=' + rowPerPage + '&page=' + currentPage + '&search=' + search);

            let clients: Client[] = [];


            if (response.status === 200) {
                clients = response.data.clients.map((client: IClient) => Client.fromJson(client));

                delete response.data.products;

                return {
                    success: true,
                    message: 'Products fetched successfully',
                    data: clients,
                    details: response.data
                };
            } else {
                return {
                    success: false,
                    message: 'Failed to fetch products',
                    data: null
                };
            }



        } catch (error: any) {

            if (error instanceof AxiosError) {
                return {
                    success: false,
                    message: error.response?.data.message || 'An error occurred',
                    data: null
                };
            } else {
                return {
                    success: false,
                    message: error.message || 'An error occurred',
                    data: null
                };
            }

        }

    }

    static async get(client_id: string): Promise<IClientResponse> {

        try {
            if (!client_id || client_id.trim().length === 0) {
                return {
                    success: false,
                    message: 'Invalid client id',
                    data: null
                };
            }

            const response = await api.get('/clients/' + client_id);

            if (response.status === 200) {
                const client = Client.fromJson(response.data.data);

                return {
                    success: true,
                    message: 'Client fetched successfully',
                    data: client
                };
            } else {
                return {
                    success: false,
                    message: 'Failed to fetch client',
                    data: null
                };
            }
        } catch (error: any) {
            if (error instanceof AxiosError) {
                return {
                    success: false,
                    message: error.response?.data.message || 'An error occurred',
                    data: null
                };
            } else {
                return {
                    success: false,
                    message: error.message || 'An error occurred',
                    data: null
                };
            }
        }
    }

    static async save(client: Client): Promise<IClientResponse> {

        try {
            const response = await api.post('clients', client.toFormData());

            if (response.status === 201) {
                const client = Client.fromJson(response.data.data);
                return {
                    success: true,
                    message: 'Client saved successfully',
                    data: client
                };
            } else {
                return {
                    success: false,
                    message: 'Failed to save client',
                    data: null
                };
            }

        } catch (error: any) {
            return ServicesErrorHandler(error);

        }
    }

    static async update(client_id: string, client: Client): Promise<IClientResponse> {

        try {

            const response = await api.post('clients/'+client_id, client.toFormData());

            if (response.status === 200) {
                const client = Client.fromJson(response.data.data);
                return {
                    success: true,
                    message: 'Client saved successfully',
                    data: client
                };
            } else {
                return {
                    success: false,
                    message: 'Failed to save client',
                    data: null
                };
            }

        } catch (error: any) {
            return ServicesErrorHandler(error);
        }
    }
}