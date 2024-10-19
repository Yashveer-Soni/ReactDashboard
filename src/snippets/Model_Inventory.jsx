import { useState, React, useEffect } from "react";
import Category_Select from "./CustomCategorySelect";
import SubCategory_Select from "./CustomSubCategorySelect";
import Brand_Select from "./CustomBrandsSelect";
// import FileUpload from "./FileUpload";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios"; // Import axios for HTTP requests
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faPenToSquare, faTrash, faIndianRupeeSign } from '@fortawesome/free-solid-svg-icons';
// import AddBrand from '../components/Inventory/Brand/AddBrand';
import TextEditor from "../utils/TextEditor";

// import SelectCollection from "./SelectCollection"
import SelectProductStatus from "./SelectProductStatus";
import WeightType from "./WeightType";
// import dayjs from 'dayjs';
import { Icon } from '@iconify/react';
import TagSelect from "./TagSelect";
import DatePickerComponent from "./DatePicker";


const Model_Inventory = ({ isOpen, onClose, onProductAdded }) => {
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
  const [packagingDate, setpackagingDate] = useState(localStorage.getItem("packagingDate"));
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
  const [sellingrate, setsellingRate] = useState(localStorage.getItem("sellingrate") || '');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isError, setIsError] = useState(false);

  const token = localStorage.getItem('access_token');

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

  var fileValidate = false;
  if (files.length === 0) {
    fileValidate = false;
  } else {
    fileValidate = true;
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
    localStorage.setItem("sellingrate", sellingrate);
    sellingrate > 0
      ? localStorage.setItem("sellingrate", sellingrate)
      : localStorage.removeItem("sellingrate");

    tags.length > 0
      ? localStorage.setItem("tags", JSON.stringify(tags))
      : localStorage.removeItem("tags");
    collections.length > 0
      ? localStorage.setItem("collections", JSON.stringify(collections))
      : localStorage.removeItem("collections");


  }, [productName, productId, MRP, sellingrate, purchaseRate, weight, quantity, expiryDate, packagingDate, selectedCategory, selectedSubCategory, selectedBrand, files, editorContent, selectedStatus, costPerItem, profit, margin, tags, collections]);
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
      <div className={`${isOpen ? "block" : "hidden"} fixed inset-0 bg-white dark:bg-boxdark  flex justify-center items-center z-99999`}>
        <div className=" p-6 rounded-lg shadow-lg h-full w-full ">
          <form id="myForm" className="flex gap-4 flex-col md:flex-row" onSubmit={handleSubmit}>
            <div className="md:w-1/2">
              <div className="mb-6">
                {/* <FileUpload onFilesUpdate={handleFilesUpdate} /> */}
              </div>
            </div>
            <div className="md:w-1/2">
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium dark:text-white text-gray-700">Product Name</label>
                  <input
                    type="text"
                    name="productName"
                    id="pName"
                    placeholder="Enter product name"
                    className="mt-2 block w-full font-medium border border-gray-300 rounded-md shadow-sm py-2.5 px-3 focus:ring-0 focus:border-transparent sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-white ">Product Description</label>
                  <TextEditor onChange={handleEditorChange} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-white">Product ID</label>
                  <input
                    type="text"
                    name="productId"
                    id="pID"
                    placeholder="Enter product ID"
                    className="mt-2 block w-full font-medium border border-gray-300 rounded-md shadow-sm py-2.5 px-3 focus:ring-0 focus:border-transparent sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                    value={productId}
                    onChange={(e) => setProductId(e.target.value)}
                  />
                </div>
                <div> 
                  <Category_Select onSelectCategory={handleCategorySelect} />
                </div>
                <div>
                  <SubCategory_Select selectedCategoryId={selectedCategory} onSelectSubCategory={handleSubCategorySelect} />
                </div>
                <div>
                  <div className="">
                    <Brand_Select onSelectBrand={setSelectedBrand} />
                    <FontAwesomeIcon icon={faPlus} className="cursor-pointer text-blue-500" onClick={handleClickOpen} />
                    <FontAwesomeIcon icon={faPenToSquare} className="cursor-pointer text-yellow-500" />
                    <FontAwesomeIcon icon={faTrash} className="cursor-pointer text-red-500" />
                  </div>
                </div>
              </div>
            </div>
            <div className="md:w-1/2 mt-6 md:mt-0 space-y-6">
              <div>
                <SelectProductStatus onSelectStatus={SelectedProductStatus} />
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-white">MRP</label>
                  <div className="flex relative  items-center mt-2  ">
                    <Icon icon="mynaui:rupee" width={18}  className="absolute  left-2 top-1/2 transform -translate-y-1/2" />
                    <input
                      type="text"
                      className=" block w-full font-medium border border-gray-300 rounded-md shadow-sm py-2.5 px-7 focus:ring-0 focus:border-transparent sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                      value={MRP}
                      onChange={handleMrpChange}
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-white">Purchase Price</label>
                  <div className="flex relative  items-center mt-2 ">
                    <Icon icon="mynaui:rupee" width={18}  className="absolute  left-2 top-1/2 transform -translate-y-1/2" />
                    <input
                      type="text"
                      className="block w-full font-medium border border-gray-300 rounded-md shadow-sm py-2.5 px-7 focus:ring-0 focus:border-transparent sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                      value={purchaseRate}
                      onChange={(e) => setpurchaseRate(e.target.value)}
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-white">Sell Price</label>
                  <div className="flex relative  items-center mt-2 ">
                    <Icon icon="mynaui:rupee" width={18}  className="absolute  left-2 top-1/2 transform -translate-y-1/2" />
                    <input
                      type="text"
                      className="block w-full font-medium border border-gray-300 rounded-md shadow-sm py-2.5 px-7 focus:ring-0 focus:border-transparent sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                      value={sellingrate}
                      onChange={(e) => setsellingRate(e.target.value)}
                    />
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-white">Cost Per Item</label>
                  <div className="flex relative  items-center mt-2 ">
                    <Icon icon="mynaui:rupee" width={18}  className="absolute  left-2 top-1/2 transform -translate-y-1/2" />
                    <input
                      type="text"
                      className="block w-full font-medium border border-gray-300 rounded-md shadow-sm py-2.5 px-7 focus:ring-0 focus:border-transparent sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                      value={costPerItem}
                      onChange={handleCostChange}
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-white">Profit</label>
                  <div className="flex relative  items-center mt-2 ">
                    <Icon icon="mynaui:rupee" width={18}  className="absolute  left-2 top-1/2 transform -translate-y-1/2" />
                    <input
                      type="text"
                      className="block w-full font-medium border border-gray-300 rounded-md shadow-sm py-2.5 px-7 focus:ring-0 focus:border-transparent sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                      value={profit}
                      readOnly
                      onChange={(e) => setProfit(e.target.value)}
                    />
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-white">Weight</label>
                  <div className="flex items-center space-x-2">
                    <input
                      type="text"
                      className="mt-2 block w-full font-medium border border-gray-300 rounded-md shadow-sm py-2.5 px-3 focus:ring-0 focus:border-transparent sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                      value={weight}
                      onChange={(e) => setWeight(e.target.value)}
                    />
                    <WeightType onWeightChange={(weightType) => setWeightType(weightType)} />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-white">Quantity</label>
                  <input
                    type="text"
                    className="mt-2 block w-full font-medium border border-gray-300 rounded-md shadow-sm py-2.5 px-3 focus:ring-0 focus:border-transparent sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-white">Tags</label>
                <TagSelect onChangeTags={(tags) => setTags(tags)} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-white">Collections</label>
                {/* <SelectCollection onChangeCollections={(collections) => setCollections(collections)} /> */}
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-white">Packaging Date</label>
                  {/* <DatePicker value={packagingDate} onChange={(newValue) => setpackagingDate(newValue)} /> */}
                  <DatePickerComponent />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-white">Expiry Date</label>
                  {/* <DatePicker value={expiryDate} onChange={(newValue) => setExpiryDate(newValue)} /> */}
                </div>
              </div>
              <div className="flex justify-end space-x-4 mt-6">
                <button
                  className="bg-gray-500 text-white py-2 px-4 rounded-md dark:text-white"
                  type="button"
                  onClick={onClose}
                >
                  Discard
                </button>
                <button
                  className="bg-blue-600 text-white py-2 px-4 rounded-md dark:text-white"
                  type="submit"
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
