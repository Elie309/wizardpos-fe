export enum ReservationStatus {
    PENDING = 'pending',
    CONFIRMED = 'confirmed',
    CANCELLED = 'cancelled',
    COMPLETED = 'completed'
}


export default class Reservation {

    id: string;
    client_id: string;
    client_name: string;
    phone_number: string;
    table_id: string;
    employee_id: string;
    employee_name: string;
    date: string;
    starting_time: string;
    ending_time: string;
    guests: number;
    status: ReservationStatus;
    created_at: Date;
    updated_at: Date;
    deleted_at: Date | null;


    constructor() {
        this.id = "0";
        this.client_id = '';
        this.client_name = '';
        this.phone_number = '';
        this.table_id = '';
        this.employee_id = '';
        this.employee_name = '';
        this.date = new Date().toISOString().split('T')[0];
        this.starting_time = new Date().toISOString().split('T')[1].split('.')[0];
        this.ending_time =  new Date().toISOString().split('T')[1].split('.')[0];
        this.guests = 0;
        this.status = ReservationStatus.PENDING;
        this.created_at = new Date();
        this.updated_at = new Date();
        this.deleted_at = null;

    }


    static fromJson(data: any): Reservation {
        const reservation = new Reservation();
        reservation.id = data.reservation_id;
        reservation.client_id = data.reservation_client_id;
        reservation.client_name = data.client_name;
        reservation.phone_number = data.client_phone_number;
        reservation.table_id = data.reservation_table_id;
        reservation.employee_id = data.reservation_employee_id;
        reservation.employee_name = data.employee_name;
        reservation.date = new Date(data.reservation_date).toISOString();
        reservation.starting_time = new Date(`${reservation.date.split('T')[0]}T${data.reservation_starting_time}`).toISOString();
        reservation.ending_time = new Date(`${reservation.date.split('T')[0]}T${data.reservation_ending_time}`).toISOString();
        reservation.guests = data.reservation_guests;
        reservation.status = data.reservation_status;
        reservation.created_at = data.reservation_created_at;
        reservation.updated_at = data.reservation_updated_at;
        reservation.deleted_at = data.reservation_deleted_at;
        return reservation;

    }

    toFormData(): FormData {
        let formData = new FormData();
        console.log(this.starting_time);

        formData.append('reservation_client_id', this.client_id);
        formData.append('reservation_table_id', this.table_id);
        formData.append('reservation_employee_id', this.employee_id);
        formData.append('reservation_date', this.date.split('T')[0]);
        formData.append('reservation_starting_time', this.starting_time);
        formData.append('reservation_ending_time', this.ending_time);
        formData.append('reservation_guests', this.guests.toString());
        formData.append('reservation_status', this.status);

        return formData;
    }

    static fromJsonList(data: any[]): Reservation[] {
        return data.map((reservation) => Reservation.fromJson(reservation));
    }



}