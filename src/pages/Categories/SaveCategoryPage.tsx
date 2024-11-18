import { useEffect, useState } from "react"
import Loading from "../../components/Loading/Loading";
import { AxiosError } from "axios";
import CategoryService from "../../services/CategoryService";
import SwitchInput from "../../components/Utils/SwitchInput";
import ErrorDisplay from "../../components/Error/ErrorComponent";
import SuccessDisplay from "../../components/Success/SuccessComponent";
import Category from "../../types/Category";

type IFormData = {
    name: string;
    description: string;
    image: string;
    isActive: boolean;
    showInMenu: boolean;
}

export default function SaveCategoryPage({ isEdit }: { isEdit: boolean }) {

    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState<IFormData>({
        name: "",
        description: "",
        image: "",
        isActive: true,
        showInMenu: true
    });
    const [error, setError] = useState<boolean>();
    const [errorMessage, setErrorMessage] = useState<string>();
    const [success, setSuccess] = useState<boolean>();
    const [loadingSubmit, setLoadingSubmit] = useState<boolean>();

    const [initialCategoryName, setInitialCategoryName] = useState<string>("");


    const loadCategory = async () => {
        setLoading(true);
        setErrorMessage("");
        setError(false);
        try {
            let categoryName = window.location.pathname.split("/")[2]

            const response = await CategoryService.getCategoryByName(categoryName);

            if (response.success) {
                if (response.data === null) {
                    setErrorMessage("Category not found")
                    setError(true)
                } else {
                    setFormData(response.data)
                    setInitialCategoryName(response.data.name)
                }

            } else {
                setErrorMessage(response.message)
                setError(true)
            }

            setLoading(false)

        } catch (error: any) {

            setErrorMessage("An error occurred, category not found")
            setError(true)
            setLoading(false)

        }
    }

    useEffect(() => {
        if (isEdit) {
            loadCategory();
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

        if(formData.name === ""){
            setErrorMessage("Name is required")
            setError(true)
            setLoadingSubmit(false)
            return;
        }


        try {

            let category = Category.simpleCategory(
                formData.name,
                formData.description,
                formData.image,
                formData.isActive,
                formData.showInMenu
            );
            let response;

            if (isEdit) {

                response = await CategoryService.updateCategory(initialCategoryName, category);
            } else {
                response = await CategoryService.createCategory(category);
            }

            if (response.success) {
                setSuccess(true);
                setErrorMessage("");
                setError(false);

                if(!isEdit){
                    setFormData({
                        name: "",
                        description: "",
                        image: "",
                        isActive: true,
                        showInMenu: true
                    })
                }else {
                    //if the name changed to redirect to the new name
                    if(initialCategoryName !== formData.name){
                        window.history.replaceState({}, "", `/categories/${formData.name}`)
                    }
                }

            } else {
                setErrorMessage(response.message);
                setError(true);
            }

            setLoadingSubmit(false);

        } catch (error: any) {
            if (error instanceof AxiosError) {
                if (error.response?.status === 404) {
                    setErrorMessage("Category not found")
                } else {
                    setErrorMessage("An error occurred")
                }
            } else {
                setErrorMessage("An error occurred")

            }
            setError(true)
            setLoadingSubmit(false)
        }
    }


    if (loading) {
        return <Loading />;
    }

    return (
        <div className='w-full h-full p-8 mx-auto mt-8 shadow-lg max-w-3xl bg-white rounded overflow-auto'>

            <div className='flex flex-row justify-between items-center'>
                <p className='link-internal'><a href='/' className=''>Home</a> / <a href="/products">Products</a> / <a href="/categories">Categories</a> / {isEdit ? initialCategoryName : "Add Product"}</p>
            </div>

            <h1 className="primary-title ">{isEdit ? "Edit" : "Add"} Category</h1>

            {error && <ErrorDisplay message={errorMessage || "An error occurred"} />}
            {success && <SuccessDisplay message="Product saved successfully" />}

            <form>
                <div className="label-input-container">
                    <label htmlFor="name">Name</label>
                    <input type="text" id="name" name="name" value={formData?.name} onChange={handleChange} />
                </div>


                <div className="label-input-container">
                    <label htmlFor="image">Image</label>
                    <input type="text" id="image" name="image" value={formData?.image} onChange={handleChange} />
                </div>

                <div className="label-input-container">
                    <label htmlFor="description">Description</label>
                    <textarea id="description" name="description" className="min-h-20" value={formData?.description} onChange={handleChange} />
                </div>

                <div className="grid grid-cols-1 gap-y-4 sm:grid-cols-2 justify-items-center my-8 px-2">
                    <div className="flex flex-row justify-around w-1/2">
                        <label className="main-label" htmlFor="isActive">Active</label>
                        <SwitchInput name="isActive" value={formData?.isActive} onChange={() => {
                            setFormData({ ...formData, isActive: !formData.isActive })
                        }} />
                    </div>

                    <div className="flex flex-row justify-around w-1/2">
                        <label className="main-label" htmlFor="showInMenu">Show in Menu</label>
                        <SwitchInput name="showInMenu" value={formData?.showInMenu} onChange={() => {
                            setFormData({ ...formData, showInMenu: !formData.showInMenu })
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