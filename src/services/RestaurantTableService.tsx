import RestaurantTable from "../types/RestaurantTable";
import api from "../utils/Axios";
import ServicesErrorHandler from "./ServicesErrorHandler";


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

            const response = await api.post('/tables', newRestaurantTable.toFormData());

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
            return ServicesErrorHandler(error);
        }

    }

    static async update(table_id: string, updatedRestaurantTable: RestaurantTable): Promise<IRestaurantTableResponse> {

        try{
            const response = await api.post('/tables/' + table_id, updatedRestaurantTable.toFormData());

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
            
            return ServicesErrorHandler(error);
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