import React from 'react';
import { useLocation, NavLink, useNavigate } from 'react-router-dom';
import { Icon } from '@iconify/react';

export default function TableComponent({ products, loading, onClickEdit, onClickDelete }) {
    if (loading) {
        return <p>Loading...</p>;  // You can replace this with your skeleton loader if needed
    }

    return (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">S. No.</th>
                        <th scope="col" className="px-6 py-3">Product Name</th>
                        <th scope="col" className="px-6 py-3">Brand</th>
                        <th scope="col" className="px-6 py-3">Category</th>
                        <th scope="col" className="px-6 py-3">Sub Category</th>
                        <th scope="col" className="px-6 py-3">MRP</th>
                        <th scope="col" className="px-6 py-3">Selling Rate</th>
                        <th scope="col" className="px-6 py-3">Stock</th>
                        <th scope="col" className="px-6 py-3">Weight</th>
                        <th scope="col" className="px-6 py-3">Packaging Date</th>
                        <th scope="col" className="px-6 py-3">Expiry Date</th>
                        <th scope="col" className="px-6 py-3">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {products && products.length > 0 ? (
                        products.map((product, index) => (
                            <tr key={product.item.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                <th className="px-6 py-4">
                                    <NavLink to={`/Inventory/product/${product.item.id}`}>
                                        {index + 1}
                                    </NavLink>
                                </th>
                                <th className="px-6 py-4">
                                    <NavLink to={`/Inventory/product/${product.item.id}`}>
                                        {product.item.item_name}
                                    </NavLink>
                                </th>
                                <th className="px-6 py-4">
                                    <NavLink to={`/Inventory/product/${product.item.id}`}>
                                        {product.item.brand.brand_name}
                                    </NavLink>
                                </th>
                                <th className="px-6 py-4">
                                    <NavLink to={`/Inventory/product/${product.item.id}`}>
                                        {product.item.sub_category.category.category_name}
                                    </NavLink>
                                </th>
                                <th className="px-6 py-4">
                                    <NavLink to={`/Inventory/product/${product.item.id}`}>
                                        {product.item.sub_category.sub_category_name}
                                    </NavLink>
                                </th>
                                <th className="px-6 py-4">₹{product.mrp}</th>
                                <th className="px-6 py-4">₹{product.purchase_rate}</th>
                                <th className="px-6 py-4">{product.unit.quantity}</th>
                                <th className="px-6 py-4">{product.unit.weight}</th>
                                <th className="px-6 py-4">{product.pkt_date || 'N/A'}</th>
                                <th className="px-6 py-4">{product.expired_date || 'N/A'}</th>
                                <th className="px-6 py-4 flex justify-center items-center">
                                    <Icon onClick={(e) => { e.stopPropagation(); onClickEdit(product.item.id); }}
                                        className='cursor-pointer' width={20} icon="tabler:edit"></Icon>
                                    <Icon onClick={(e) => { e.stopPropagation(); onClickDelete(product.id); }} className='cursor-pointer' width={20} icon="ic:outline-delete"></Icon>
                                </th>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <th colSpan="12" className="px-6 py-4 text-center">No products found</th>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}
