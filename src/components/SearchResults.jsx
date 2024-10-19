import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useLocation } from 'react-router-dom';
import SearchBar from '../Helper/searchBar';
import FormatWeight from '../Helper/formatWeight';

const SearchResults = () => {
    const [results, setResults] = useState([]);
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const initialQuery = queryParams.get('query') || ''; 
    const [query, setQuery] = useState(initialQuery);
    const token = localStorage.getItem('access_token');
    const role = localStorage.getItem('role');
    const fetchSearchResults = async (searchQuery) => {
        if (!searchQuery) return; 

        try {
            const response = await axios.get('http://127.0.0.1:8000/api/search/', {
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                params: { query: searchQuery }
            });
            setResults(response.data); 
        } catch (err) {
            console.error('Error fetching search results:', err);
        }
    };

    useEffect(() => {
        fetchSearchResults(query);
    }, [query, token]);

    return (
        <div className='SearchResultsSection'>
            <div className={`SearchResults ${role === "user" ? "page-width" : ""}`} style={{ paddingLeft: (role==='user'? '0px' : '17rem' )}}>

                <SearchBar 
                    onSearch={(q) => {
                        setQuery(q); 
                        fetchSearchResults(q); 
                    }} 
                    placeholder="Search..." 
                    hiddensearch={false}
                />

                <div className=' ItemCard' style={{ flexDirection: 'column', alignItems: 'center' }}>
                {results && results.length > 0 ? (
                    <div className='card-grid-container'>
                        {results.map((item, index) => (
                        <Link to={`/Inventory/product/${item.item.id}`} key={index} className='slidecard'>
                            <div>
                            {item?.item?.images?.length > 0 ? (
                                <img
                                src={item?.item?.images[0]?.image}
                                lazysizes="true"
                                loading="lazy"
                                height="150px"
                                width="100%"
                                alt={item?.item?.item_name}
                                />
                            ) : (
                                <p>No Image Available</p>
                            )}
                            </div>
                            <div className='card-contents'>
                            <h3>{item?.item?.item_name}</h3>
                            <div>
                                <FormatWeight weight={item?.unit?.weight} />
                            </div>
                            <span>₹ {item?.mrp}</span>
                            </div>
                        </Link>
                        ))}
                    </div>
                    ) : (
                    <p className='no-results'>No results found.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SearchResults;
