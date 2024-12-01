
import { AxiosError } from 'axios';
import Product, {IProduct} from '../types/Product';
import api from '../utils/Axios';
import ServicesErrorHandler from './ServicesErrorHandler';


type IProductResponse = {
    success: boolean;
    message: string;
    data: Product | Product[] | null;
    details?: any;
}

export default class ProductService {

    static async getAll(rowPerPage: number, page: number, search?: string): Promise<IProductResponse> {
        try{
            if(isNaN(rowPerPage) || isNaN(page)){
                return {
                    success: false,
                    message: 'Invalid row per page or page number',
                    data: null
                };
            }

            if(rowPerPage < 1 || page < 1){
                return {
                    success: false,
                    message: 'Invalid row per page or page number',
                    data: null
                };
            }

            if(!(search && search.trim().length > 0)){
                search = '';
            }
            //escape search
            search = encodeURIComponent(search);

            const response = await api.get('/products?perPage=' + rowPerPage + '&page=' + page+ '&search=' + search);

            let products: Product[] = [];

          
            if(response.status === 200){
                products = response.data.products.map((product: IProduct) => Product.fromJson(product));

                delete response.data.products;
                return {
                    success: true,
                    message: 'Products fetched successfully',
                    data: products,
                    details: response.data
                };
            }else {
                return {
                    success: false,
                    message: 'Failed to fetch products',
                    data: null
                };
            }


           
        }catch(error: any){

            if(error instanceof AxiosError){
                return {
                    success: false,
                    message: error.response?.data.message || 'An error occurred',
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

    //Static getWithSKU
    static async getWithSKU(sku: string): Promise<Product | null>  {
       
        try{

            const url = "/products/sku/" + sku;

            const response = await api.get(url, {
                method: 'GET',
            });

            if(response.status === 200){
                return Product.fromJson(response.data);
            }

            return null;
        }catch(error){
            return null;
        }
    }

    //static getMenuProducts
    static async getMenuProducts(): Promise<Product[]> {
        try{
            const response = await api.get('/products/menu');

            if(response.status === 200){
                return response.data.map((product: IProduct) => Product.fromJson(product));
            }

            return [];
        }catch(error){
            return [];
        }
    }

    //static search for products
    static async searchProducts(query: string): Promise<Product[]> {
        try{
            const response = await api.get('products/search' + query);

            if(response.status === 200){
                return response.data.map((product: IProduct) => Product.fromJson(product));
            }

            return [];
        }catch(error){
            return [];
        }
    }

    static async saveProduct(edit: boolean, product: Product,  id?:string): Promise<IProductResponse> {
        try{

            let response = null;
            if(edit){
                if(!id){
                    return {
                        success: false,
                        message: 'Invalid product id',
                        data: null
                    };
                }
                response = await api.post('products/' + id, product.toFormData());
            }else{
                response = await api.post('products', product.toFormData());
            }


            if(edit && response.status === 200){
                return {
                    success: true,
                    message: response.data.message,
                    data: Product.fromJson(response.data)
                };
            }

            if(!edit && response.status === 201){
                return {
                    success: true,
                    message: response.data.message,
                    data: Product.fromJson(response.data)
                };
            }

            return {
                success: false,
                message: response.data.message,
                data: null
            };

        }catch(error: any){

            return ServicesErrorHandler(error);
          
        }
    }


}