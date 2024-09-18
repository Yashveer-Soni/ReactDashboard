import { useState, useEffect } from 'react';
import axios from 'axios';


const useHandleDeleteProduct = (fetchProducts) => {
    const [deleteError, setDeleteError ]=useState(null);
    const token=localStorage.getItem('access_token');

    const handleDeleteProduct = async(productId)=>{
        try {
            await axios.delete(`http://127.0.0.1:8000/api/products/${productId}/`,{
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });  // Adjust the API endpoint as needed
            fetchProducts();  // Re-fetch the product list after deletion
        } catch (err) {
            setDeleteError("Failed to delete the product.");
            console.error(err);
        }
    }

    return { deleteError, handleDeleteProduct };
};

export default useHandleDeleteProduct;
