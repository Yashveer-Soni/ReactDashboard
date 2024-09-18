import { useState, useEffect } from 'react';
import axios from 'axios';

const FetchCategories = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const token=localStorage.getItem('access_token');

    const fetchCategories = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/api/categories/',{
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setCategories(response.data);
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    return { categories, loading, error, fetchCategories  };
};

export default FetchCategories;
