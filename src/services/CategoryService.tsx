import Category, { ICategory } from "../types/Category";
import api from "../utils/Axios";
import ServicesErrorHandler from "./ServicesErrorHandler";

type ICategoryResponse = {
    success: boolean;
    message: string;
    data: Category | null;

};


export default class CategoryService {


    static async getAll(): Promise<Category[]> {
        try {
            const response = await api.get('/categories');

            if (response.status === 200) {
                return response.data.map((category: ICategory) => Category.fromJson(category));
            }

            return [];
        } catch (error) {
            return [];
        }
    }

    static async getCategoryByName(categoryName: string): Promise<ICategoryResponse> {
        try {
            const response = await api.get(`/categories/${categoryName}`);

            if (response.status === 200) {

                let category = Category.fromJson(response.data);

                return {
                    success: true,
                    message: "Category found",
                    data: category
                };
            }

            return {
                success: false,
                message: "Category not found",
                data: null
            }
        } catch (error: any) {

            let errors = error.response.data.errors;
            errors = JSON.stringify(errors);
            errors = Object.values(errors).join(', ').toLowerCase();

            let message = error.response?.data?.message || error.message;
            message = `${message}, ${errors}`;

            return {
                success: false,
                message,
                data: null
            }
        }
    }

    static async createCategory(category: Category): Promise<ICategoryResponse> {
        try {

            const response = await api.post('/categories', category.toFormData());

            if (response.status === 201) {
                return {
                    success: true,
                    message: response.data.message,
                    data: Category.fromJson(response.data.category)
                }
            }

            return {
                success: false,
                message: response.data.message,
                data: null
            };

        } catch (error: any) {
            return ServicesErrorHandler(error);
        }
    }

    static async updateCategory(category_name: string, category: Category): Promise<ICategoryResponse> {
        try {

            const response = await api.post(`/categories/${category_name}`, category.toFormData());

            if (response.status === 200) {
                return {
                    success: true,
                    message: response.data.message,
                    data: Category.fromJson(response.data.category)
                }
            }

            return {
                success: false,
                message: response.data.message,
                data: null
            };

        } catch (error: any) {
            
            return ServicesErrorHandler(error);
        }
    }



}