import { useState, React, useEffect } from "react";
import Category_Select from "./CustomCategorySelect";
import SubCategory_Select from "./CustomSubCategorySelect";
import Brand_Select from "./CustomBrandsSelect";
import FileUpload from "./FileUpload";
import { DatePicker } from "@mui/x-date-pickers";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios"; // Import axios for HTTP requests
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import AddBrand from '../components/Inventory/Brand/AddBrand';
import LinearProgress from '@mui/material/LinearProgress';
import Box from '@mui/material/Box';
import TextEditor from "../utils/TextEditor";
import AddTags from "./AddTags";
import SelectCollection from "./SelectCollection"
import SelectProductStatus from "./SelectProductStatus";




const Model_Inventory = ({ isOpen, onClose, onProductAdded  }) => {
  const [productName, setProductName] = useState("");
  const [productId, setProductId] = useState("");
  const [MRP, setMRP] = useState("");
  const [purchaseRate, setpurchaseRate] = useState("");
  const [weight, setWeight] = useState("");
  const [quantity, setQuantity] = useState("");
  const [expiryDate, setExpiryDate] = useState(null);
  const [packagingDate, setpackagingDate] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null); 
  const [selectedSubCategory, setSubSelectedCategory] = useState(null); 
  const [selectedBrand, setSelectedBrand] = useState(null); 
  const [open, setOpen] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isAdding, setIsAdding] = useState(false);
  const token=localStorage.getItem('access_token');



  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [files, setFiles] = useState([]);
  var fileValidate=false;
  if (files.length===0){
    fileValidate=false;
  }else{
    fileValidate=true;
  }
  const handleCategorySelect = (category) => {
    setSelectedCategory(category);  // Set the category ID
  };

  const handleFilesUpdate = (newFiles) => {
    setFiles(newFiles);
  };
 

  const handleSubCategorySelect = (subCategory) => {
    setSubSelectedCategory(subCategory)
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!productName || !productId || !MRP || !quantity  || !selectedCategory || !selectedSubCategory || !selectedBrand ||!fileValidate ||!expiryDate ||!purchaseRate ||!weight ||!packagingDate) {
      toast.error("Please fill out all required fields.");
      return;
    }

    const formData = new FormData();
    formData.append('item_name', productName);
    formData.append('bar_code', productId);
    formData.append('mrp', MRP);
    formData.append('weight', weight);
    formData.append('purchase_rate', purchaseRate);
    formData.append('category', selectedCategory);
    formData.append('sub_category', selectedSubCategory || '');
    formData.append('brand', selectedBrand || '');
    formData.append('quantity', quantity);
    formData.append('expiry_date', expiryDate ? expiryDate.toISOString().split('T')[0] : '');
    formData.append('pkt_date', packagingDate ? packagingDate.toISOString().split('T')[0] : '');
     
    // Append images to formData
    files.forEach((file, index) => {
      formData.append('images', file);  // 'images' is the key in the Django view
    });
    setIsAdding(true);

    axios.post('http://127.0.0.1:8000/api/products/',formData,{
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'multipart/form-data'
    },
    onUploadProgress: (progressEvent) => {
      setProgress(Math.round((progressEvent.loaded * 100) / progressEvent.total));
    }    
    })
      .then(response => {
        setProductName("");
        setProductId("");
        setMRP("");
        setQuantity("");
        setExpiryDate(null);
        setSelectedCategory(null);
        setSubSelectedCategory(null);
        setSelectedBrand(null);
        setpackagingDate(null);
        setFiles([]); // Reset files
        toast.success("Product added successfully");
        setIsAdding(false);
        onClose(); // Close the modal after successful submission
        // Call the callback function after product is added successfully
        if (onProductAdded) {
          onProductAdded();
        }
      })
      .catch(error => {
        if (error.response && error.response.data && error.response.data.error) {
          toast.error(error.response.data.error);
        } else {
          toast.error("Error adding product");
        }
        console.error("Error adding product:", error);
      });
  };



  return (
    <>
      <AddBrand open={open} onClose={handleClose} />
      <div className={`${isOpen ? "modelinventory" : "hide"}`}>
        <div className="modelcontainer">
        {isAdding &&(
        <Box sx={{ width: '100%' }}>
        <LinearProgress variant="determinate" value={progress} />
        </Box>
        )}
         
          <form id="myForm" className="entries" onSubmit={handleSubmit}>
            <div className="left-form-child"> 
              <div className="dragimage">
                <FileUpload onFilesUpdate={handleFilesUpdate} />
              </div>
            </div>
            <div className="right-form-child">
              <div className="sub-child">
                <div className="productname">
                  <h4>Product Name</h4>
                  <input
                    type="text"
                    name="productName"
                    id="pName"
                    placeholder="Enter product name"
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                  />
                </div>
                <div className="productname">
                <h4>Product Description</h4>
                < TextEditor />
                </div>
                <div className="productname">
                  <h4>Product ID</h4>
                  <input
                    type="text"
                    name="productId"
                    id="pID"
                    placeholder="Enter product ID"
                    value={productId}
                    onChange={(e) => setProductId(e.target.value)}
                  />
                </div>
                <div className="productname">
                  <h4>Category</h4>
                  <Category_Select onSelectCategory={handleCategorySelect} />
                </div>
                <div className="productname">
                  <h4>Sub Category</h4>
                  <SubCategory_Select selectedCategoryId={selectedCategory} onSelectSubCategory={handleSubCategorySelect} />
                </div>
                <div className="productname">
                  <h4>Brand</h4>
                  <div className="brand-action">
                    <Brand_Select onSelectBrand={setSelectedBrand} />
                    <FontAwesomeIcon icon={faPlus} style={{ cursor: 'pointer' }} onClick={handleClickOpen} />
                    <FontAwesomeIcon icon={faPenToSquare} style={{ cursor: 'pointer' }} />
                    <FontAwesomeIcon icon={faTrash} style={{ cursor: 'pointer' }} />
                  </div>
                </div>
                </div>
                <div className="sub-child2">
                <div className="productname">
                  <h4>Status</h4>
                  <SelectProductStatus />
                </div>
                <div className="productname price-container">
                  <div>
                  <h4>MRP</h4>
                  <input
                    className="err"
                    name="productPrice"
                    type="text"
                    id="pPrice"
                    placeholder="Enter MRP"
                    value={MRP}
                    onChange={(e) => setMRP(e.target.value)}
                  />
                  </div>
                  <div>
                  <h4>Purchase Rate</h4>
                  <input
                    className="err"
                    name="productPrice"
                    type="text"
                    id="pPrice"
                    placeholder="Enter Purchase Rate"
                    value={purchaseRate}
                    onChange={(e) => setpurchaseRate(e.target.value)}
                  />
                  </div>
                </div>
              
                <div className="productname">
                  <h4>Weight</h4>
                  <input
                    className="err"
                    name="productPrice"
                    type="text"
                    id="pPrice"
                    placeholder="Enter Weight"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                  />
                </div>
                <div className="productname">
                  <h4>Quantity</h4>
                  <input
                    className="err"
                    name="productQuantity"
                    type="text"
                    id="pQuantity"
                    placeholder="Enter product quantity"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                  />
                </div>
                <div className="productname">
                  <h4>Tags</h4>
                  <AddTags />
                </div>
                <div className="productname">
                  <h4>Collections</h4>
                  <SelectCollection />
                </div>
                
                <div className="productname">
                  <h4>Packaging Date</h4>
                  <DatePicker
                    className="myDatePicker"
                    value={packagingDate}
                    onChange={(newValue) => setpackagingDate(newValue)}
                  />
                </div>
                <div className="productname">
                  <h4>Expiry Date</h4>
                  <DatePicker
                    className="myDatePicker"
                    value={expiryDate}
                    onChange={(newValue) => setExpiryDate(newValue)}
                  />
                </div>
                </div>
                <div
                  className="submitbtn"
                  style={{
                    float: "right",
                    marginTop: "15px",
                    display: "flex",
                    gap: "20px",
                  }}
                >
                  <button
                    className="btn"
                    id="discard"
                    type="button"
                    onClick={onClose}
                  >
                    Discard
                  </button>
                  <button
                    className="btn"
                    type="submit"
                    style={{
                      backgroundColor: "#1366D9",
                      color: "white",
                      border: "none",
                    }}
                  >
                  Add Product
                  </button>
                </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Model_Inventory;
