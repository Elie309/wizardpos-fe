import { AxiosError } from "axios";
import api from "../utils/Axios";

type IImageUploadResponse = {
    message: string;
    url?: string;
};

export default class UploadService {

    static async uploadImage(file: File): Promise<IImageUploadResponse> {
        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await api.post('/uploads/image', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            if (response.status === 201) {
                return {
                    message: 'Image uploaded successfully',
                    url: response.data.url,
                };
            }else{
                return {
                    message: response.data.message,
                };
            }
            
        } catch (error: any) {
            if(error instanceof AxiosError){
                return {
                    message: error.response?.data.message || 'An error occurred',
                };
            }

            return {
                message: error.message || 'An error occurred',
            };
        }
    }
}

