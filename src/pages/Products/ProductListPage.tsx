import { useEffect, useState } from 'react';
import Product from '../../types/Product';
import Loading from '../../components/Loading/Loading';
import ProductService from '../../services/ProductService';
import Pager from '../../components/Utils/Pager';

export default function ProductListPage() {
    const [products, setProducts] = useState<Product[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>('');

    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [perPage, setPerPage] = useState(10);


    const [loading, setLoading] = useState(true);


    const handleRowClick = (productSku: string) => {
        window.location.href = `/products/${productSku}`;
    };

    const loadProducts = async () => {
        setLoading(true);
        try {
            const response = await ProductService.getAll(perPage, currentPage, searchTerm);

            if (!response.success) {
                setLoading(false);
                setProducts([]);
                return;
            }
            setProducts(response.products as Product[]);
            setLoading(false);

            if (response.details) {
                setTotalPages(response.details.pageCount);
                setCurrentPage(response.details.currentPage);
                setPerPage(response.details.perPage);
            }


        } catch (error) {
            setLoading(false);
        }
    };


    useEffect(() => {
        loadProducts();
    }, [currentPage, perPage, searchTerm]);


    return (
        <div className='w-full h-full p-8 mx-auto mt-8 shadow-lg max-w-5xl bg-white rounded overflow-auto'>

            <div className='flex flex-row justify-between items-center'>
                <p className='link-internal'><a href='/' className=''>Home</a> / Products</p>

                <div className='grid grid-cols-2 gap-2 my-2'>
                    <a href='categories' className='reverse-button flex items-center justify-center text-center '>Categories</a>

                    {/* row Per Page */}
                    <select
                        className='main-input py-3 h-fit'
                        value={perPage}
                        onChange={(e) => {
                            setPerPage(parseInt(e.target.value));
                        }}
                    >
                        <option value='10'>10 per page</option>
                        <option value='20'>20 per page</option>
                        <option value='50'>50 per page</option>
                        <option value='100'>100 per page</option>
                    </select>
                </div>
            </div>
            <h2 className='primary-title'>Products</h2>

            <div className='w-full grid grid-cols-10 gap-2 items-center mb-8'>
                <input
                    className="main-input py-2 h-fit col-span-8"
                    type="text"
                    placeholder="Search products..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <a href='products/add' className='submit-button p-1 py-2 sm:p-2 text-sm text-center col-span-2'>Add Product</a>

            </div>

            {loading && <Loading />}
            {!loading && products.length === 0 && (
                <div className='text-center'>No products found</div>
            )}

            {!loading && products.length > 0 &&
                <div className='overflow-y-hidden overflow-x-auto'>


                    <table className='table-custom'>
                        <thead>
                            <tr>
                                <th>SKU</th>
                                <th>Name</th>
                                <th>Category</th>
                                <th>Price</th>
                                <th>Active</th>
                                <th>In Menu</th>
                            </tr>
                        </thead>
                        <tbody >
                            {products.map((product) => (
                                <tr key={product.sku} onClick={() => handleRowClick(product.sku)}>
                                    <td>{product.sku}</td>
                                    <td >{product.name}</td>
                                    <td >{product.categoryName}</td>
                                    <td >{product.price}</td>
                                    <td >{product.isActive ? 'Yes' : 'No'}</td>
                                    <td >{product.showInMenu ? 'Yes' : 'No'}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            }

            <Pager currentPage={currentPage} perPage={perPage} totalPages={totalPages} key={123} onPageChange={(index: number) => {
                setCurrentPage(index);
            }} />
        </div>
    );
}
