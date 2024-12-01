import { CastBoolean, CastBooleanToNumber } from "../utils/Helpers/CastBoolean";

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

    toFormData(): FormData {
        let formData = new FormData();
        formData.append('client_first_name', this.client_first_name);
        formData.append('client_last_name', this.client_last_name);
        formData.append('client_phone_number', this.client_phone_number);

        if (this.client_email && this.client_email.trim().length > 0) {
            formData.append('client_email', this.client_email);
        }
        if (this.client_address && this.client_address.trim().length > 0) {
            formData.append('client_address', this.client_address);
        }
        formData.append('client_is_active', CastBooleanToNumber(this.client_is_active).toString());

        return formData;
        
    }

    static fromJsonList(json: IClient[]): Client[] {
        return json.map(Client.fromJson);
    }


    static create(firstName: string, lastName: string, phoneNumber: string, email: string, address: string, isActive: boolean): Client {
        return new Client('', firstName, lastName, phoneNumber, email, address, isActive, null, null, null);
    }

}