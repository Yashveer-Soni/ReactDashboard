import { useState, useEffect, useMemo } from 'react';
import axios from 'axios';

const FetchProducts = (page = 1) => {
    const [products, setProducts] = useState([]);  // Ensure this is initialized as an empty array
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(page);
    const [totalPages, setTotalPages] = useState(1);
    const itemsPerPage = 5;
    const token = localStorage.getItem('access_token');

    const fetchProducts = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/api/inventory/', {
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                params: {
                    page: currentPage,  // Use currentPage from state
                    page_size: itemsPerPage
                }
            });
            setProducts(response.data.results || []); // Ensure results is an array
            setTotalPages(Math.ceil(response.data.count / itemsPerPage)); // Calculate total pages
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, [currentPage]);  // Fetch products when currentPage changes

    const memoizedProducts = useMemo(() => products, [products]);

    return { products: memoizedProducts, loading, error, fetchProducts, currentPage, setCurrentPage, totalPages };
};

export default FetchProducts;
