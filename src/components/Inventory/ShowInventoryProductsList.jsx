import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { filter_icon } from "../../snippets/Image_load";
import { useLocation, NavLink, useNavigate } from 'react-router-dom';
import {ProductContext} from "../../api/FetchProducts";
import useHandleDeleteProduct from "../../api/HandleDeleteProduct";
// import Paginate from "../../snippets/Paginate";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import AlertDialog from "../../snippets/AlertDialog";
// import UpdateProduct from "./UpdateProduct"; 
import exportToExcel from "../../utils/exportToExcel";
import TableComponent from "../Tables/TableComponent";
import ActionButton from "../../snippets/ActionBtn";
// import SkeletonLoader from "../../snippets/SkeletonLoader";

const ShowInventoryProductsList = ({ openModel }) => {
    const { products, loading, error, fetchProducts, currentPage, setCurrentPage, totalPages } = useContext(ProductContext);
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
        console.log("clicked");
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
        <>
            
            <ToastContainer />
            {/* <AlertDialog 
                open={dialogOpen} 
                handleClose={handleCloseDialog} 
                handleAgree={handleAgree} 
            /> */}
            <div className="flex justify-between items-center mt-5 mb-5">
                <h3 className="text-xl font-bold">Products</h3>
                <div className="flex items-center gap-3">
                    <ActionButton
                        label="Add Product"
                        onClick={() => openModel(handleProductAdded)}
                        className="bg-blue-700 border-none px-5 text-sm text-white font-medium"
                    />
                    <ActionButton
                        label="Filters"
                        className="bg-blue-700 border-none px-5 text-sm text-white font-medium"
                    />
                    <ActionButton
                        label={isExporting ? 'Exporting...' : 'Download all'}
                        disabled={isExporting}
                        onClick={handleExport}
                        className="bg-blue-700 border-none px-5 text-sm text-white font-medium"
                    />
                </div>
            </div>
            <TableComponent onClickEdit={openUpdateModal} onClickDelete={openDeleteDialog} products={products} loading={loading} />
            <div>
                <div className="pagination flex2">
                {/* <Paginate   
                    count={totalPages}
                    page={currentPage}
                    onPageChange={page => setCurrentPage(page)} 
                /> */}
                </div>
            </div>

            {/* {updateModalOpen && (
                <UpdateProduct
                    productId={productIdToUpdate}
                    isOpen={updateModalOpen}
                    onClose={handleCloseUpdateModal}
                    onProductUpdated={fetchProducts}
                />
            )} */}
       </>
    );
};

export default ShowInventoryProductsList;
