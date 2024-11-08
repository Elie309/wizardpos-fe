import React, { useEffect, useState } from 'react';
import Product from '../../types/Product';
import Loading from '../../components/Loading/Loading';
import ProductService from '../../services/ProductService';

export default function ProductList() {
    const [products, setProducts] = useState<Product[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>('');
    
    const [loading, setLoading] = useState(true);


    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleRowClick = (productId: number) => {
        window.history.pushState({}, '', `/products/${productId}`);
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



    if(loading){
        return <Loading />
    }

    return (
        <div className='container'>
            <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={handleSearch}
            />
            <a href="/addProduct">Add New Product</a>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Price</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredProducts.map(product => (
                        <tr key={product.id} onClick={() => handleRowClick(product.id)}>
                            <td>{product.id}</td>
                            <td>{product.name}</td>
                            <td>{product.price}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}