
export type IRestaurantTable = {
  table_id?: string;
  table_name: string;
  table_description: string;
  table_max_capacity: number;
  table_is_active: boolean;
  table_created_at?: string;
  table_updated_at?: string;
  table_deleted_at?: string | null;
}

export default class RestaurantTable {

  table_id: string;
  table_name: string;
  table_description: string;
  table_max_capacity: number;
  table_is_active: boolean;
  table_created_at: string;
  table_updated_at: string;
  table_deleted_at: string | null;

  // Constructor
  constructor(id: string, name: string, description: string, maxCapacity: number, isActive: boolean, createdAt: string, updatedAt: string, deletedAt: string | null) {
    this.table_id = id;
    this.table_name = name;
    this.table_description = description;
    this.table_max_capacity = maxCapacity;
    this.table_is_active = isActive;
    this.table_created_at = createdAt;
    this.table_updated_at = updatedAt;
    this.table_deleted_at = deletedAt;
  }

  static create(name: string, description: string, maxCapacity: number, isActive: boolean): RestaurantTable {
    return new RestaurantTable("", name, description, maxCapacity, isActive, "", "", null);
  }

  // FromJson
  static fromJson(json: any): RestaurantTable {
    return new RestaurantTable(
      json.table_id,
      json.table_name,
      json.table_description,
      json.table_max_capacity,
      json.table_is_active,
      json.table_created_at,
      json.table_updated_at,
      json.table_deleted_at
    );
  }

  toJson(): IRestaurantTable {
    return {
      table_id: this.table_id,
      table_name: this.table_name,
      table_description: this.table_description,
      table_max_capacity: this.table_max_capacity,
      table_is_active: this.table_is_active,
      table_created_at: this.table_created_at,
      table_updated_at: this.table_updated_at,
      table_deleted_at: this.table_deleted_at
    };
  }

  static toListJson(tables: RestaurantTable[]): IRestaurantTable[] {
    return tables.map(table => table.toJson());
  }

  static fromListJson(json: any): RestaurantTable[] {
    return json.map((table: any) => RestaurantTable.fromJson(table));
  }



}