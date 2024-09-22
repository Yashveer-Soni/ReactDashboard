import React, { useState, useEffect } from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
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

const PrivateRoute = ({ children, allowedRoles }) => {
  const isAuthenticated = !!localStorage.getItem('access_token');
  const userRole = localStorage.getItem('role')?.trim().toLowerCase(); // Make sure role is trimmed and lowercase


  if (!isAuthenticated) {
    return <Navigate to="/signin/" replace />;
  }

  const roleIncluded = allowedRoles?.map(role => role.trim().toLowerCase()).includes(userRole);

  console.log('allowed roles include user role:', roleIncluded);

  if (allowedRoles && !roleIncluded) {
    // return <Navigate to="/" replace />;
    window.location.href = '/';
  }

  return children;
};


function App() {
  const [isStaff, setIsStaff] = useState(false);
  const [isSuperuser, setIsSuperuser] = useState(false);
  const [isAuthChecked, setIsAuthChecked] = useState(false);

  const updateRoles = () => {
    const role = localStorage.getItem('role');
    const accessToken = localStorage.getItem('access_token');


    if (accessToken && role) {
      setIsStaff(role === 'user');
      setIsSuperuser(role === 'admin');
    } else {
      setIsStaff(false);
      setIsSuperuser(false);
    }

    setIsAuthChecked(true);
  };

  useEffect(() => {
    updateRoles(); // Check roles and authentication on component mount

    const handleStorageChange = () => {
      console.log('Storage event triggered');
      updateRoles(); // Check roles and authentication when localStorage changes
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  if (!isAuthChecked) {
    return null; // Show a loading spinner or a fallback UI if roles aren't checked yet
  }

  const renderRoute = (Component, path, allowedRoles) => (
    <Route
      path={path}
      element={
        <PrivateRoute allowedRoles={allowedRoles}>
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
          <Routes>
            {isSuperuser && (
              <>
                {renderRoute(Home, '/', ['admin'])}
                {renderRoute(Inventory, '/Inventory', ['admin'])}
                {renderRoute(Report, '/Reports', ['admin'])}
                {renderRoute(Orders, '/Orders', ['admin'])}
                {renderRoute(ProductInfo, '/Inventory/product/:id', ['admin'])}
                {renderRoute(Suppliers, '/Suppliers', ['admin'])}
                {renderRoute(Categories, '/Inventory/Categories', ['admin'])}
                {renderRoute(SearchResults, '/search-results', ['admin'])}

              </>
            )}
            {
            isStaff && 
            (
              <>
               {renderRoute(UserHome, '/', ['user'])}
               {renderRoute(ProductPage, '/product/:id', ['user'])}
              </>
            )
            }
            <Route path="/signin/" element={<Signin />} />
            <Route path="*" element={<Error />} />
          </Routes>
        </div>
      </Router>
    </LocalizationProvider>
  );
}

export default App;
