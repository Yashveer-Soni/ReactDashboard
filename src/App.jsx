import React, { useState, useEffect } from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import   
 { BrowserRouter as Router, Route, Routes, Navigate  } from 'react-router-dom';
import axios from 'axios';
import './static/css/style.css';
import './static/css/responsive.css';
import Header from './components/header';
import Home from './components/Index';
import Inventory from './components/Inventory/Inventory';
import Report from './components/Reports';
import Orders from './components/Orders';
import ProductInfo from './components/Inventory/Productinfo';
import Suppliers from './components/Suppliers';
import Signin from './components/Signin';
import Error from './snippets/Error';
import Categories from './components/Inventory/CategoriesList';
import UserHome from './user/UserHome';
import SearchResults from './components/SearchResults';
import ProductPage from './user/ProductPage';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const PrivateRoute = ({ children,   
 allowedRoles, role }) => {
  const isAuthenticated = !!localStorage.getItem('access_token');

  if (!isAuthenticated) {
    window.location.href = '/signin/';
    return null;
  }

  if (allowedRoles && !allowedRoles.includes(role.trim().toLowerCase())) {
    window.location.href = '/';
    return null; // Prevent rendering of children
  }

  return children;
};

function App() {
  const [isStaff, setIsStaff] = useState(false);
  const [isSuperuser, setIsSuperuser] = useState(false);
  const [isAuthChecked, setIsAuthChecked] = useState(false);
  const [userRole, setUserRole] = useState(null);

  const updateRoles = () => {
    const role = localStorage.getItem('role');
    const accessToken = localStorage.getItem('access_token');

    setIsStaff(role === 'user');
    setIsSuperuser(role === 'admin');
    setUserRole(role);
    setIsAuthChecked(true);
  };

  useEffect(() => {
    updateRoles(); // Check roles and authentication on component mount

    const handleStorageChange = () => {
      updateRoles(); // Check roles and authentication when localStorage changes
    };

    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);   

    };
  }, []);

  // Axios interceptor for handling 401 Unauthorized responses
  useEffect(() => {
    const interceptor = axios.interceptors.response.use(
      response => response,
      error => {
        if (error.response && error.response.status   
 === 401) {
          localStorage.removeItem('access_token');
          localStorage.removeItem('refresh_token');   

          localStorage.removeItem('token_expiry');

          toast.error('Session expired. Please log in again.');
          window.location.href = '/signin'; // Redirect to sign-in page
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axios.interceptors.response.eject(interceptor); // Cleanup interceptor when component unmounts
    };
  }, []);

  if (!isAuthChecked) {
    return null; // Show a loading spinner or a fallback UI if roles aren't checked yet
  }

  const renderRoute = (Component, path, allowedRoles) => (
    <Route
      path={path}
      element={
        <PrivateRoute allowedRoles={allowedRoles} role={userRole}>
          <Component />
        </PrivateRoute>
      }
    />
  );

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Router>
        <div className="App">
          <Header />
          <ToastContainer /> {/* ToastContainer for notifications */}
          <Routes>
            {isSuperuser && (
              <>
                {renderRoute(Inventory, '/Inventory', ['admin'])}
                {renderRoute(Report, '/Reports', ['admin'])}
                {renderRoute(Orders, '/Orders', ['admin'])}
                {renderRoute(ProductInfo, '/Inventory/product/:id', ['admin'])}
                {renderRoute(Suppliers, '/Suppliers', ['admin'])}
                {renderRoute(Categories, '/Inventory/Categories', ['admin'])}
                {renderRoute(SearchResults, '/search-results', ['admin'])}
                <Route path="/" element={<Home />} /> {/* Home route for superusers */}
              </>
            )}
            {isStaff && (
              <>
                <Route path="/" element={<UserHome />} /> {/* Home route for staff */}
                {renderRoute(ProductPage, '/product/:id', ['user'])}
              </>
            )}
            <Route path="/signin/" element={<Signin />} />
            <Route path="*" element={<Error />} />
          </Routes>
        </div>
      </Router>
    </LocalizationProvider>
  );
}

export default App;