import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom'; // To access query parameters
import SearchBar from '../Helper/searchBar';
import FormatWeight from '../Helper/formatWeight';

const SearchResults = () => {
    const [results, setResults] = useState([]);
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const initialQuery = queryParams.get('query') || ''; // Get query from URL
    const [query, setQuery] = useState(initialQuery); // Use initialQuery as initial state for query
    const token = localStorage.getItem('access_token');

    // Function to fetch search results based on the query
    const fetchSearchResults = async (searchQuery) => {
        if (!searchQuery) return; // Don't fetch if there's no query

        try {
            const response = await axios.get('http://127.0.0.1:8000/api/search/', {
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                params: { query: searchQuery }
            });
            setResults(response.data); // Assuming the API returns an array of items
        } catch (err) {
            console.error('Error fetching search results:', err);
        }
    };

    // Fetch search results based on initial query from URL when component mounts
    useEffect(() => {
        fetchSearchResults(query);
    }, [query, token]); // Fetch results whenever query changes

    return (
        <div className='SearchResults'>
            {/* <h1>Search Results for "{query}"</h1> */}

            {/* Pass the fetchSearchResults to SearchBar for real-time updates */}
            <SearchBar 
                onSearch={(q) => {
                    setQuery(q);  // Update the query state
                    fetchSearchResults(q); // Fetch results as you type
                }} 
                placeholder="Search..." 
            />

            <div className='center ItemCard' style={{ flexDirection: 'column', alignItems: 'center' }}>
                <div className='page-width card-grid-container'>
                    {results.length > 0 ? (
                        results.map((item, index) => (
                            <div key={index} className='slidecard'>
                                <div>
                                    {item.item.images.length > 0 ? (
                                        <img
                                            src={item.item.images[0].image}
                                            lazysizes="true"
                                            loading='lazy'
                                            height="150px"
                                            width="100%"
                                            alt={item.item.item_name}
                                        />
                                    ) : (
                                        <p>No Image Available</p>  // Optional fallback if there is no image
                                    )}
                                </div>
                                <div>
                                    <h3>{item.item.item_name}</h3>
                                </div>
                                <div>
                                    <FormatWeight weight={item.unit.weight} />
                                </div>
                                <div>
                                    <span>₹ {item.mrp} </span>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>No results found.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SearchResults;
