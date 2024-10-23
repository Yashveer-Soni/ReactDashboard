import React, { useState, useEffect, useRef, Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import axios from 'axios';
import './static/css/style.css';
import './static/css/responsive.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FetchProducts } from './api/FetchProducts';
import DefaultLayout from './layout/DefaultLayout';
// import other components lazily
const Header = React.lazy(() => import('./components/Header/header'));
const Home = React.lazy(() => import('./components/Index'));
const Inventory = React.lazy(() => import('./components/Inventory/Inventory'));
const Report = React.lazy(() => import('./components/Reports'));
const Orders = React.lazy(() => import('./components/Orders'));
const ProductInfo = React.lazy(() => import('./components/Inventory/Productinfo'));
const Suppliers = React.lazy(() => import('./components/Suppliers'));
const Signin = React.lazy(() => import('./components/Signin'));
const Error = React.lazy(() => import('./snippets/Error'));
const SearchResults = React.lazy(() => import('./components/SearchResults'));
const UserHome = React.lazy(() => import('./user/UserHome'));
const ProductPage = React.lazy(() => import('./user/ProductPage'));

const Index = React.lazy(() => import('./components/Pages/Dashboard/Index'));

function App() {
  const [isStaff, setIsStaff] = useState(false);
  const [isSuperuser, setIsSuperuser] = useState(false);
  const [isAuthChecked, setIsAuthChecked] = useState(false);
  const [sessionExpired, setSessionExpired] = useState(false);
  const toastShownRef = useRef(false);  
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
    updateRoles();

    const handleStorageChange = () => updateRoles();
    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);   
    };
  }, []);

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
            setSessionExpired(false);
          } else {
            setSessionExpired(true);
            if (!toastShownRef.current) {
              // toast.error('Session expired. Please log in again.');
              toastShownRef.current = true;
            }
          }
        }
        return Promise.reject(error);
      }
    );

    return () => axios.interceptors.response.eject(interceptor);
  }, [sessionExpired]);

  if (!isAuthChecked) {
    return <div>Loading...</div>;  // Add a loader or message here instead of null
  }

  const routes = [
    { path: '/Index', component: Index, allowedRoles: ['admin'] },
    { path: '/Inventory', component: Inventory, allowedRoles: ['admin'] },
    { path: '/Reports', component: Report, allowedRoles: ['admin'] },
    { path: '/Orders', component: Orders, allowedRoles: ['admin'] },
    { path: '/Inventory/product/:id', component: ProductInfo, allowedRoles: ['admin'] },
    { path: '/Suppliers', component: Suppliers, allowedRoles: ['admin'] },
    { path: '/search-results', component: SearchResults, allowedRoles: ['admin', 'user'] },
    { path: '/', component: Index, allowedRoles: ['admin'] },
    { path: '/', component: UserHome, allowedRoles: ['user'] }, 
    { path: '/product/:id', component: ProductPage, allowedRoles: ['user'] },
  ];

  return (
    <FetchProducts>
      <Router>
        <div className="App">
          <ToastContainer />
          <DefaultLayout role={isStaff ? 'user' : 'admin'} sessionExpired={sessionExpired}>
            {/* Suspense is used for lazy loaded components */}
            <Suspense fallback={<div>Loading...</div>}>
              <Routes>
                {routes.map(({ path, component: Component, allowedRoles }) => (
                  (allowedRoles.includes(userRole)) && (
                    <Route key={path} path={path} element={<Component />} />
                  )
                ))}
                <Route path="/signin/" element={<Signin />} />
                <Route path="*" element={<Error />} />
              </Routes>
            </Suspense>
          </DefaultLayout>
        </div>
      </Router>
    </FetchProducts>
  );
}

export default App;
