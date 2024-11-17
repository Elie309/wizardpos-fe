import { useEffect, useState } from 'react';
import Product from '../../types/Product';
import Loading from '../../components/Loading/Loading';
import ProductService from '../../services/ProductService';

export default function ProductListPage() {
    const [products, setProducts] = useState<Product[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>('');

    const [loading, setLoading] = useState(true);

    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleRowClick = (productSku: string) => {
        window.location.href = `/products/${productSku}`;
    };

    const loadProducts = async () => {
        setLoading(true);
        try {
            const products = await ProductService.getMenuProducts();
            setProducts(products);
            setLoading(false);
        } catch (error) {
            setLoading(false);
        }
    };



    useEffect(() => {
        loadProducts();
    }, []);



    if (loading) {
        return <Loading />
    }

    return (
        <div className='w-full h-full p-8 mx-auto mt-8 shadow-lg max-w-5xl bg-white rounded overflow-auto'>

            <h2 className='primary-title'>Product List</h2>
            <div className='w-full grid grid-cols-10 gap-2 items-center mb-8'>
                <input
                    className="main-input py-2 h-fit col-span-8"
                    type="text"
                    placeholder="Search products..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <a href='products/add' className='submit-button text-center col-span-2'>Add Product</a>

            </div>

            <table className='table-custom'>
                <thead>
                    <tr>
                        <th>SKU</th>
                        <th>Name</th>
                        <th>Category</th>
                        <th>Price</th>
                    </tr>
                </thead>
                <tbody >
                    {filteredProducts.map((product) => (
                        <tr key={product.sku} onClick={() => handleRowClick(product.sku)}>
                            <td>{product.sku}</td>
                            <td >{product.name}</td>
                            <td >{product.categoryName}</td>
                            <td >{product.price}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
