import React, { useState, useEffect } from 'react';
import axios from "axios";
import CustomSelect from './CustomSelect';

const CustomSubCategorySelect = ({ selectedCategoryId, onSelectSubCategory, selectedSubCategoryId }) => {
  const selected=localStorage.getItem("selectedSubCategory") || null
  const [subCategories, setSubCategories] = useState([]);
  const [selectedOption, setSelectedOption] = useState('');
  const token=localStorage.getItem('access_token');


  useEffect(() => {
    if (selectedCategoryId) {
      axios.get(`http://127.0.0.1:8000/api/subcategories/?category=${selectedCategoryId}`,{
        headers: {
          'Authorization': `Bearer ${token}`
      }
      })
        .then(response => {
          setSubCategories(response.data);
        })
        .catch(error => console.error("Error fetching subcategories:", error));
    } else {
      setSubCategories([]); // Clear subcategories if no category is selected
    }
  }, [selectedCategoryId]);

  useEffect(() => {
    // Set the selected option when selectedSubCategoryId changes
    setSelectedOption(selectedSubCategoryId || '');
  }, [selectedSubCategoryId]);

  const handleChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedOption(selectedValue);
    onSelectSubCategory(selectedValue); // Pass the selected value directly to the parent component
  };

  return (
    <CustomSelect
    label="Sub Category"
    options={subCategories}
    selectedOption={selectedOption}
    onSelect={(value) => {
      setSelectedOption(value);
      setSelectedOption(value); 
    }}
    valueKey="id"         
    labelKey="sub_category_name" 
    placeholder="Choose a category"
  />
  );
};

export default CustomSubCategorySelect;
