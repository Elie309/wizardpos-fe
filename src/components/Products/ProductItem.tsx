import Product from "../../types/Product";

interface ProductItemProps {
    product: Product;
}

//export default with props above

export default function ProductItem({ product }: ProductItemProps) {
    return (
        <div className="flex justify-between">
            <p>{product.name}</p>
            <p>${product.price.toFixed(2)}</p>
        </div>
    );
}