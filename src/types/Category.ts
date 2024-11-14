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
    showInMenu: boolean;
    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
    id: number;
    name: string;
    description: string;
    image: string;
    isActive: boolean;

    // Constructor
    constructor(showInMenu: boolean, createdAt: string, updatedAt: string, deletedAt: string | null, id: number, name: string, description: string, image: string, isActive: boolean) {
        this.showInMenu = showInMenu;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.deletedAt = deletedAt;
        this.id = id;
        this.name = name;
        this.description = description;
        this.image = image;
        this.isActive = isActive;
    }

    // FromJson
    static fromJson(json: any): Category {
        return new Category(json.category_show_in_menu, json.category_created_at.date, json.category_updated_at.date, json.category_deleted_at, json.category_id, json.category_name, json.category_description, json.category_image, json.category_is_active);
    }

    toJson(): ICategory {
        return {
            category_show_in_menu: this.showInMenu,
            category_created_at: this.createdAt,
            category_updated_at: this.updatedAt,
            category_deleted_at: this.deletedAt,
            category_id: this.id,
            category_name: this.name,
            category_description: this.description,
            category_image: this.image,
            category_is_active: this.isActive
        }
    }
}
