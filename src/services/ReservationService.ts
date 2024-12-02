import Reservation from "../types/Reservation";
import api from "../utils/Axios";
import ServicesErrorHandler from "./ServicesErrorHandler";

type IReservationService = {
    success: boolean;
    message: string;
    data: Reservation | Reservation[] | null;
}


export default class ReservationService{


    static async getReservations(date: Date): Promise<IReservationService> {

        try{

            let response = await api.get('/reservations?date=' + date.toISOString());
            
            if(response.status === 200){
                let reservations = response.data.data.map((reservation: any) => Reservation.fromJson(reservation));
                return {
                    success: true,
                    message: 'Reservations fetched successfully',
                    data: reservations
                };
            }

            return {
                success: false,
                message: 'Failed to fetch reservations',
                data: null
            }

        }catch(error: any){

            return ServicesErrorHandler(error);

        }


    }

    static async getReservation(reservation_id: string): Promise<IReservationService> {

        try{

            let response = await api.get('/reservations/' + reservation_id);
            
            if(response.status === 200){
                let reservation = Reservation.fromJson(response.data.data);
                return {
                    success: true,
                    message: 'Reservation fetched successfully',
                    data: reservation
                };
            }

            return {
                success: false,
                message: 'Failed to fetch reservation',
                data: null
            }

        }catch(error: any){

            return ServicesErrorHandler(error);

        }

    }

    static async createReservation(reservation: Reservation): Promise<IReservationService> {

        try{

            let response = await api.post('/reservations', reservation.toFormData());

            if(response.status === 201){
                let reservation = Reservation.fromJson(response.data.data);
                return {
                    success: true,
                    message: 'Reservation created successfully',
                    data: reservation
                };
            }

            return {
                success: false,
                message: 'Failed to create reservation',
                data: null
            }

        }catch(error: any){

            return ServicesErrorHandler(error);

        }

    }

    static async updateReservation(reservation_id: string, reservation: Reservation): Promise<IReservationService> {

        try{

            let response = await api.post('/reservations/' + reservation_id, reservation.toFormData());

            console.log(response);
            if(response.status === 200){
                let reservation = Reservation.fromJson(response.data.data);
                return {
                    success: true,
                    message: 'Reservation updated successfully',
                    data: reservation
                };
            }

            return {
                success: false,
                message: 'Failed to update reservation',
                data: null
            }

        }catch(error: any){

            return ServicesErrorHandler(error);

        }

    }

    static async deleteReservation(reservation_id: number): Promise<IReservationService> {

        try{

            let response = await api.delete('/reservations/' + reservation_id);

            if(response.status === 200){
                return {
                    success: true,
                    message: 'Reservation deleted successfully',
                    data: null
                };
            }

            return {
                success: false,
                message: 'Failed to delete reservation',
                data: null
            }

        }catch(error: any){

            return ServicesErrorHandler(error);

        }

    }



}