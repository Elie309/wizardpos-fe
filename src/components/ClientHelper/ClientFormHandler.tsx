import { useState } from "react";
import Client from "../../types/Client";
import ClientServices from "../../services/ClientServices";
import ErrorDisplay from "../Error/ErrorComponent";
import SuccessDisplay from "../Success/SuccessComponent";

type IFormData = {
    first_name: string;
    last_name: string;
    email: string;
    address: string;
    phone_number: string;
}

type IProps = {
    onCancelButtonClick: () => void;
    onSuccess: (client: Client) => void;
}


export default function ClientForm (props: IProps){

    const [formData, setFormData] = useState<IFormData>({
        first_name: "",
        last_name: "",
        email: "",
        address: "",
        phone_number: "",
    });
    const [error, setError] = useState<boolean>();
    const [errorMessage, setErrorMessage] = useState<string>();
    const [success, setSuccess] = useState<boolean>();
    const [loadingSubmit, setLoadingSubmit] = useState<boolean>();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const handleSubmit = async (e: React.FormEvent<HTMLButtonElement>) => {

        e.preventDefault();
        setLoadingSubmit(true);
        setErrorMessage("");
        setError(false);
        setSuccess(false);

        if (formData.first_name === "" || formData.last_name === "" && formData.phone_number === "") {
            setErrorMessage("Please fill in all required fields")
            setError(true)
            setLoadingSubmit(false)
            return;
        }


        try {

            let client = Client.create(
                formData.first_name,
                formData.last_name,
                formData.phone_number,
                formData.email,
                formData.address,
                true
            );

            let response;


            response = await ClientServices.save(client);

            if (response.success) {
                setSuccess(true);
                setErrorMessage("");
                setError(false);

                setFormData({
                    first_name: "",
                    last_name: "",
                    email: "",
                    address: "",
                    phone_number: "",
                });

                props.onSuccess(client);
            } else {
                setErrorMessage(response.message);
                setError(true);
            }

            setLoadingSubmit(false);

        } catch (error: any) {
            setErrorMessage("An error occurred, please try again");
            setError(true);
            setLoadingSubmit(false);
        }
    }



    return (

        <div className="w-full">
            {error && <ErrorDisplay message={errorMessage || "An error occurred"} />}
            {success && <SuccessDisplay message="Client saved successfully" />}

            <div className='w-full grid grid-cols-10 gap-2 items-center mb-8'>



            </div>

            <div>
                <div className="label-input-container">
                    <label htmlFor="name" className="required-field">First name</label>
                    <input type="text" id="first_name" name="first_name" value={formData?.first_name} onChange={handleChange} />
                </div>

                <div className="label-input-container">
                    <label htmlFor="name" className="required-field">Last name</label>
                    <input type="text" id="last_name" name="last_name" value={formData?.last_name} onChange={handleChange} />
                </div>

                <div className="label-input-container">
                    <label htmlFor="name">Email</label>
                    <input type="email" id="email" name="email" value={formData?.email} onChange={handleChange} />
                </div>

                <div className="label-input-container">
                    <label htmlFor="name" className="required-field">Phone number</label>
                    <input type="text" id="phone_number" name="phone_number" value={formData?.phone_number} onChange={handleChange} />
                </div>

                <div className="label-input-container">
                    <label htmlFor="name">Address</label>
                    <textarea id="address" name="address" className="min-h-20" value={formData?.address} onChange={handleChange} />
                </div>

                <div className="flex flex-row w-full justify-evenly label-input-container my-4">

                    <a onClick={props.onCancelButtonClick}
                        className='neutral-button p-1 py-2 sm:p-2 text-sm text-center w-1/2 mr-2 md:w-2/6
                            cursor-pointer
                        '>
                        Cancel
                    </a>

                    <button className={`submit-button w-1/2 mr-2 md:w-2/6 ${loadingSubmit ? "cursor-wait" : ""} `}
                        disabled={loadingSubmit}
                        type="submit"
                        onClick={handleSubmit}>
                        {loadingSubmit ? "Loading..." : "Save"}
                    </button>
                </div >

            </div>
        </div>

    )


}