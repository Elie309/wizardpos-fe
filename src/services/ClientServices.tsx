import { AxiosError } from "axios";
import Client, { IClient } from "../types/Client";
import api from "../utils/Axios";
import { CastBooleanToNumber } from "../utils/Helpers/CastBoolean";

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

    static async save(client: IClient): Promise<IClientResponse> {

        try {

            let formData = new FormData();
            formData.append('client_first_name', client.client_first_name);
            formData.append('client_last_name', client.client_last_name);
            formData.append('client_phone_number', client.client_phone_number);

            if (client.client_email && client.client_email.trim().length > 0) {
                formData.append('client_email', client.client_email);
            }
            if (client.client_address && client.client_address.trim().length > 0) {
                formData.append('client_address', client.client_address);
            }
            formData.append('client_is_active', CastBooleanToNumber(client.client_is_active).toString());


            const response = await api.post('clients', formData);

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

            
            if(error instanceof AxiosError){

                let errors = error.response?.data.errors;
                // Convert json object to string
                let message = JSON.stringify(errors);
                //get values and join

                //If errors is an array
                if(Array.isArray(errors)){
                    message = errors.join(', ').toLowerCase();
                }else if(typeof errors === 'object') {
                    message = Object.values(errors).join(', ').toLowerCase();
                }
    
    
                return {
                    success: false,
                    message: error.response?.data.message.toString().concat(", ", message),
                    data: null
                };

            }else {
                return {
                    success: false,
                    message: error.message || 'An error occurred',
                    data: null
                };
            }

        }
    }

    static async update(client_id: string, client: IClient): Promise<IClientResponse> {

        try {

            let formData = new FormData();
            formData.append('client_first_name', client.client_first_name);
            formData.append('client_last_name', client.client_last_name);
            formData.append('client_phone_number', client.client_phone_number);

            if (client.client_email && client.client_email.trim().length > 0) {
                formData.append('client_email', client.client_email);
            }
            if (client.client_address && client.client_address.trim().length > 0) {
                formData.append('client_address', client.client_address);
            }
            formData.append('client_is_active', CastBooleanToNumber(client.client_is_active).toString());

            const response = await api.post('clients/'+client_id, formData);

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

            
            if(error instanceof AxiosError){

                let errors = error.response?.data.errors;
                // Convert json object to string
                let message = JSON.stringify(errors);
                //get values and join

                //If errors is an array
                if(Array.isArray(errors)){
                    message = errors.join(', ').toLowerCase();
                }else if(typeof errors === 'object') {
                    message = Object.values(errors).join(', ').toLowerCase();
                }
    
    
                return {
                    success: false,
                    message: error.response?.data.message.toString().concat(", ", message),
                    data: null
                };

            }else {
                return {
                    success: false,
                    message: error.message || 'An error occurred',
                    data: null
                };
            }

        }
    }
}