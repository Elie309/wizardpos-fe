import Product from "../../types/Product";

interface ProductItemProps {
    product: Product;
    onClick: (product: Product) => void;
}


export default function ProductItem({product, onClick}: ProductItemProps) {

    const handleOnClick = () => {
        onClick(product);
    }

    return (

        <div 
            onClick={handleOnClick}
            className="select-none bg-white shadow-lg w-36 h-36 rounded-lg hover:scale-105 transition-transform cursor-pointer ease-linear">
            <img src={product.image} alt={product.name} className="object-cover rounded-t-lg" />

            <div className="px-2 select-none">
                <p className="my-2 text-sm select-none">{product.name}</p>
            </div>
        </div>
    );
}