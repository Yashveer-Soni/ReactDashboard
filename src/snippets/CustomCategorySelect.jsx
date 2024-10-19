import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CustomSelect from './CustomSelect';

const CustomCategorySelect = ({ onSelectCategory, selectedCategoryId }) => {
  const selected = localStorage.getItem('selectedCategory') || null;
  const [selectedOption, setSelectedOption] = useState('');
  const [categories, setCategories] = useState([]);
  const token = localStorage.getItem('access_token');

  useEffect(() => {
    axios
      .get('http://127.0.0.1:8000/api/categories/', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => setCategories(response.data))
      .catch((error) => console.error('Error fetching categories:', error));
  }, []);

  useEffect(() => {
    setSelectedOption(selectedCategoryId || '');
  }, [selectedCategoryId]);

  const handleChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedOption(selectedValue);
    onSelectCategory(selectedValue);
  };

  return (
    <CustomSelect
      label="Select Category"
      options={categories}
      selectedOption={selectedOption}
      onSelect={(value) => {
        setSelectedOption(value);
        onSelectCategory(value); 
      }}
      valueKey="id"         
      labelKey="category_name" 
      placeholder="Choose a category"
    />
  );
};

export default CustomCategorySelect;
