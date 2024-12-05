import { useEffect, useState } from "react";
import Loading from "../../components/Utils/Loading";
import ErrorDisplay from "../../components/Utils/ErrorComponent";
import SuccessDisplay from "../../components/Utils/SuccessComponent";
import SwitchInput from "../../components/Utils/SwitchInput";
import { CastBoolean } from "../../utils/Helpers/CastBoolean";
import RestaurantTableService from "../../services/RestaurantTableService";
import RestaurantTable from "../../types/RestaurantTable";
import { useNavigate } from "react-router-dom";

type IProps = {
    isEdit: boolean;
}

type IFormData = {
    table_name: string,
    table_description: string,
    table_max_capacity: string,
    table_is_active: boolean
}


export default function SaveRestaurantTable({ isEdit }: IProps) {

    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState<IFormData>({
        table_name: "",
        table_description: "",
        table_max_capacity: "",
        table_is_active: true
    });
    const [error, setError] = useState<boolean>();
    const [errorMessage, setErrorMessage] = useState<string>();
    const [success, setSuccess] = useState<boolean>();
    const [loadingSubmit, setLoadingSubmit] = useState<boolean>();

    const [initialTableId, setInitialTableId] = useState<string>("");
    const [initialTableName, setInitialTableName] = useState<string>("");

    const navigate = useNavigate();


    const loadTable = async () => {
        setLoading(true);
        setErrorMessage("");
        setError(false);
        try {
            let table_id = window.location.pathname.split("/")[2]
            const response = await RestaurantTableService.get(table_id);

            if (response.success) {
                if (response.data === null) {
                    setErrorMessage("Table not found")
                    setError(true)
                } else {

                    let table = response.data as RestaurantTable;
                    setFormData({
                        table_name: table.table_name,
                        table_description: table.table_description,
                        table_max_capacity: table.table_max_capacity.toString(),
                        table_is_active: CastBoolean(table.table_is_active)
                    })

                    setInitialTableId(table.table_id!);
                    setInitialTableName(table.table_name);
                }

            } else {
                setErrorMessage(response.message)
                setError(true)
            }

            setLoading(false)

        } catch (error: any) {

            setErrorMessage("An error occurred, table not found")
            setError(true)
            setLoading(false)

        }
    }

    useEffect(() => {
        if (isEdit) {
            loadTable();
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

        if (formData.table_max_capacity === "" || formData.table_name === "") {
            setErrorMessage("Please fill in all required fields")
            setError(true)
            setLoadingSubmit(false)
            return;
        }


        try {

            let table = RestaurantTable.create(
                formData.table_name,
                formData.table_description,
                parseInt(formData.table_max_capacity),
                formData.table_is_active
            );
            table.table_name = formData.table_name;
            table.table_description = formData.table_description;
            table.table_max_capacity = parseInt(formData.table_max_capacity);
            table.table_is_active = formData.table_is_active

            let response;

            if (isEdit) {

                response = await RestaurantTableService.update(initialTableId, table);
            } else {
                response = await RestaurantTableService.save(table);
            }

            if (response.success) {
                setSuccess(true);
                setErrorMessage("");
                setError(false);

                if (!isEdit) {
                    setFormData({
                        table_name: "",
                        table_description: "",
                        table_max_capacity: "",
                        table_is_active: true
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
                <p className='link-internal'><button onClick={() => navigate('/')} className=''>Home</button> / <button onClick={() => navigate('/tables')}>Tables</button> / {isEdit ? initialTableName : "Add Table"}</p>
            </div>

            <h1 className="primary-title ">{isEdit ? "Edit" : "Add"} Table</h1>

            {error && <ErrorDisplay message={errorMessage || "An error occurred"} />}
            {success && <SuccessDisplay message="Table saved successfully" />}

            <form>
                <div className="label-input-container">
                    <label className="main-label required-field" htmlFor="table_name">Name</label>
                    <input className="main-input" type="text" name="table_name" value={formData.table_name} onChange={handleChange} />
                </div>

                <div className="label-input-container">
                    <label className="main-label" htmlFor="table_description">Description</label>
                    <textarea className="main-input" name="table_description" value={formData.table_description} onChange={handleChange} />
                </div>

                <div className="label-input-container">
                    <label className="main-label required-field" htmlFor="table_max_capacity">Max Capacity</label>
                    <input className="main-input" type="number" name="table_max_capacity" value={formData.table_max_capacity} onChange={handleChange} />

                </div>

             
                <div className="flex flex-row w-full justify-center">
                    <div className="flex flex-row justify-around w-1/2">
                        <label className="main-label" htmlFor="isActive">Active</label>
                        <SwitchInput name="isActive" value={formData?.table_is_active} onChange={() => {
                            setFormData({ ...formData, table_is_active: !formData.table_is_active })
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