
import Product, {IProduct} from '../types/Product';
import api from '../utils/Axios';


export default class ProductService {

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


}