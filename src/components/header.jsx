import React, { useEffect, useState } from "react";
import { useLocation, NavLink, useNavigate } from 'react-router-dom';
import { logo } from '../snippets/Image_load';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faBox, faChartSimple, faUser, faBagShopping, faGear, faRightFromBracket, faMagnifyingGlass, faBell } from '@fortawesome/free-solid-svg-icons';
import LoadingSpinner from './LoadingSpinner';
import CustomSeparator from "../snippets/CustomSeparator";
import SearchBar from "../Helper/searchBar";

const Header = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false); 
    const [isAuthenticated, setIsAuthenticated] = useState(null);
    const [isStaff, setIsStaff] = useState(false);
    const [isSuperuser, setIsSuperuser] = useState(false);
    const queryParams = new URLSearchParams(location.search);
    const query = queryParams.has('query');
    const isSearchResultsPage = location.pathname === '/search-results' && query;


    useEffect(() => {
        const token = localStorage.getItem('access_token');
        const role = localStorage.getItem('role');
        
        if (token) {
          setIsAuthenticated(true);
          setIsStaff(role === 'user');
          setIsSuperuser(role === 'admin');
        } else {
          setIsAuthenticated(false);
        }
    
        // Redirect if not authenticated
        if (!token) {
          navigate('/signin/', { replace: true });
        }
    
      }, [location.pathname, navigate]);

    // Skip rendering Header if on '/signin'
    if (location.pathname === '/signin/') {
        return null;
    }

    const handleLogout = () => {
        setLoading(true);
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        localStorage.removeItem('role');
        setIsAuthenticated(false);
        setIsSuperuser(false);
        setLoading(false);
        navigate('/signin/');
    };

    return (
        <>
            {loading && <LoadingSpinner />} {/* Display the spinner if loading */}
           
            <div className="container">
                {isSuperuser&&(
                <div className="sidebar ">
                    <div className="logo">
                        <ul style={{ padding: 0 }}>
                            <NavLink to="/" className="flex4">
                                <img src={logo} style={{ width: '100px' }} alt="Logo" />
                            </NavLink>
                        </ul>
                    </div>
                    <ul className="menubar">
                        <li>
                            <NavLink to="/" className={({ isActive }) => (isActive ? "active" : "")}>
                                <FontAwesomeIcon icon={faHouse} />
                                <h4>Dashboard</h4>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/Inventory" className={({ isActive }) => (isActive ? "active" : "")}>
                                <FontAwesomeIcon icon={faBox} />
                                <h4>Inventory</h4>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/Reports/" className={({ isActive }) => (isActive ? "active" : "")}>
                                <FontAwesomeIcon icon={faChartSimple} />
                                <h4>Reports</h4>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/Suppliers/" className={({ isActive }) => (isActive ? "active" : "")}>
                                <FontAwesomeIcon icon={faUser} />
                                <h4>Suppliers</h4>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/Orders/" className={({ isActive }) => (isActive ? "active" : "")}>
                                <FontAwesomeIcon icon={faBagShopping} />
                                <h4>Orders</h4>
                            </NavLink>
                        </li>
                    </ul>
                    <ul className="slbutton" >
                        <li>
                            <NavLink to="/Setting/" className={({ isActive }) => (isActive ? "active" : "")}>
                                <FontAwesomeIcon icon={faGear} />
                                <h4>Settings</h4>
                            </NavLink>
                        </li>
                        {isAuthenticated ? (
                            <li>
                                <button onClick={handleLogout} className="logoutbtn">
                                    <FontAwesomeIcon icon={faRightFromBracket} />
                                    <h4>Logout</h4>
                                </button>
                            </li>
                        ) : (
                            <li>
                                <NavLink to="/signin" className={({ isActive }) => (isActive ? "active" : "")}>
                                    <FontAwesomeIcon icon={faRightFromBracket} />
                                    <h4>Login</h4>
                                </NavLink>
                            </li>
                        )}
                    </ul>
                </div>
                )}

                <div className="maincontent" style={{paddingLeft:!isSuperuser?'0':'17rem'}}>
                    <div className="nav">
                        
                        {!isSuperuser&&(
                        <div className="logoContainer">
                            <NavLink to="/" className="flex4">
                                <img src={logo} style={{ width: '40px' }} alt="Logo" />
                            </NavLink>
                        </div>
                        )}

                        {!isSearchResultsPage && <SearchBar />}

                        {!isSuperuser&&(
                            <>
                            {isAuthenticated ? (
                                <button onClick={handleLogout} className="logoutbtn">
                                    <h4>Logout</h4>
                                </button>
                            ) : (
                                <NavLink to="/signin" className={({ isActive }) => (isActive ? "active" : "")}>
                                    <h4>Login</h4>
                                </NavLink>
                            )}
                            </>
                        )}

                        {isSuperuser&&(
                        <div className="flex2 notification-container">
                            <div className="notification">
                                <FontAwesomeIcon icon={faBell} />
                            </div>
                            <div className="profile">
                                {/* Profile content here */}
                            </div>
                        </div>
                        )}
                    </div>
                    {isSuperuser&&(
                    <div className="customseparator">
                        <CustomSeparator/>
                    </div>
                    )}
                </div>
            </div>
        </>
    );
}

export default Header;
