import { useState, useEffect, useRef } from "react";
import Loading from "../../components/Loading/Loading";
import Reservation, { ReservationStatus } from "../../types/Reservation";
import ErrorDisplay from "../../components/Error/ErrorComponent";
import SuccessDisplay from "../../components/Success/SuccessComponent";
import ReservationService from "../../services/ReservationService";
import RestaurantTable from "../../types/RestaurantTable";
import Popover from "../Popover/Popover";
import ClientPopHandler from "../ClientHelper/ClientHandler";
import Client from "../../types/Client";

type IFormData = {
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
}

type IProps = {
    isEdit: boolean;
    data: Reservation | null;
    tables: RestaurantTable[];
    currentTable: RestaurantTable | null;
    currentDate: string;
}

export default function ReservationForm({ isEdit, data, tables, currentTable, currentDate }: IProps) {

    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState<IFormData>({
        client_id: "",
        client_name: "",
        phone_number: "",
        table_id: "",
        employee_id: "",
        employee_name: "",
        date: new Date().toISOString().split('T')[0],
        starting_time: new Date().toLocaleTimeString('en-GB', { hour12: false }),
        ending_time: new Date().toLocaleTimeString('en-GB', { hour12: false }),
        guests: 0,
        status: ReservationStatus.PENDING
    });

    const clientHandlerRef = useRef<{ open: () => void, close: () => void }>(null);


    const [initialReservationId, setInitialReservationId] = useState<string>("");

    const [error, setError] = useState<boolean>();
    const [errorMessage, setErrorMessage] = useState<string>();
    const [success, setSuccess] = useState<boolean>();
    const [loadingSubmit, setLoadingSubmit] = useState<boolean>();

    const loadReservation = async () => {
        setLoading(true);
        setErrorMessage("");
        setError(false);
        try {

            if (!data?.id) {
                setErrorMessage("Reservation not found");
                setError(true);
                setLoading(false);
                return;
            }

            const response = await ReservationService.getReservation(data?.id);

            if (response.success) {
                if (response.data === null) {
                    setErrorMessage("Reservation not found");
                    setError(true);
                } else {

                    let reservation: Reservation = response.data as Reservation;

                    setInitialReservationId(reservation.id);
                    setFormData({

                        client_id: reservation.client_id,
                        client_name: reservation.client_name,
                        phone_number: reservation.phone_number,
                        table_id: reservation.table_id,
                        employee_id: reservation.employee_id,
                        employee_name: reservation.employee_name,
                        date: reservation.date.split('T')[0],
                        starting_time: new Date(reservation.starting_time).toLocaleTimeString('en-GB', { hour12: false }),
                        ending_time: new Date(reservation.ending_time).toLocaleTimeString('en-GB', { hour12: false }),
                        guests: reservation.guests || 0,
                        status: reservation.status
                    });
                }
            } else {
                setErrorMessage(response.message);
                setError(true);
            }
            setLoading(false);
        } catch (error: any) {

            setErrorMessage("An error occurred, reservation not found");
            setError(true);
            setLoading(false);
        }
    };

    useEffect(() => {
        clearForm();
        if (isEdit) {
            loadReservation();
        } else {
            if (currentDate)
                setFormData({ ...formData, date: currentDate });
            setLoading(false);
        }
    }, []);

    const clearForm = () => {

        setFormData({
            client_id: "",
            client_name: "",
            phone_number: "",
            table_id: "",
            employee_id: "",
            employee_name: "",
            date: new Date().toISOString().split('T')[0],
            starting_time: new Date().toLocaleTimeString('en-GB', { hour12: false }),
            ending_time: new Date().toLocaleTimeString('en-GB', { hour12: false }),
            guests: 0,
            status: ReservationStatus.PENDING
        });


    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {

          setFormData({ ...formData, [e.target.name]: e.target.value });
    };


    const handleSubmit = async (e: React.FormEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setLoadingSubmit(true);
        setErrorMessage("");
        setError(false);
        setSuccess(false);

        if (formData.client_name === "") {
            setErrorMessage("Client name is required");
            setError(true);
            setLoadingSubmit(false);
            return;
        }

        try {
            let reservation: Reservation = new Reservation();

            reservation.client_id = formData.client_id;
            reservation.client_name = formData.client_name;
            reservation.phone_number = formData.phone_number;
            reservation.table_id = currentTable?.table_id!;
            reservation.employee_id = formData.employee_id;
            reservation.employee_name = formData.employee_name;
            reservation.date = formData.date;
            reservation.starting_time = formData.starting_time;
            reservation.ending_time = formData.ending_time;
            reservation.guests = formData.guests;
            reservation.status = formData.status;


            let response;

            if (isEdit) {
                response = await ReservationService.updateReservation(initialReservationId, reservation);
            } else {
                response = await ReservationService.createReservation(reservation);
            }

            if (response.success) {
                setSuccess(true);
                setErrorMessage("");
                setError(false);

                if (!isEdit) {
                    setFormData({
                        client_id: "",
                        client_name: "",
                        phone_number: "",
                        table_id: "",
                        employee_id: "",
                        employee_name: "",
                        date: new Date().toISOString().split('T')[0],
                        starting_time: new Date().toLocaleTimeString('en-GB', { hour12: false }),
                        ending_time: new Date().toLocaleTimeString('en-GB', { hour12: false }),
                        guests: 0,
                        status: ReservationStatus.PENDING
                    });
                }
            } else {
                setErrorMessage(response.message);
                setError(true);
            }
            setLoadingSubmit(false);
        } catch (error: any) {
            setErrorMessage("An error occurred, reservation not saved");
            setError(true);
            setLoadingSubmit(false);
        }
    };

    const handleClientSelect = (client: Client) =>{

        if(client === null){
            return;
        }

        clientHandlerRef.current?.close();


        setFormData({
            ...formData,
            client_id: client.client_id!,
            client_name: `${client.client_first_name} ${client.client_last_name}`,
            phone_number: client.client_phone_number!

        });
    }




    if (loading) {
        return <Loading />;
    }

    return (
        <div className='w-full h-full '>



            <form>
                <div className="label-input-container">
                   <div className="flex flex-row justify-between">
                     <label htmlFor="client_name">Client Name</label>
                     <Popover ref={clientHandlerRef}
                         id="client-form"
                         buttonName="Find Client"
                         title="Client Search"
                         classNameButton="link-primary"
                         classNameMainDiv="max-w-3xl"
                     >
                       <ClientPopHandler 
                        onClientSelect={handleClientSelect}
                       />
                     </Popover>
                   </div>
                    <input type="text" id="client_name" readOnly name="client_name" value={formData?.client_name} onChange={handleChange} />
                </div>
                <div className="label-input-container">
                    <label htmlFor="phone_number">Phone Number</label>
                    <input type="text" id="phone_number" readOnly name="phone_number" value={formData?.phone_number} onChange={handleChange} />
                </div>
                <div className="label-input-container">
                    <label htmlFor="table_id">Table ID</label>
                    <select id="table_id" disabled={!isEdit}  name="table_id" value={isEdit ? formData!.table_id : currentTable?.table_id} onChange={handleChange}>
                        {tables.map(table => (
                            <option key={table.table_id}
                                value={table.table_id}>
                                {table.table_name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="label-input-container">
                    <label htmlFor="date">Date</label>
                    <input type="date" id="date"
                    readOnly                    
                    name="date" value={formData?.date} onChange={handleChange} />
                </div>
                <div className="label-input-container">
                    <label htmlFor="starting_time" className="required-field">Starting Time</label>
                    <input type="time"
                        id="starting_time" name="starting_time"
                        step="900"
                        pattern="([01]?[0-9]|2[0-3]):[0-5][0-9]"

                        value={formData?.starting_time} onChange={handleChange} />
                </div>
                <div className="label-input-container">
                    <label htmlFor="ending_time" className="required-field">Ending Time</label>
                    <input type="time" id="ending_time" name="ending_time"
                        step="900"
                        pattern="([01]?[0-9]|2[0-3]):[0-5][0-9]"
                        value={formData?.ending_time} onChange={handleChange} />
                </div>
                <div className="label-input-container">
                    <label htmlFor="guests">Guests</label>
                    <input type="number" id="guests" name="guests" value={formData?.guests} onChange={handleChange} />
                </div>
                <div className="label-input-container">
                    <label htmlFor="status" className="required-field">Status</label>
                    <select id="status" name="status" value={formData?.status} onChange={handleChange}>
                        {Object.values(ReservationStatus).map(status => (
                            <option key={status} value={status}>{status}</option>
                        ))}
                    </select>
                </div>
                <div className="label-input-container my-4">
                    <button className={`submit-button mx-auto w-3/4  ${loadingSubmit ? "cursor-wait" : ""}`}
                        disabled={loadingSubmit}
                        type="submit"
                        onClick={handleSubmit}>
                        {loadingSubmit ? "Loading..." : isEdit ? "Update" : "Save"}
                    </button>
                </div>
            </form>
            {error && <ErrorDisplay message={errorMessage || "An error occurred"} />}
            {success && <SuccessDisplay message="Reservation saved successfully" />}
        </div>
    );
}