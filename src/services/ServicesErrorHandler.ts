import { AxiosError } from "axios";


type IResponse = {
    success: boolean;
    message: string;
    data: null;
}


export default function ServicesErrorHandler(error: any): any {
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