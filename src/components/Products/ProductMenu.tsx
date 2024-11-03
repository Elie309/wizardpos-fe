import { useEffect, useState } from "react"
import ProductService from "../../services/ProductService";
import Product from "../../types/Product";
import ProductItem from "./ProductItem";

export default function ProductMenu(){

    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    //get menu products
    const getMenuProducts = async () => {
        try{

            const response = await ProductService.getMenuProducts();
            setProducts(response);
            setLoading(false);

        }catch(error){
            setLoading(false);
        }
    }

    useEffect(() => {
        setLoading(true);
        getMenuProducts();
    }, [])

    if(loading){
        return (
            <div className="w-full h-full flex justify-center items-center ">
                <div className="loader scale-150"></div>
            </div>
        );
    }

    return (
        <div>
            {products.map((product: Product) => (
                <ProductItem product={product} key={product.id} />
            ))}
        </div>
    )

}