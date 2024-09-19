import React, { useEffect, useState } from "react";
import axios from "axios";
import { filter_icon } from "../../snippets/Image_load";
import { useLocation, NavLink, useNavigate } from 'react-router-dom';
import {FetchProducts} from "../../api/FetchProducts";
import useHandleDeleteProduct from "../../api/HandleDeleteProduct";
import Paginate from "../../snippets/Paginate";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AlertDialog from "../../snippets/AlertDialog";
import UpdateProduct from "./UpdateProduct"; // Import the UpdateProduct component
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import exportToExcel from "../../utils/exportToExcel";
import SkeletonLoader from "../../snippets/SkeletonLoader";

const ShowInventoryProductsList = ({ openModel }) => {
    const { products, loading, error, fetchProducts, currentPage, setCurrentPage, totalPages } = FetchProducts();
    const { deleteError, handleDeleteProduct } = useHandleDeleteProduct(fetchProducts);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [productIdToDelete, setProductIdToDelete] = useState(null);
    const [productIdToUpdate, setProductIdToUpdate] = useState(null);
    const [updateModalOpen, setUpdateModalOpen] = useState(false);
    const [progress, setProgress] = useState(0);
    const [isExporting, setIsExporting] = useState(false);
    const handleExport = () => {
        exportToExcel(products, setIsExporting, setProgress);
    };

    const handleProductAdded = async () => {
        fetchProducts(); // Re-fetch the product list after adding
    };

    const openDeleteDialog = (productId) => {
        setProductIdToDelete(productId);
        setDialogOpen(true);
    };

    const openUpdateModal = (productId) => {
        setProductIdToUpdate(productId);
        setUpdateModalOpen(true);
    };

    const handleCloseDialog = () => {
        setDialogOpen(false);
    };

    const handleCloseUpdateModal = () => {
        setUpdateModalOpen(false);
        setProductIdToUpdate(null);
    };

    const handleAgree = async () => {
        try {
            await handleDeleteProduct(productIdToDelete);
            toast.success('Product deleted successfully!');
        } catch {
            toast.error('Failed to delete the product.');
        } finally {
            setDialogOpen(false);
        }
    };
    const skeletonConfigs = [
        { variant: 'rectangular', width: '100%', height: 50 },
        { variant: 'rectangular', width: '100%', height: 50 },
        { variant: 'rectangular', width: '100%', height: 50 },
        { variant: 'rectangular', width: '100%', height: 50 },
        { variant: 'rectangular', width: '100%', height: 50 },
        { variant: 'rectangular', width: '100%', height: 50 },
        { variant: 'rectangular', width: '100%', height: 50 },
        { variant: 'rectangular', width: '100%', height: 50 },
        { variant: 'rectangular', width: '100%', height: 50 },
        { variant: 'rectangular', width: '100%', height: 50 },
        { variant: 'rectangular', width: '100%', height: 50 },
        { variant: 'rectangular', width: '100%', height: 50 },
      ];
    if (error) return <p>Error: {error.message}</p>;

    return (
        <div className="overallproducts">
            {isExporting &&(
            <Box sx={{ width: '100%' }}>
            <LinearProgress variant="determinate" value={progress} />
            </Box>
            )}
            
            <ToastContainer />
            <AlertDialog 
                open={dialogOpen} 
                handleClose={handleCloseDialog} 
                handleAgree={handleAgree} 
            />
            <div className="headline flex3">
                <h3 style={{ margin: '0' }}>Products</h3>
                <div style={{ gap: '10px', display: 'flex' }}>
                    <button
                        className="btn"
                        id="addbutton"
                        type="button"
                        onClick={() => openModel(handleProductAdded)}
                        style={{ backgroundColor: '#1366D9', color: 'white', border: 'none' }}
                    >
                        Add Product
                    </button>
                    <button className="btn" type="button">
                        <img src={filter_icon} alt="Filter" /> Filters
                    </button>
                    <button className="btn" type="button" onClick={handleExport} disabled={isExporting} >
                        {isExporting ? 'Exporting...' : 'Download all'}
                    </button>
                </div>
            </div>
            <div>
           
                <table>
                    <thead>
                        <tr style={{ border: 'transparent' }}>
                            <th>S. No.</th>
                            <th>Product Name</th>
                            <th>Brand</th>
                            <th>Category</th>
                            <th>Sub Category</th>
                            <th>MRP</th>
                            <th>Selling Rate</th>
                            <th>Stock</th>
                            <th>Weight</th>
                            <th>Packaging Date</th>
                            <th>Expiry Date</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                   
                    {loading ? (
                        <>
                        {[...Array(10)].map((_, rowIndex) => (
                            <tr key={rowIndex}>
                              {skeletonConfigs.map((config, cellIndex) => (
                                <td key={cellIndex}>
                                  <SkeletonLoader
                                    variants={[config.variant]}
                                    widths={[config.width]}
                                    heights={[config.height]}
                                    spacing={5}
                                    styles={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                                  />
                                </td>
                              ))}
                            </tr>
                          ))}
                          </>
                        
                    ):(
                        products.map((product, index) => (
                            <tr key={index} style={{ cursor: 'pointer' }}>
                                <td>
                                    <NavLink to={`/Inventory/product/${product.item.id}`} style={{ textDecoration: 'none', color: 'blue' }}>
                                        {/* {index + 1} */}
                                        {product.id}
                                    </NavLink>
                                </td>
                                <td>
                                    <NavLink to={`/Inventory/product/${product.item.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                                        {product.item.item_name}
                                    </NavLink>
                                </td>
                                <td>
                                    <NavLink to={`/Inventory/product/${product.item.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                                        {product.item.brand.brand_name}
                                    </NavLink>
                                </td>
                                <td>
                                    <NavLink to={`/Inventory/product/${product.item.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                                        {product.item.sub_category.category.category_name}
                                    </NavLink>
                                </td>
                                <td>
                                    <NavLink to={`/Inventory/product/${product.item.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                                        {product.item.sub_category.sub_category_name}
                                    </NavLink>
                                </td>
                                <td>₹{product.mrp}</td>
                                <td>₹{product.purchase_rate}</td>
                                <td>{product.unit.quantity}</td>
                                <td>{product.unit.weight}</td>
                                <td>{product.pkt_date || 'N/A'}</td>
                                <td>{product.expired_date || 'N/A'}</td>
                                <td>
                                    <div className="Edit-Delete_icons">
                                        <FontAwesomeIcon 
                                            icon={faTrash} 
                                            onClick={() => openDeleteDialog(product.item.id)} 
                                            style={{ color: 'red' }}    
                                        />
                                        <FontAwesomeIcon 
                                            icon={faPenToSquare} 
                                            onClick={() => openUpdateModal(product.id)} 
                                        />
                                    </div>
                                </td>
                            </tr>
                        ))
                    )}
                    
                        
                    </tbody>
                </table>
                <div className="pagination flex2">
                <Paginate   
                    count={totalPages}
                    page={currentPage}
                    onPageChange={page => setCurrentPage(page)} 
                />
                </div>
            </div>

            {updateModalOpen && (
                <UpdateProduct
                    productId={productIdToUpdate}
                    isOpen={updateModalOpen}
                    onClose={handleCloseUpdateModal}
                    onProductUpdated={fetchProducts}
                />
            )}
        </div>
    );
};

export default ShowInventoryProductsList;
