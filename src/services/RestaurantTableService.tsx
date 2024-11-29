import { AxiosError } from "axios";
import RestaurantTable from "../types/RestaurantTable";
import api from "../utils/Axios";
import { CastBooleanToNumber } from "../utils/Helpers/CastBoolean";


type IRestaurantTableResponse = {
    success: boolean;
    message: string;
    data: RestaurantTable | RestaurantTable[] | null;
}


export default class RestaurantTableService {

    static async getAll(): Promise<IRestaurantTableResponse> {

        try{

            const response = await api.get('/tables');

            let tables: RestaurantTable[] = [];

            if(response.status === 200){
                tables = response.data.map((table: any) => RestaurantTable.fromJson(table));
            }

            return {
                success: true,
                message: 'Tables fetched successfully',
                data: tables
            };


        }catch(error: any){

            return {
                success: false,
                message: error.message || 'An error occurred',
                data: null
            };
        }

    }

    static async get(id: string): Promise<IRestaurantTableResponse> {

        try{

            const response = await api.get('/tables/' + id);

            if(response.status === 200){
                let tables = RestaurantTable.fromJson(response.data.data);

                return {
                    success: true,
                    message: 'Table fetched successfully',
                    data: tables
                };
            }

            return {
                success: false,
                message: 'Table not found',
                data: null
            };

        }catch(error: any){
            return {
                success: false,
                message: error.message || 'An error occurred',
                data: null
            };
        }

    }

    static async getActive(): Promise<IRestaurantTableResponse> {
        
        try{
                
                const response = await api.get('/tables/active');
    
                let tables: RestaurantTable[] = [];
    
                if(response.status === 200){
                    tables = response.data.map((table: any) => RestaurantTable.fromJson(table));
                }
    
                return {
                    success: true,
                    message: 'Tables fetched successfully',
                    data: tables
                };
        }catch(error: any){
            return {
                success: false,
                message: error.message || 'An error occurred',
                data: null
            };
        }

    }

    static async save(newRestaurantTable: RestaurantTable): Promise<IRestaurantTableResponse> {

        try{
            let formData = new FormData();


            

            formData.append('table_name', newRestaurantTable.table_name);
            formData.append('table_description', newRestaurantTable.table_description);
            formData.append('table_max_capacity', newRestaurantTable.table_max_capacity.toString());
            formData.append('table_is_active', CastBooleanToNumber(newRestaurantTable.table_is_active).toString());


            const response = await api.post('/tables', formData);

            if(response.status === 201){
                let table = RestaurantTable.fromJson(response.data.data);

                return {
                    success: true,
                    message: 'Table created successfully',
                    data: table
                };
            }else {
                return {
                    success: false,
                    message: 'Table not created',
                    data: null
                };
            }

        }catch(error: any){
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

    static async update(table_id: string, updatedRestaurantTable: RestaurantTable): Promise<IRestaurantTableResponse> {

        try{
            let formData = new FormData();

            formData.append('table_name', updatedRestaurantTable.table_name);
            formData.append('table_description', updatedRestaurantTable.table_description);
            formData.append('table_max_capacity', updatedRestaurantTable.table_max_capacity.toString());
            formData.append('table_is_active', CastBooleanToNumber(updatedRestaurantTable.table_is_active).toString());

            const response = await api.post('/tables/' + table_id, formData);

            if(response.status === 200){
                let table = RestaurantTable.fromJson(response.data.data);

                return {
                    success: true,
                    message: 'Table updated successfully',
                    data: table
                };
            }else {
                return {
                    success: false,
                    message: 'Table not updated',
                    data: null
                };
            }

        }catch(error: any){
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

    static async delete(table_id: string): Promise<IRestaurantTableResponse> {
            
            try{
    
                const response = await api.delete('/tables/' + table_id);
    
                if(response.status === 200){
                    return {
                        success: true,
                        message: 'Table deleted successfully',
                        data: null
                    };
                }else {
                    return {
                        success: false,
                        message: 'Table not deleted',
                        data: null
                    };
                }
    
            }catch(error: any){
                return {
                    success: false,
                    message: error.message || 'An error occurred',
                    data: null
                };
            }
    
        }



}