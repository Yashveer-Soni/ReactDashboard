import React, { useState, useEffect } from 'react';
import axios from "axios";
import CustomSelect from './CustomSelect';

const CustomSubCategorySelect = ({ selectedCategoryId, onSelectSubCategory, selectedSubCategoryId }) => {
  const token = localStorage.getItem('access_token');
  const [subCategories, setSubCategories] = useState([]);
  const [selectedOption, setSelectedOption] = useState(localStorage.getItem("selectedSubCategory") || '');

  useEffect(() => {
    if (selectedCategoryId) {
      axios.get(`http://127.0.0.1:8000/api/subcategories/?category=${selectedCategoryId}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      })
      .then(response => {
        setSubCategories(response.data);
      })
      .catch(error => {
        console.error("Error fetching subcategories:", error);
      });
    } else {
      setSubCategories([]);
    }
  }, [selectedCategoryId, token]);

  useEffect(() => {
    if (selectedSubCategoryId) {
      setSelectedOption(selectedSubCategoryId);
    }
  }, [selectedSubCategoryId]);

  const handleChange = (value) => {
    setSelectedOption(value);
    onSelectSubCategory(value); 
    localStorage.setItem("selectedSubCategory", value); 
  };

  return (
    <CustomSelect
      label="Sub Category"
      options={subCategories}
      selectedOption={selectedOption}
      onSelect={handleChange}
      valueKey="id"         
      labelKey="sub_category_name" 
      placeholder="Choose a subcategory"
    />
  );
};

export default CustomSubCategorySelect;
