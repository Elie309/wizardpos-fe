import { useEffect, useState } from "react";
import Category from "../../types/Category";
import Loading from "../../components/Utils/Loading";
import CategoryService from "../../services/CategoryService";
import { useNavigate } from "react-router-dom";

export default function CategoryListPage() {

    const [loading, setLoading] = useState(true);
    const [categories, setCategories] = useState<Category[]>([]);

    const navigate = useNavigate();

    const loadCategories = async () => {
        setLoading(true);
        try {

            const response = await CategoryService.getAll();
            setCategories(response);
            setLoading(false);

        } catch (error) {
            setLoading(false);
        }


    };


    useEffect(() => {
        loadCategories();
    }, [])

    if (loading) {
        return <Loading />;
    }


    return (
        <div className='w-full h-full p-8 mx-auto mt-8 shadow-lg max-w-5xl bg-white rounded overflow-auto'>

            <div className='flex flex-row justify-between items-center'>
                <p className='link-internal'><button onClick={() => navigate("/")} className=''>Home</button> / <button onClick={() => navigate("/products")}>Products</button> / Categories</p>
                <button onClick={() => navigate('/categories/add')} className='submit-button'>Add Category</button>
            </div>

            <h1 className="primary-title ">Categories</h1>

            <div className="overflow-x-auto overflow-y-hidden">

                <table className='table-custom'>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Description</th>
                            <th>Active</th>
                            <th>in Menu</th>
                        </tr>
                    </thead>
                    <tbody>
                        {categories.map((category: Category) => (
                            <tr key={category.id} onClick={() => navigate("/categories/" + category.name.toLowerCase())}>
                                <td>{category.name}</td>
                                <td>{category.description}</td>
                                <td>{category.isActive ? 'Yes' : 'No'}</td>
                                <td>{category.showInMenu ? 'Yes' : 'No'}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>


        </div>
    )
}