
import Product, {IProduct} from '../types/Product';
import api from '../utils/Axios';


type IProductResponse = {
    success: boolean;
    message: string;
    data: Product | null;
}

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

    static async saveProduct(edit: boolean, product: Product): Promise<IProductResponse> {
        try{

            console.log('Product');
            console.log(product);

            let formData = new FormData();
            formData.append('product_sku', product.sku);
            formData.append('product_slug', product.slug);
            formData.append('product_name', product.name);
            formData.append('product_description', product.description);
            formData.append('product_price', product.price.toString());
            formData.append('product_category_id', product.categoryId.toString());
            formData.append('product_show_in_menu', product.showInMenu.toString());
            formData.append('product_production_date', product.productionDate);
            formData.append('product_expiry_date', product.expiryDate);
            formData.append('product_image', product.image);
            formData.append('product_is_active', product.isActive.toString());


            let response = null;
            if(edit){
                console.log('Edit');
                response = await api.post('products/' + product.sku, formData);
            }else{
                console.log('Save');
                response = await api.post('products/save', formData);
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

            let errors = error.response.data.errors;
            // Convert json object to string
            let message = JSON.stringify(errors);
            //get values and join
            message = Object.values(errors).join(', ').toLowerCase();


            return {
                success: false,
                message: error.response.data.message.toString().concat(", ", message),
                data: null
            };
        }
    }


}