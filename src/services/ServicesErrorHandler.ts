import { AxiosError } from "axios";


type IResponse = {
    success: boolean;
    message: string;
    data: null;
}


export default function ServicesErrorHandler(error: any): IResponse {
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

        let responseMessage = error.response?.data.message.toString().concat(", ", message).trim();

        if(responseMessage.charAt(responseMessage.length - 1) === ','){
            responseMessage = responseMessage.slice(0, -1);
        }


        return {
            success: false,
            message: responseMessage,
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