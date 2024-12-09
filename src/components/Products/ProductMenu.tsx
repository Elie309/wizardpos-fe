import { useEffect, useState } from "react"
import ProductService from "../../services/ProductService";
import Product from "../../types/Product";
import ProductItem from "./ProductItem";
import Loading from "../Utils/Loading";


type ProductMenuProps = {
    onClickMenuProduct: (product: Product) => void;
}


export default function ProductMenu(props: ProductMenuProps) {

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

    const handleClickItem = (product: Product) => {
        props.onClickMenuProduct(product);
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
        <div tabIndex={-1} className="relative mx-8 flex flex-col overflow-y-scroll overflow-x-hidden w-full h-5/6
            no-print
        ">

            <div tabIndex={-1} className="h-fit">
                {category.map((cat) => {
                    return <button tabIndex={-1} key={cat}
                        className={`text-gray-700  ${selectedCategory === cat ? "bg-dark text-white" : "bg-gray-200"} 
                            px-2 py-1 m-2 rounded-lg hover:bg-dark hover:bg-opacity-60 hover:text-white sm:text-md md:text-lg`}
                        onClick={handleCategoryFilter}
                    >
                        {cat}
                    </button>
                })}

            </div>
            <div tabIndex={-1} className="w-full h-fit flex flex-row flex-wrap gap-4">
                {products.map((product: Product) => {

                    if (!category.includes(product.categoryName)) {
                        setCategory([...category, product.categoryName])
                    }

                    return <ProductItem key={product.id} product={product}
                        onClick={handleClickItem}
                    />
                })}
            </div>


        </div>
    )

}