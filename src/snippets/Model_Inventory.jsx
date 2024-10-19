import { useState, React, useEffect } from "react";
// import Category_Select from "./CustomCategorySelect";
// import SubCategory_Select from "./CustomSubCategorySelect";
// import Brand_Select from "./CustomBrandsSelect";
import FileUpload from "./FileUpload";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios"; // Import axios for HTTP requests
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faPenToSquare, faTrash, faIndianRupeeSign } from '@fortawesome/free-solid-svg-icons';
// import AddBrand from '../components/Inventory/Brand/AddBrand';
import TextEditor from "../utils/TextEditor";
// import AddTags from "./AddTags";
// import SelectCollection from "./SelectCollection"
// import SelectProductStatus from "./SelectProductStatus";
// import WeightType from "./WeightType";
// import dayjs from 'dayjs';



const Model_Inventory = ({ isOpen, onClose, onProductAdded  }) => {
  const [productName, setProductName] = useState(localStorage.getItem("productName") || "");
  const [productId, setProductId] = useState(localStorage.getItem("productId") || "");
  const [MRP, setMRP] = useState(localStorage.getItem("MRP") || "");
  const [purchaseRate, setpurchaseRate] = useState(localStorage.getItem("purchaseRate") || "");
  const [weight, setWeight] = useState(localStorage.getItem("weight") || "");
  const [weightType, setWeightType] = useState(localStorage.getItem("weightType") || 0);
  const [quantity, setQuantity] = useState(localStorage.getItem("quantity") || "");
  // const [expiryDate, setExpiryDate] = useState(localStorage.getItem("expiryDate") ? dayjs(localStorage.getItem("expiryDate")) : null);
  // const [packagingDate, setpackagingDate] = useState(localStorage.getItem("packagingDate") ? dayjs(localStorage.getItem("packagingDate")) : null);
    const [expiryDate, setExpiryDate] = useState(localStorage.getItem("expiryDate"));
  const [packagingDate, setpackagingDate] = useState(localStorage.getItem("packagingDate") );
  const [selectedCategory, setSelectedCategory] = useState(localStorage.getItem("selectedCategory") || null); 
  const [selectedSubCategory, setSubSelectedCategory] = useState(localStorage.getItem("selectedSubCategory") || null); 
  const [selectedBrand, setSelectedBrand] = useState(localStorage.getItem("selectedBrand") || null); 
  const [open, setOpen] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isAdding, setIsAdding] = useState(false);
  const [editorContent, setEditorContent] = useState(localStorage.getItem("editorContent") || '');
  const [selectedStatus, setSelectedStatus] = useState(localStorage.getItem("selectedStatus") || 0);
  const [costPerItem, setCostPerItem] = useState(localStorage.getItem("costPerItem") || "");
  const [profit, setProfit] = useState(localStorage.getItem("profit") || "");
  const [margin, setMargin] = useState(localStorage.getItem("margin") || "");
  const [tags, setTags] = useState(JSON.parse(localStorage.getItem("tags")) || []);
  const [collections, setCollections] = useState(JSON.parse(localStorage.getItem("collections")) || []);
  const [files, setFiles] = useState(JSON.parse(localStorage.getItem("files")) || []);
  const [sellingrate, setsellingRate]=useState(localStorage.getItem("sellingrate") || '');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isError, setIsError] = useState(false);

  const token=localStorage.getItem('access_token');

  const handleCostChange = (e) => {
    const cost = parseFloat(e.target.value) || 0;
    setCostPerItem(cost);

    const profitValue = parseFloat(MRP) - cost;
    setProfit(profitValue);

    const marginValue = MRP ? ((profitValue / parseFloat(MRP)) * 100).toFixed(2) : 0;
    setMargin(marginValue);
  };

  const handleMrpChange = (e) => {
    const mrpValue = parseFloat(e.target.value) || 0;
    setMRP(mrpValue);

    const profitValue = mrpValue - parseFloat(costPerItem);
    setProfit(profitValue);

    const marginValue = mrpValue ? ((profitValue / mrpValue) * 100).toFixed(2) : 0;
    setMargin(marginValue);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  var fileValidate=false;
  if (files.length===0){
    fileValidate=false;
  }else{
    fileValidate=true;
  }
  const handleCategorySelect = (category) => {
    setSelectedCategory(category);  // Set the category ID
  };

  const handleEditorChange = (content) => {
    setEditorContent(content);
  };
  const handleFilesUpdate = (newFiles) => {
    setFiles(newFiles);
  };

  const SelectedProductStatus = (status) => {
    setSelectedStatus(status);
  };
 

  const handleSubCategorySelect = (subCategory) => {
    setSubSelectedCategory(subCategory)
  };

  // Save to localStorage on change
  useEffect(() => {
    localStorage.setItem("productName", productName);
    localStorage.setItem("productId", productId);
    localStorage.setItem("MRP", MRP);
    localStorage.setItem("purchaseRate", purchaseRate);
    localStorage.setItem("weight", weight);
    localStorage.setItem("quantity", quantity);
    localStorage.setItem("expiryDate", expiryDate);
    localStorage.setItem("packagingDate", packagingDate);
    localStorage.setItem("selectedCategory", selectedCategory);
    localStorage.setItem("selectedSubCategory", selectedSubCategory);
    localStorage.setItem("selectedBrand", selectedBrand);
    localStorage.setItem("files", JSON.stringify(files));
    localStorage.setItem("editorContent", editorContent);
    localStorage.setItem("costPerItem", costPerItem);
    localStorage.setItem("profit", profit);
    localStorage.setItem("margin", margin);
    localStorage.setItem("sellingrate",sellingrate);
    sellingrate > 0
    ?localStorage.setItem("sellingrate",sellingrate)
    :localStorage.removeItem("sellingrate");

    tags.length > 0 
    ? localStorage.setItem("tags", JSON.stringify(tags)) 
    : localStorage.removeItem("tags");
    collections.length > 0 
    ? localStorage.setItem("collections", JSON.stringify(collections)) 
    : localStorage.removeItem("collections");


  }, [productName, productId, MRP,sellingrate, purchaseRate, weight, quantity, expiryDate, packagingDate, selectedCategory, selectedSubCategory, selectedBrand, files, editorContent, selectedStatus, costPerItem, profit, margin, tags, collections]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;

    setIsAdding(true);
    setIsSubmitting(true);

    // Check for missing fields
    if (!productName || !productId || !MRP || !quantity || !costPerItem || !profit || !margin || !weightType || 
        !selectedCategory || !selectedSubCategory || !selectedBrand || !fileValidate || !expiryDate || 
        !purchaseRate || !weight || !packagingDate || !editorContent) {
        toast.error("Please fill out all required fields.");
        setIsAdding(false);
        setIsSubmitting(false);
        return;
    }

    const formData = new FormData();
    formData.append('item_name', productName);
    formData.append('item_description', editorContent);
    formData.append('weightType', weightType);
    formData.append('cost_per_item', costPerItem);
    formData.append('profit', profit);
    formData.append('margin', margin);
    formData.append('tags', tags);
    formData.append('collections', collections);
    formData.append('status', selectedStatus);
    formData.append('bar_code', productId);
    formData.append('mrp', MRP);
    formData.append('weight', weight);
    formData.append('selling_price', sellingrate);
    formData.append('purchase_rate', purchaseRate);
    formData.append('category', selectedCategory);
    formData.append('sub_category', selectedSubCategory || '');
    formData.append('brand', selectedBrand || '');
    formData.append('quantity', quantity);
    formData.append('expiry_date', expiryDate ? expiryDate.toISOString().split('T')[0] : '');
    formData.append('pkt_date', packagingDate ? packagingDate.toISOString().split('T')[0] : '');

    // Append images to formData
    files.forEach((file) => {
        formData.append('images', file);  // 'images' is the key in the Django view
    });

    try {
        const response = await axios.post('http://127.0.0.1:8000/api/products/', formData, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'multipart/form-data',
            },
            onUploadProgress: (progressEvent) => {
                setProgress(Math.round((progressEvent.loaded * 100) / progressEvent.total));
            }
        });

        // Clear local storage
        // clearLocalStorage();
        
        // Reset fields after successful submission
        // resetFields();
        
        toast.success("Product added successfully");
        onClose(); // Close the modal after successful submission
        if (onProductAdded) {
            onProductAdded();
        }
    } catch (error) {
        const errorMessage = error.response && error.response.data && error.response.data.error 
            ? error.response.data.error 
            : "Error adding product";
        toast.error(errorMessage);
        console.error("Error adding product:", error);
        setIsError(true);
    } finally {
        setIsAdding(false);
        setIsSubmitting(false); // Reset submitting state
    }
};

// Function to clear local storage
const clearLocalStorage = () => {
    const keysToRemove = [
        "productName", "productId", "MRP", "purchaseRate", 
        "weight", "weightType", "quantity", "expiryDate", 
        "packagingDate", "selectedCategory", "selectedSubCategory", 
        "selectedBrand", "files", "editorContent", "selectedStatus", 
        "costPerItem", "profit", "margin", "tags", "collections"
    ];
    keysToRemove.forEach(key => localStorage.removeItem(key));
};

// Function to reset fields
const resetFields = () => {
    setProductName("");
    setCollections([]);
    setCostPerItem("");
    setWeightType("");
    setMargin("");
    setEditorContent("");
    setProfit("");
    setTags([]);
    setSelectedStatus(0);
    setProductId("");
    setMRP("");
    setQuantity("");
    setExpiryDate(null);
    setSelectedCategory(null);
    setSubSelectedCategory(null);
    setSelectedBrand(null);
    setpackagingDate(null);
    setFiles([]); // Reset files
};




  return (
    <>
      {/* <AddBrand open={open} onClose={handleClose} /> */}
      <div className={`${isOpen ? "modelinventory" : "hide"}`}>
        <div className="modelcontainer">
       

         
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
                < TextEditor onChange={handleEditorChange} />
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
                  {/* <Category_Select onSelectCategory={handleCategorySelect} /> */}
                </div>
                <div className="productname">
                  <h4>Sub Category</h4>
                  {/* <SubCategory_Select selectedCategoryId={selectedCategory} onSelectSubCategory={handleSubCategorySelect} /> */}
                </div>
                <div className="productname">
                  <h4>Brand</h4>
                  <div className="brand-action">
                    {/* <Brand_Select onSelectBrand={setSelectedBrand} /> */}
                    <FontAwesomeIcon icon={faPlus} style={{ cursor: 'pointer' }} onClick={handleClickOpen} />
                    <FontAwesomeIcon icon={faPenToSquare} style={{ cursor: 'pointer' }} />
                    <FontAwesomeIcon icon={faTrash} style={{ cursor: 'pointer' }} />
                  </div>
                </div>
                </div>
                <div className="sub-child2">
                <div className="productname">
                  <h4>Status</h4>
                  {/* <SelectProductStatus onSelectStatus={SelectedProductStatus} /> */}
                </div>
                <div className="productname price-container">
                  <div className="fa-rupee-icon">
                  <h4>MRP</h4>
                  <FontAwesomeIcon icon={faIndianRupeeSign} />
                  <input
                    className="err"
                    name="productPrice"
                    type="text"
                    id="pPrice"
                    placeholder=""
                    value={MRP}
                    onChange={handleMrpChange}
                  />
                  </div>
                  <div className="fa-rupee-icon">
                  <h4>Purchase Price</h4>
                  <FontAwesomeIcon icon={faIndianRupeeSign} />
                  <input
                    className="err"
                    name="productPrice"
                    type="text"
                    id="pPrice"
                    placeholder=""
                    value={purchaseRate}
                    onChange={(e) => setpurchaseRate(e.target.value)}
                  />
                  </div>
                   <div className="fa-rupee-icon">
                  <h4>Sell Price</h4>
                  <FontAwesomeIcon icon={faIndianRupeeSign} />
                  <input
                    className="err"
                    name="productPrice"
                    type="text"
                    id="pPrice"
                    placeholder=""
                    value={sellingrate}
                    onChange={(e) => setsellingRate(e.target.value)}
                  />
                  </div>
                </div>
                <div className="productname price-container">
                  <div className="fa-rupee-icon">
                  <h4>Cost Per Item</h4>
                  <FontAwesomeIcon icon={faIndianRupeeSign} />
                  <input
                    className="err"
                    name="productPrice"
                    type="text"
                    id="pPrice"
                    placeholder=""
                    value={costPerItem}
                    onChange={handleCostChange}
                  />
                  </div>
                  <div className="fa-rupee-icon">
                  <h4>Profit</h4>
                  <FontAwesomeIcon icon={faIndianRupeeSign} />
                  <input
                    className="err"
                    name="productPrice"
                    type="text"
                    id="pPrice"
                    placeholder=""
                    value={profit}
                    readOnly
                    onChange={(e) => setProfit(e.target.value)}
                  />
                  </div>
                  <div>
                  <h4>Margin</h4>
                  <input
                    className="err"
                    name="productPrice"
                    type="text"
                    id="pPrice"
                    placeholder=""
                    value={margin}
                    readOnly
                    onChange={(e) => setMargin(e.target.value)}
                  />
                  </div>
                </div>
              
                <div className="productname price-container">
                  <div>
                    <h4>Weight</h4>
                    <div className="weight-container">
                      <input
                        className="err"
                        name="productPrice"
                        type="text"
                        id="pPrice"
                        placeholder=""
                        value={weight}
                        onChange={(e) => setWeight(e.target.value)}
                      />
                      {/* <WeightType onWeightChange={(weightType) => setWeightType(weightType)} /> */}
                    </div>
                  </div>
                  <div>
                    <h4>Quantity</h4>
                    <input
                      className="err"
                      name="productQuantity"
                      type="text"
                      id="pQuantity"
                      placeholder=""
                      value={quantity}
                      onChange={(e) => setQuantity(e.target.value)}
                    />
                  </div>
                </div>
                <div className="productname">
                  
                </div>
                <div className="productname">
                  <h4>Tags</h4>
                  {/* <AddTags onChangeTags={(tags) => setTags(tags)} /> */}
                </div>
                <div className="productname">
                  <h4>Collections</h4>
                  {/* <SelectCollection onChangeCollections={(collections) => setCollections(collections)} /> */}
                </div>
                
                <div className="productname">
                  <h4>Packaging Date</h4>
                  {/* <DatePicker
                    className="myDatePicker"
                    value={packagingDate}
                    onChange={(newValue) => setpackagingDate(newValue)}
                  /> */}
                </div>
                <div className="productname">
                  <h4>Expiry Date</h4>
                  {/* <DatePicker
                    className="myDatePicker"
                    value={expiryDate}
                    onChange={(newValue) => setExpiryDate(newValue)}
                  /> */}
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
