import { useEffect, useState } from "react"
import ProductService from "../../services/ProductService";
import Product from "../../types/Product";
import ProductItem from "./ProductItem";
import Loading from "../Loading/Loading";

export default function ProductMenu() {

    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [category, setCategory] = useState(['All']);
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [initialProduct, setInitialProduct] = useState<Product[]>([]);


    //get menu products
    const getMenuProducts = async () => {
        try {

            const response = await ProductService.getMenuProducts();
            setProducts(response);
            setInitialProduct(response);
            setLoading(false);

        } catch (error) {
            setLoading(false);
        }
    }

    const handleCategoryFilter = (e: any) => {
        setSelectedCategory(e.target.innerText);
        if (e.target.innerText === 'All') {
            setProducts(initialProduct);
        } else {
           
            setProducts(initialProduct.filter((product) => product.categoryName === e.target.innerText));

        }

    }


    useEffect(() => {
        setLoading(true);
        getMenuProducts();
    }, [])


    if (loading) {
        return (
           <Loading />
        );
    }

    return (
        <div className="relative mx-8 flex flex-col overflow-y-scroll overflow-x-hidden w-full h-5/6">

            <div className="h-fit">
                {category.map((cat) => {
                    return <button key={cat}
                        className={`${selectedCategory === cat ? "bg-blue-300" : "bg-gray-200"} 
                            text-gray-700 px-2 py-1 m-2 rounded-lg hover:bg-blue-300 sm:text-md md:text-lg`}
                        onClick={handleCategoryFilter}
                        >
                        {cat}
                    </button>
                })}

            </div>
            <div className="w-full h-fit flex flex-row flex-wrap gap-4">
            {products.map((product: Product) => {

                if (!category.includes(product.categoryName)) {
                    setCategory([...category, product.categoryName])
                }

                return <ProductItem key={product.id} product={product} />
            })}
            </div>


        </div>
    )

}