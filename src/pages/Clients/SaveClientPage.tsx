import { useEffect, useState } from "react";
import Client from "../../types/Client";
import ClientServices from "../../services/ClientServices";
import Loading from "../../components/Loading/Loading";
import ErrorDisplay from "../../components/Error/ErrorComponent";
import SuccessDisplay from "../../components/Success/SuccessComponent";
import SwitchInput from "../../components/Utils/SwitchInput";
import { CastBoolean } from "../../utils/Helpers/CastBoolean";

type IProps = {
    isEdit: boolean;
}

type IFormData = {
    first_name: string;
    last_name: string;
    email: string;
    address: string;
    phone_number: string;
    isActive: boolean;
}


export default function SaveClientPage({isEdit}: IProps) {

    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState<IFormData>({
        first_name: "",
        last_name: "",
        email: "",
        address: "",
        phone_number: "",
        isActive: true
    });
    const [error, setError] = useState<boolean>();
    const [errorMessage, setErrorMessage] = useState<string>();
    const [success, setSuccess] = useState<boolean>();
    const [loadingSubmit, setLoadingSubmit] = useState<boolean>();

    const [initialClientId, setInitialClientId] = useState<string>("");


    const loadClient = async () => {
        setLoading(true);
        setErrorMessage("");
        setError(false);
        try {
            let client_id = window.location.pathname.split("/")[2]
            const response = await ClientServices.get(client_id);

            if (response.success) {
                if (response.data === null) {
                    setErrorMessage("Client not found")
                    setError(true)
                } else {

                    let client = response.data as Client;
                    setFormData({
                        first_name: client.client_first_name,
                        last_name: client.client_last_name,
                        email: client.client_email || "",
                        address: client.client_address || "",
                        phone_number: client.client_phone_number,
                        isActive: CastBoolean(client.client_is_active)
                    })

                    setInitialClientId(client.client_id!);
                }

            } else {
                setErrorMessage(response.message)
                setError(true)
            }

            setLoading(false)

        } catch (error: any) {

            setErrorMessage("An error occurred, client not found")
            setError(true)
            setLoading(false)

        }
    }

    useEffect(() => {
        if (isEdit) {
            loadClient();
        } else {
            setLoading(false)
        }
    }, [])


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
                formData.isActive
            );

            let response;

            if (isEdit) {

                response = await ClientServices.update(initialClientId, client);
            } else {
                response = await ClientServices.save(client);
            }

            if (response.success) {
                setSuccess(true);
                setErrorMessage("");
                setError(false);

                if (!isEdit) {
                    setFormData({
                        first_name: "",
                        last_name: "",
                        email: "",
                        address: "",
                        phone_number: "",
                        isActive: true
                    })
                }
                //The ID will not change, so we don't need to update the initial ID

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


    if (loading) {
        return <Loading />;
    }

    return (
        <div className='w-full h-full p-8 mx-auto mt-8 shadow-lg max-w-3xl bg-white rounded overflow-auto'>

            <div className='flex flex-row justify-between items-center'>
                <p className='link-internal'><a href='/' className=''>Home</a> / <a href="/clients">Clients</a> / {isEdit ? initialClientId : "Add Client"}</p>
            </div>

            <h1 className="primary-title ">{isEdit ? "Edit" : "Add"} Client</h1>

            {error && <ErrorDisplay message={errorMessage || "An error occurred"} />}
            {success && <SuccessDisplay message="Client saved successfully" />}

            <form>
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


                <div className="flex flex-row w-full justify-center">
                    <div className="flex flex-row justify-around w-1/2">
                        <label className="main-label" htmlFor="isActive">Active</label>
                        <SwitchInput name="isActive" value={formData?.isActive} onChange={() => {
                            setFormData({ ...formData, isActive: !formData.isActive })
                        }} />
                    </div>
                    
                </div>

                <div className="label-input-container my-4 ">
                    <button className={`submit-button mx-auto w-3/4 md:w-1/4 ${loadingSubmit ? "cursor-wait" : ""} `}
                        disabled={loadingSubmit}
                        type="submit"
                        onClick={handleSubmit}>
                        {loadingSubmit ? "Loading..." : isEdit ? "Update" : "Save"}
                    </button>
                </div >

            </form>
        </div>
    )
}