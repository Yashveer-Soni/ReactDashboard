import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate  } from 'react-router-dom';
import axios from 'axios';
import './static/css/style.css';
import './static/css/responsive.css';
// import Header from './components/header';
import Header from './components/Header/header';

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
import { FetchProducts } from './api/FetchProducts';
import DefaultLayout from './layout/DefaultLayout';
import Index from './components/Pages/Dashboard/Index';

// const PrivateRoute = ({ children,  allowedRoles, role }) => {
//   const isAuthenticated = !!localStorage.getItem('access_token');
 
//   if (!isAuthenticated) {
//     // window.location.href = '/signin/';
//     return null;
//   }

//   if (allowedRoles && !allowedRoles.includes(role.trim().toLowerCase())) {
//     // window.location.href = '/';
//     return null; 
//   }

//   return children;
// };

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

  let sessionExpired = false;

  // Axios interceptor for handling 401 Unauthorized responses
  useEffect(() => {
    const interceptor = axios.interceptors.response.use(
      response => response,
      error => {
        if (error.response && error.response.status === 401 && !sessionExpired) {
          localStorage.removeItem('access_token');
          localStorage.removeItem('refresh_token'); 
  
          localStorage.removeItem('token_expiry');
  
          if (window.location.pathname !== '/signin/') {
            window.location.href = '/signin/'; 
          } else {
            toast.error('Session expired. Please log in again.');
          }
          sessionExpired = true;
        }
        return Promise.reject(error);
      }
    );
  
    return () => {
      axios.interceptors.response.eject(interceptor); 
    };
  }, []);

  if (!isAuthChecked) {
    return null; 
  }

  const renderRoute = (Component, path, allowedRoles) => (
    <Route
      path={path}
      element={
          <Component />
      }
    />
  );

  return (
    <FetchProducts>
      <Router>
        <div className="App">
          <ToastContainer />
  
          {/* Wrapping with DefaultLayout */}
          <DefaultLayout>
            <Routes>
              {/* Superuser Routes */}
              {isSuperuser && (
                <>
                  <Route index element={<Index />} />
                  {renderRoute(Index, '/Index', ['admin'])}
                  {renderRoute(Inventory, '/Inventory', ['admin'])}
                  {renderRoute(Report, '/Reports', ['admin'])}
                  {renderRoute(Orders, '/Orders', ['admin'])}
                  {renderRoute(ProductInfo, '/Inventory/product/:id', ['admin'])}
                  {renderRoute(Suppliers, '/Suppliers', ['admin'])}
                  {renderRoute(SearchResults, '/search-results', ['admin'])}
                  <Route path="/" element={<Header />} /> {/* Home route for superusers */}
                </>
              )}
  
              {/* Staff Routes */}
              {isStaff && (
                <>
                  <Route path="/" element={<UserHome />} /> {/* Home route for staff */}
                  {renderRoute(ProductPage, '/product/:id', ['user'])}
                  {renderRoute(SearchResults, '/search-results', ['user'])}
                </>
              )}
  
              {/* Authentication and Error Routes */}
              <Route path="/signin/" element={<Signin />} />
              <Route path="*" element={<Error />} />
            </Routes>
          </DefaultLayout>
          
        </div>
      </Router>
    </FetchProducts>
  );
  
}

export default App;