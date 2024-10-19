import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate, NavLink,useLocation } from 'react-router-dom'; // Import Link and useNavigate for routing

const SearchBar = ({ onSearch, placeholder,hiddensearch }) => {
    const [query, setQuery] = useState(''); 
    const [suggestions, setSuggestions] = useState([]); 
    const [isFocused, setIsFocused] = useState(false); 
    const [loading, setLoading] = useState(false); 
    const token = localStorage.getItem('access_token');
    const navigate = useNavigate(); // To programmatically redirect

    // Debouncing functionality to prevent API call on every keystroke
    const debounce = (func, delay) => {
        let timer;
        return (...args) => {
            clearTimeout(timer);
            timer = setTimeout(() => {
                func(...args);
            }, delay);
        };
    };

    const fetchSuggestions = async (query) => {
        setLoading(true);
        try {
            const response = await axios.get('http://127.0.0.1:8000/api/search/', {
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                params: { query }
            });
            setSuggestions(response.data); // Ensure response.data is an array of objects
        } catch (err) {
            console.error('Error fetching suggestions:', err);
        } finally {
            setLoading(false);
        }
    };

    // Use debounced function to fetch suggestions
    const debouncedFetchSuggestions = useCallback(debounce(fetchSuggestions, 300), []);

    useEffect(() => {
        if (query) {
            debouncedFetchSuggestions(query);
        } else {
            setSuggestions([]);
        }
    }, [query, debouncedFetchSuggestions]);

    const handleChange = (e) => {
        setQuery(e.target.value);
        if (onSearch) {
            onSearch(e.target.value);
        }
    };

    const handleFocus = () => setIsFocused(true);

    const handleBlur = () => {
        setTimeout(() => setIsFocused(false), 200);
    };

    const handleClickSuggestion = (suggestion) => {
        setQuery(suggestion.item.item_name); 
        setIsFocused(false); 
        navigate(`Inventory/product/${suggestion.item.id}`); 
    };

    const handleSeeAllClick = () => {
        setIsFocused(false);
        navigate(`/search-results?query=${query}`); 
    };


    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleSeeAllClick(); 
        }
    };

    return (
        <div className="search-bar" >
            <div className="searchbar" style={{display: hiddensearch ? "none" : "flex"}}>
                <div className="searchsvg">
                    <FontAwesomeIcon icon={faMagnifyingGlass} />
                </div>
                <input
                    type="search"
                    className="searchinput"
                    value={query}
                    onChange={handleChange}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    onKeyDown={handleKeyDown} 
                    placeholder={placeholder || "Search..."}
                />
            </div>

            {isFocused && suggestions.length > 0 && (
                <ul className="suggestions-list">
                    {suggestions.map((suggestion) => (
                        <li key={suggestion.id} onMouseDown={() => handleClickSuggestion(suggestion)}>
                            <NavLink to={`/Inventory/product/${suggestion.item.id}`}>{suggestion.item.item_name}</NavLink>
                        </li>
                    ))}
                    <li className="see-all">
                        <NavLink onMouseDown={handleSeeAllClick}>See all results</NavLink> {/* "See all" link */}
                    </li>
                </ul>
            )} 
        </div>
    );
};

export default SearchBar;
