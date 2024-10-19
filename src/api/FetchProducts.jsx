import React, { createContext, useState, useEffect, useMemo } from 'react';
import axios from 'axios';

// Create a context
export const ProductContext = createContext();

// Create a provider component
export const FetchProducts = ({ children }) => {
    const [products, setProducts] = useState([]); 
    const [sliderProducts, setSliderProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const itemsPerPage = 20;
    const token = localStorage.getItem('access_token');

    // Fetch products for the grid (paginated)
    const fetchProducts = async () => {
        setLoading(true);
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

    // Fetch products for the Swiper slider (no pagination)
    const fetchSliderProducts = async () => {
        setLoading(true);
        try {
            const response = await axios.get('http://127.0.0.1:8000/api/inventory/', {
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                params: {
                    page: 1,
                    page_size: 10
                }
            });
            setSliderProducts(response.data.results || []); // Ensure results is an array
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts(); // Fetch products when currentPage changes
    }, [currentPage]);

    useEffect(() => {
        fetchSliderProducts(); // Fetch slider products once when the component mounts
    }, []);

    const memoizedProducts = useMemo(() => products, [products]);
    const memoizedSliderProducts = useMemo(() => sliderProducts, [sliderProducts]);

    return (
        <ProductContext.Provider value={{
            products: memoizedProducts,
            sliderProducts: memoizedSliderProducts,
            loading,
            error,
            fetchProducts,
            currentPage,
            setCurrentPage,
            totalPages
        }}>
            {children}
        </ProductContext.Provider>
    );
};
