import Category, { ICategory } from "../types/Category";
import api from "../utils/Axios";

type ICategoryResponse = {
    success: boolean;
    message: string;
    data: Category | null;

};


export default class CategoryService {


    static async getCategories(): Promise<Category[]> {
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

    static async getCategoryWithId(id: number): Promise<ICategoryResponse> {
        try {
            const response = await api.get(`/categories/${id}`);

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

            const formData = new FormData();

            formData.append('category_name', category.name);
            formData.append('category_image', category.image);
            formData.append('category_is_active', category.isActive.toString());
            formData.append('category_description', category.description);
            formData.append('category_show_in_menu', category.showInMenu.toString());


            const response = await api.post('/categories',formData);

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

    static async updateCategory(category: Category): Promise<ICategoryResponse> {
        try {

            const formData = new FormData();

            formData.append('category_name', category.name);
            formData.append('category_image', category.image);
            formData.append('category_is_active', category.isActive.toString());
            formData.append('category_description', category.description);
            formData.append('category_show_in_menu', category.showInMenu.toString());


            const response = await api.put(`/categories/${category.id}`, formData);

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



}