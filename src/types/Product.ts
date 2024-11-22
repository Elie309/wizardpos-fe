export interface IProduct {
  product_id: number;
  product_sku: string;
  product_slug: string;
  product_name: string;
  product_description: string;
  product_price: number;
  product_category_id: number;
  product_show_in_menu: boolean;
  product_production_date: string;
  product_expiry_date: string;
  product_image: string;
  product_is_active: boolean;
  product_created_at: string;
  product_updated_at: string;
  product_deleted_at: string;
  category_name: string;
}

export default class Product {
  id: number;
  sku: string;
  slug: string;
  name: string;
  description: string;
  price: number;
  categoryId: number;
  showInMenu: boolean;
  productionDate: string;
  expiryDate: string;
  image: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
  categoryName: string;
  
  //Constructor
  constructor(id: number, sku: string, slug: string, name: string, description: string, price: number, categoryId: number, showInMenu: boolean, productionDate: string, expiryDate: string, image: string, isActive: boolean, createdAt: string, updatedAt: string, deletedAt: string, categoryName: string) {
    this.id = id;
    this.sku = sku;
    this.slug = slug;
    this.name = name;
    this.description = description;
    this.price = price;
    this.categoryId = categoryId;
    this.showInMenu = showInMenu;
    this.productionDate = productionDate;
    this.expiryDate = expiryDate;
    this.image = image;
    this.isActive = isActive;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.deletedAt = deletedAt;
    this.categoryName = categoryName;
  }

  //Simple product from changeable values
  static create(sku: string, slug: string, name: string, description: string, price: number, categoryId: number, showInMenu: boolean, productionDate: string, expiryDate: string, image: string, isActive: boolean): Product {
    return new Product(0, sku, slug, name, description, price, categoryId, showInMenu, productionDate, expiryDate, image, isActive, '', '', '', '');
  }

  //FromJson
  static fromJson(json: any): Product {
    return new Product(json.product_id, json.product_sku, json.product_slug, json.product_name, json.product_description, json.product_price, json.product_category_id, json.product_show_in_menu, json.product_production_date, json.product_expiry_date, json.product_image, json.product_is_active, json.product_created_at, json.product_updated_at, json.product_deleted_at, json.category_name);
  }

  toJson(): IProduct {
    return {
      product_id: this.id,
      product_sku: this.sku,
      product_slug: this.slug,
      product_name: this.name,
      product_description: this.description,
      product_price: this.price,
      product_category_id: this.categoryId,
      product_show_in_menu: this.showInMenu,
      product_production_date: this.productionDate,
      product_expiry_date: this.expiryDate,
      product_image: this.image,
      product_is_active: this.isActive,
      product_created_at: this.createdAt,
      product_updated_at: this.updatedAt,
      product_deleted_at: this.deletedAt,
      category_name: this.categoryName
    }
  }


  //generate barcode for product
  static generateSKU(): string {
    return Math.floor(100000000000 + Math.random() * 900000000000).toString();
  }

  //Generate slug from name
  static generateSlug(name: string): string {
    //Replace spaces with hyphens & convert to lowercase & special characters
    return name.replace(/\s+/g, '-').toLowerCase().replace(/[^\w-]+/g, '');
  }

}