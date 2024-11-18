import { CastBoolean } from "../utils/Helpers/CastBoolean";

export interface ICategory {
    category_show_in_menu: boolean;
    category_created_at: string;
    category_updated_at: string;
    category_deleted_at: string | null;
    category_id: number;
    category_name: string;
    category_description: string;
    category_image: string;
    category_is_active: boolean;
}

export default class Category {
    
    id: number;
    name: string;
    description: string;
    image: string;
    isActive: boolean;
    showInMenu: boolean;
    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;

    // Constructor
    constructor( id: number, name: string, description: string, image: string, isActive: boolean, showInMenu: boolean, createdAt: string, updatedAt: string, deletedAt: string | null) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.image = image;
        this.isActive = isActive;
        this.showInMenu = showInMenu;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.deletedAt = deletedAt;
    }

    //Simple category
    static simpleCategory(name: string, description: string, image: string, isActive: boolean, showInMenu: boolean): Category {
        return new Category(0, name, description, image, isActive, showInMenu, "", "", null);
    }
    // FromJson
    static fromJson(json: any): Category {
        return new Category(
            json.category_id,
            json.category_name,
            json.category_description,
            json.category_image,
            CastBoolean(json.category_is_active),
            CastBoolean(json.category_show_in_menu),
            json.category_created_at,
            json.category_updated_at,
            json.category_deleted_at
        );
    }

    toJson(): ICategory {
        return {
            category_id: this.id,
            category_name: this.name,
            category_description: this.description,
            category_image: this.image,
            category_is_active: this.isActive,
            category_show_in_menu: this.showInMenu,
            category_created_at: this.createdAt,
            category_updated_at: this.updatedAt,
            category_deleted_at: this.deletedAt
        }   
    }
}
