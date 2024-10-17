export interface Table {
  id: number;
  name: string;
  image: string;
  reserved: boolean;
  reservationId?: string;
  clientName?: string;
  phoneNumber?: string;
  timeOfStay?: string;
  additionalNotes?: string;
}