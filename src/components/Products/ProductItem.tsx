import Product from "../../types/Product";

interface ProductItemProps {
    product: Product;
}

//export default with props above

export default function ProductItem({ product }: ProductItemProps) {

    const handleOnClick = () => {
        console.log(`Product ${product.name} clicked`);
    }

    return (

        <div 
            onClick={handleOnClick}
            className="bg-white shadow-lg w-36 h-36 rounded-lg hover:scale-105 transition-transform cursor-pointer ease-linear">
            <img src={product.image} alt={product.name} className="object-cover rounded-t-lg" />

            <div className="px-2">
                <p className="my-2 text-sm">{product.name}</p>
            </div>
        </div>
    );
}