
export enum ReservationStatus {
    PENDING = 'pending',
    CONFIRMED = 'confirmed',
    CANCELLED = 'cancelled',
    COMPLETED = 'completed'
}

type IReservation = {
    reservation_id: number;
    reservation_client_id: string;
    reservation_table_id: string;
    reservation_employee_id: string;
    reservation_date: Date;
    reservation_starting_time: Date;
    reservation_ending_time: Date;
    reservation_guests: number;
    reservation_status: ReservationStatus;
    reservation_created_at: Date;
    reservation_updated_at: Date;
    reservation_deleted_at: Date | null;
}


export default class Reservation {

    reservation_id: number;
    reservation_client_id: string;
    reservation_table_id: string;
    reservation_employee_id: string;
    reservation_date: Date;
    reservation_starting_time: Date;
    reservation_ending_time: Date;
    reservation_guests: number;
    reservation_status: ReservationStatus;
    reservation_created_at: Date;
    reservation_updated_at: Date;
    reservation_deleted_at: Date | null;

    
    constructor(reservation_id: number, reservation_client_id: string, reservation_table_id: string, reservation_employee_id: string, reservation_date: Date, reservation_starting_time: Date, reservation_ending_time: Date, reservation_guests: number, reservation_status: ReservationStatus, reservation_created_at: Date, reservation_updated_at: Date, reservation_deleted_at: Date |null) {
        this.reservation_id = reservation_id;
        this.reservation_client_id = reservation_client_id;
        this.reservation_table_id = reservation_table_id;
        this.reservation_employee_id = reservation_employee_id;
        this.reservation_date = reservation_date;
        this.reservation_starting_time = reservation_starting_time;
        this.reservation_ending_time = reservation_ending_time;
        this.reservation_guests = reservation_guests;
        this.reservation_status = reservation_status;
        this.reservation_created_at = reservation_created_at;
        this.reservation_updated_at = reservation_updated_at;
        this.reservation_deleted_at = reservation_deleted_at;
    }

    static create(reservation_client_id: string, 
        reservation_table_id: string, reservation_employee_id: string, 
        reservation_date: Date, reservation_starting_time: Date, 
        reservation_ending_time: Date, reservation_guests: number, 
        reservation_status?: ReservationStatus ): Reservation {


        return new Reservation(0, reservation_client_id, reservation_table_id, 
            reservation_employee_id, reservation_date, reservation_starting_time, 
            reservation_ending_time, reservation_guests, reservation_status || ReservationStatus.PENDING, new Date(), 
            new Date(), null
        );
    
    }

    static fromJson(data: IReservation): Reservation {
        return new Reservation(data.reservation_id, data.reservation_client_id, data.reservation_table_id, data.reservation_employee_id, data.reservation_date, data.reservation_starting_time, data.reservation_ending_time, data.reservation_guests, data.reservation_status, data.reservation_created_at, data.reservation_updated_at, data.reservation_deleted_at);
    }

    static toJson(reservation: Reservation): IReservation {
        return {
            reservation_id: reservation.reservation_id,
            reservation_client_id: reservation.reservation_client_id,
            reservation_table_id: reservation.reservation_table_id,
            reservation_employee_id: reservation.reservation_employee_id,
            reservation_date: reservation.reservation_date,
            reservation_starting_time: reservation.reservation_starting_time,
            reservation_ending_time: reservation.reservation_ending_time,
            reservation_guests: reservation.reservation_guests,
            reservation_status: reservation.reservation_status,
            reservation_created_at: reservation.reservation_created_at,
            reservation_updated_at: reservation.reservation_updated_at,
            reservation_deleted_at: reservation.reservation_deleted_at
        }
    }

    static fromJsonList(data: IReservation[]): Reservation[] {
        return data.map((reservation) => Reservation.fromJson(reservation));
    }

    static toJsonList(reservations: Reservation[]): IReservation[] {
        return reservations.map((reservation) => Reservation.toJson(reservation));
    }


}