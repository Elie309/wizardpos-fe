import { useEffect, useState } from "react"
import Product from "../../types/Product";
import ProductService from "../../services/ProductService";
import Loading from "../../components/Loading/Loading";
import ErrorDisplay from "../../components/Error/ErrorComponent";
import CategoryService from "../../services/CategoryService";
import Category from "../../types/Category";
import SwitchInput from "../../components/Utils/SwitchInput";


type IFormData = {
    sku: string;
    slug: string;
    name: string;
    description: string;
    price: number;
    categoryId: number;
    showInMenu: boolean;
    productionDate: string;
    expiryDate: string;
    image: string;
    isActive: boolean;
}

export default function SaveProductPage({ isEdit }: { isEdit: boolean }) {

    const [sku, setSku] = useState<string>("")
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>("");
    const [success, setSuccess] = useState<boolean>(false);
    const [categories, setCategories] = useState<Category[]>([]);
    const [loadingSubmit, setLoadingSubmit] = useState<boolean>(false);
    const [formData, setFormData] = useState<IFormData>({
        sku: "",
        slug: "",
        name: "",
        description: "",
        price: 0,
        categoryId: 0,
        showInMenu: false,
        productionDate: "",
        expiryDate: "",
        image: "",
        isActive: false,
    });



    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    }



    const loadProduct = async () => {
        try {

            const sku = window.location.pathname.split("/")[2]

            const product = await ProductService.getWithSKU(sku);

            if (product === null) {
                window.location.href = "/products"
                throw new Error("Product or Category not found")
            }

            setSku(product.sku);

            setFormData(
                {
                    sku: product.sku,
                    slug: product.slug,
                    name: product.name,
                    description: product.description,
                    price: product.price,
                    categoryId: product.categoryId,
                    showInMenu: product.showInMenu,
                    productionDate: product.productionDate,
                    expiryDate: product.expiryDate,
                    image: product.image,
                    isActive: product.isActive,
                }
            )


        } catch (error: any) {
            setError(true);
            setErrorMessage(error.message);
        }finally{
            setLoading(false);
        }
    }

    const loadCategories = async () => {
        try {
            const categories = await CategoryService.getCategories();
            setCategories(categories);
        } catch (error: any) {
            setError(true);
            setErrorMessage(error.message);
        } finally {
            if (!isEdit) {
                setLoading(false);
            }
        }
    }

    useEffect(() => {
        setLoading(true);
        if (isEdit) {
            loadCategories()
            loadProduct()
        } else {
            loadCategories()
        }

    }, [])


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoadingSubmit(true);
        setError(false);
        setSuccess(false);
        try {

            if (formData.sku === "" || formData.slug === "" || formData.name === "" ||
                formData.price === 0 ||
                formData.categoryId === 0) {
                setLoadingSubmit(false)
                setError(true);
                setErrorMessage("Please fill all required fields");
                return;
            }
            let response = null;

            let product = Product.simpleProduct(
                formData.sku.trim(),
                formData.slug.trim(),
                formData.name.trim(),
                formData.description.trim(),
                formData.price,
                formData.categoryId,
                formData.showInMenu,
                formData.productionDate,
                formData.expiryDate,
                formData.image.trim(),
                formData.isActive,
            )


            if (isEdit) {
                response = await ProductService.saveProduct(isEdit, product, sku);
            } else {
                response = await ProductService.saveProduct(isEdit, product);
            }

            if (response.success) {
                setSuccess(true);
            } else {
                setError(true);
                setErrorMessage(response.message);
            }

            setLoadingSubmit(false);
        } catch (error: any) {
            setError(true);
            setErrorMessage(error.message);
            setLoadingSubmit(false);
        }
    };

    if (loading) {
        return <Loading />;
    }


    return (
        <div className='w-full h-full p-8 mx-auto shadow-lg max-w-5xl bg-white rounded overflow-x-hidden overflow-y-auto'>
            
            <p className='link-internal'><a href='/' className=''>Home</a> / <a href="/products"> Product List</a> / {isEdit ? formData.sku : "New Product"}</p>
            <h1 className="primary-title my-4">{isEdit ? "Edit" : "Add"} Product</h1>


            {error && <ErrorDisplay message={errorMessage} />}
            {success && <div className=" border border-green-800 bg-green-100 py-4 rounded-xl text-center w-full text-green-600">Product saved successfully</div>}
            <form onSubmit={handleSubmit}>
                <div className="label-input-container my-4 flex flex-row">
                    <div className="w-full">
                        <label htmlFor="sku" className="mr-4 w-1/4">SKU<span className="required-field"></span></label>
                        <input type="text" name="sku" className=" w-3/4 h-full" value={formData.sku} onChange={handleChange} placeholder="SKU" />
                    </div>

                    {/* Generate barcode */}
                    <button className="neutral-button mx-2 text-sm p-2" onClick={() => {
                        let sku = Product.generateSKU();
                        setFormData({ ...formData, sku });
                    }} type="button">Generate</button>


                </div>

                <div className="label-input-container my-4 flex flex-row">
                    <div className="w-full">

                        <label htmlFor="slug" className="mr-4 w-1/4">Slug<span className="required-field"></span></label>
                        <input type="text" name="slug" className="w-3/4 h-full" value={formData.slug} onChange={handleChange} placeholder="Slug" />
                    </div>

                    {/* Generate slug */}
                    <button className="neutral-button mx-2 text-sm p-2" onClick={() => {
                        let slug = Product.generateSlug(formData.name);
                        setFormData({ ...formData, slug });
                    }} type="button">Generate</button>

                </div>

                <div className="label-input-container my-4 ">
                    <label htmlFor="name">Name<span className="required-field"></span></label>
                    <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Name" />
                </div>




                <div className="label-input-container my-4 ">
                    <label htmlFor="price">Price<span className="required-field"></span></label>
                    <input type="number" name="price" value={formData.price} onChange={handleChange} placeholder="Price" />
                </div>

                <div className="label-input-container my-4 ">
                    <label htmlFor="categoryId">Category<span className="required-field"></span></label>
                    <select name="categoryId" value={formData.categoryId} onChange={handleChange}>
                        <option value={0}>Select Category</option>
                        {categories.map((category) => {
                            return <option key={category.id}
                                value={category.id}>{category.name}</option>
                        })}
                    </select>
                </div>


                <div className="label-input-container my-4 ">
                    <label htmlFor="productionDate">Production Date</label>
                    <input type="date" name="productionDate" value={formData.productionDate} onChange={handleChange} placeholder="Production Date" />
                </div >
                <div className="label-input-container my-4 ">
                    <label htmlFor="expiryDate">Expiry Date</label>
                    <input type="date" name="expiryDate" value={formData.expiryDate} onChange={handleChange} placeholder="Expiry Date" />
                </div >
                <div className="label-input-container my-4 ">
                    <label htmlFor="image">Image</label>
                    <input type="text" name="image" value={formData.image} onChange={handleChange} placeholder="Image URL" />
                </div >


                <div className="label-input-container my-4 ">
                    <label htmlFor="description">Description</label>
                    <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Description" />
                </div>

                <div className="grid grid-cols-2 justify-items-center my-4 px-2">

                    <div className="flex flex-row justify-around w-1/2">
                        <label className="main-label" htmlFor="showInMenu">Show in Menu</label>
                        <SwitchInput name="showInMenu" value={formData.showInMenu} onChange={() => {
                            setFormData({ ...formData, showInMenu: !formData.showInMenu })
                        }} />

                    </div>



                    <div className="flex flex-row justify-around w-1/2">
                        <label className="main-label" htmlFor="isActive">Active</label>
                        <SwitchInput name="isActive" value={formData.isActive} onChange={() => {
                            setFormData({ ...formData, isActive: !formData.isActive })
                        }} />
                    </div>
                </div >

                <div className="label-input-container my-4 ">
                    <button className={`submit-button mx-auto w-3/4 md:w-1/4 ${loadingSubmit ? "cursor-wait" : ""} `}
                        disabled={loadingSubmit}
                        type="submit"
                        onClick={handleSubmit}>
                        {loadingSubmit ? "Loading..." : isEdit ? "Update Product" : "Save Product"}
                    </button>
                </div >
            </form >
        </div >
    )

}