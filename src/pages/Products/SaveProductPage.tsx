import { useEffect, useState } from "react"
import Product from "../../types/Product";
import ProductService from "../../services/ProductService";
import Loading from "../../components/Loading/Loading";
import ErrorDisplay from "../../components/Error/ErrorComponent";
import CategoryService from "../../services/CategoryService";
import Category from "../../types/Category";

export default function SaveProductPage({ edit }: { edit: boolean }) {

    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>("");
    const [success, setSuccess] = useState<boolean>(false);
    const [categories, setCategories] = useState<Category[]>([]);
    const [formData, setFormData] = useState({
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
        categoryName: ""
    });



    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    }


    const loadProduct = async () => {
        try {

            const sku = window.location.pathname.split("/")[2]

            const product = await ProductService.getWithSKU(sku);

            const category = await CategoryService.getCategories();

            if (product === null || category === null) {
                throw new Error("Product or Category not found")
            }
            setCategories(category);

            setProduct(product);
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
                    categoryName: product.categoryName
                }
            )


        } catch (error: any) {
            setError(true);
            setErrorMessage(error.message);
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        if (edit) {
            loadProduct()
        }
    }, [])


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {

            if (product === null) {
                setError(true);
                setErrorMessage("Product is null. Please try again");
                return;
            }

            let response = null;

            if (edit) {
                response = await ProductService.saveProduct(edit, product);
            } else {
                response = await ProductService.saveProduct(!edit, product);
            }

            if (response.success) {
                setSuccess(true);
            } else {
                setError(true);
                setErrorMessage(response.message);
            }

        } catch (error: any) {
            setError(true);
            setErrorMessage(error.message);
        }
    };

    if (loading) {
        return <Loading />;
    }


    return (
        <div className='w-full h-full p-8 mx-auto shadow-lg max-w-5xl bg-white rounded overflow-x-hidden overflow-y-auto'>
            <h1 className="primary-title">{edit ? "Edit" : "Add"} Product</h1>
            {error && <ErrorDisplay message={errorMessage} />}
            {success && <div className=" border border-green-800 bg-green-100 py-4 rounded-xl text-center w-3/4 mx-8 text-green-600">Product saved successfully</div>}
            <form onSubmit={handleSubmit}>
                <div className="label-input-container my-4 ">
                    <label htmlFor="sku">SKU</label>
                    <input type="text" name="sku" value={formData.sku} onChange={handleChange} placeholder="SKU" />
                </div>

                <div className="label-input-container my-4 ">
                    <label htmlFor="slug">Slug</label>
                    <input type="text" name="slug" value={formData.slug} onChange={handleChange} placeholder="Slug" />
                </div>

                <div className="label-input-container my-4 ">
                    <label htmlFor="name">Name</label>
                    <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Name" />
                </div>




                <div className="label-input-container my-4 ">
                    <label htmlFor="price">Price</label>
                    <input type="number" name="price" value={formData.price} onChange={handleChange} placeholder="Price" />
                </div>

                <div className="label-input-container my-4 ">
                    <label htmlFor="categoryId">Category</label>
                    <select name="category_id" value={formData.categoryId} onChange={handleChange}>
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
                        <input className="" type="checkbox" name="showInMenu" checked={formData.showInMenu} onChange={handleChange} />

                    </div>
                    <div className="flex flex-row justify-around w-1/2">
                        <label className="main-label" htmlFor="isActive">Active</label>
                        <input className="" type="checkbox" name="isActive" checked={formData.isActive} onChange={handleChange} />

                    </div>
                </div >

                <div className="label-input-container my-4 ">
                    <button className="submit-button mx-auto w-1/4" type="submit">{edit ? "Update" : "Save"} Product</button>
                </div >
            </form >
        </div >
    )
}