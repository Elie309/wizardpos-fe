import { CastBoolean } from "../utils/Helpers/CastBoolean";

export type IClient = {
    client_id?: string;
    client_first_name: string;
    client_last_name: string;
    client_phone_number: string;
    client_email: string | null;
    client_address: string | null;
    client_is_active?: boolean;
    client_created_at?: string| null;
    client_updated_at?: string| null;
    client_deleted_at?: string | null;
}

export default class Client {

    client_id?: string;
    client_first_name: string;
    client_last_name: string;
    client_phone_number: string;
    client_email: string | null;
    client_address: string | null;
    client_is_active?: boolean;
    client_created_at?: string| null;
    client_updated_at?: string| null;
    client_deleted_at?: string | null;

    constructor(id: string, firstName: string, lastName: string, phoneNumber: string, email: string, address: string, isActive: boolean, createdAt: string | null, updatedAt: string | null, deletedAt: string | null) {
        this.client_id = id;
        this.client_first_name = firstName;
        this.client_last_name = lastName;
        this.client_phone_number = phoneNumber;
        this.client_email = email;
        this.client_address = address;
        this.client_is_active = CastBoolean(isActive);
        this.client_created_at = createdAt;
        this.client_updated_at = updatedAt;
        this.client_deleted_at = deletedAt;
    }

    getFullName() {
        return this.client_first_name + ' ' + this.client_last_name;
    }

    static fromJson(json: IClient): Client {
        return new Client(
            json.client_id || '',
            json.client_first_name,
            json.client_last_name,
            json.client_phone_number,
            json.client_email || '',
            json.client_address|| '',
            CastBoolean(json.client_is_active),
            json.client_created_at || null,
            json.client_updated_at || null,
            json.client_deleted_at || null
        );
    }

    static toJson(client: Client): IClient {
        return {
            client_id: client.client_id,
            client_first_name: client.client_first_name,
            client_last_name: client.client_last_name,
            client_phone_number: client.client_phone_number,
            client_email: client.client_email,
            client_address: client.client_address,
            client_is_active: client.client_is_active,
            client_created_at: client.client_created_at,
            client_updated_at: client.client_updated_at,
            client_deleted_at: client.client_deleted_at
        }
        
    }

    static fromJsonList(json: IClient[]): Client[] {
        return json.map(Client.fromJson);
    }

    static toJsonList(clients: Client[]): IClient[] {
        return clients.map(Client.toJson);
    }

    static create(firstName: string, lastName: string, phoneNumber: string, email: string, address: string, isActive: boolean): Client {
        return new Client('', firstName, lastName, phoneNumber, email, address, isActive, null, null, null);
    }

}