import { useState, useEffect } from "react";
import Category_Select from "../../snippets/CustomCategorySelect";
import SubCategory_Select from "../../snippets/CustomSubCategorySelect";
import Brand_Select from "../../snippets/CustomBrandsSelect";
import FileUpload from "../../snippets/FileUpload";
import dayjs from 'dayjs';

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import TextEditor from "../../utils/TextEditor";
import AddTags from "../../snippets/AddTags";
import SelectCollection from "../../snippets/SelectCollection"
import SelectProductStatus from "../../snippets/SelectProductStatus";
import WeightType from "../../snippets/WeightType";


const UpdateProduct = ({ productId, isOpen, onClose, onProductUpdated }) => {
  const [productName, setProductName] = useState("");
  const [MRP, setMRP] = useState("");
  const [purchaseRate, setPurchaseRate] = useState("");
  const [weight, setWeight] = useState("");
  const [quantity, setQuantity] = useState("");
  const [expiryDate, setExpiryDate] = useState(null);
  const [packagingDate, setPackagingDate] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [files, setFiles] = useState([]);
  const [load, setLoad] = useState(false);
  const [editorContent, setEditorContent] = useState('');
  const [selectedStatus, setSelectedStatus] = useState(0);
  const [costPerItem, setCostPerItem] = useState("");
  const [profit, setProfit] = useState("");
  const [margin, setMargin] = useState("");
  const [tags, setTags] = useState([]);
  const [collections, setCollections] = useState([]);
  const token=localStorage.getItem('access_token');


  // Fetch existing product data when productId changes
  useEffect(() => {
    if (productId) {
      axios.get(`http://127.0.0.1:8000/api/FetchSingleProduct/${productId}/`,{
        headers: {
          'Authorization': `Bearer ${token}`
      }
      })
        .then(response => {
          const product = response.data;
          setProductName(product.item.item_name);
          setMRP(product.mrp);
          setPurchaseRate(product.purchase_rate);
          setWeight(product.unit.weight);
          setQuantity(product.unit.quantity);
          setSelectedCategory(product.item.sub_category.category.id);
          setSelectedSubCategory(product.item.sub_category.id);
          setSelectedBrand(product.item.brand.id);
          setExpiryDate(product.expired_date ? dayjs(product.expiry_date) : null);
          setPackagingDate(product.pkt_date ? dayjs(product.expiry_date) : null);
          setFiles(product.item.images || []); // Assuming images are included in the response
        })
        .catch(error => {
          toast.error("Failed to load product data.");
        });
    }
  }, [productId]);

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };

  const handleFilesUpdate = (newFiles) => {
    setFiles(newFiles);
  };

  const handleSubCategorySelect = (subCategory) => {
    setSelectedSubCategory(subCategory);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoad(true);
    if (!productName || !MRP || !quantity || !selectedCategory || !selectedSubCategory || !selectedBrand || !expiryDate || !purchaseRate || !weight || !packagingDate) {
      toast.error("Please fill out all required fields.");
      setLoad(false);
      return;
    }

    const formData = new FormData();
    formData.append('item_name', productName);
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
      formData.append('images', file);
    });

    axios.put(`http://127.0.0.1:8000/api/UpdateProducts/${productId}/`, formData,{
      headers: {
        'Authorization': `Bearer ${token}`
    }
    })
      .then(response => {
        toast.success("Product updated successfully");
        setLoad(false);
        onClose(); // Close the modal after successful submission
        if (onProductUpdated) {
          onProductUpdated();
        }
      })
      .catch(error => {
        if (error.response && error.response.data && error.response.data.error) {
          toast.error(error.response.data.error);
        } else {
          toast.error("Error updating product");
        }
        setLoad(false);
      });
  };

  return (
    <>
      <ToastContainer />
      <div className={`${isOpen ? "modelinventory" : "hide"}`}>
        <div className="modelcontainer">
          <div className="headline">
            <h4>Update Product</h4>
          </div>
          <form id="myForm" className="entries" onSubmit={handleSubmit}>
            <div className="left-form-child">
              <div className="dragimage">
                <FileUpload onFilesUpdate={handleFilesUpdate} files={files} />
              </div>
            </div>
            <div className="right-form-child">
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
                <h4>Category</h4>
                <Category_Select onSelectCategory={handleCategorySelect} selectedCategoryId={selectedCategory} />
              </div>
              <div className="productname">
                <h4>Sub Category</h4>
                <SubCategory_Select selectedCategoryId={selectedCategory} onSelectSubCategory={handleSubCategorySelect} selectedSubCategoryId={selectedSubCategory} />
              </div>
              <div className="productname">
                  <h4>Brand</h4>
                  <Brand_Select selectedBrandId={selectedBrand} onSelectBrand={setSelectedBrand} />
                </div>
              <div className="productname">
                <h4>MRP</h4>
                <input
                  type="text"
                  placeholder="Enter MRP"
                  value={MRP}
                  onChange={(e) => setMRP(e.target.value)}
                />
              </div>
              <div className="productname">
                <h4>Purchase Rate</h4>
                <input
                  type="text"
                  placeholder="Enter purchase rate"
                  value={purchaseRate}
                  onChange={(e) => setPurchaseRate(e.target.value)}
                />
              </div>
              <div className="productname">
                <h4>Weight</h4>
                <input
                  type="text"
                  placeholder="Enter weight"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                />
              </div>
              <div className="productname">
                <h4>Quantity</h4>
                <input
                  type="text"
                  placeholder="Enter quantity"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                />
              </div>
              <div className="productname">
                <h4>Packaging Date</h4>
                {/* <DatePicker
                  className="myDatePicker"
                  value={packagingDate}
                  onChange={(newValue) => setPackagingDate(newValue)}
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
                  disabled={load}
                >
                  {load ? "Updating..." : "Update Product"}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default UpdateProduct;
