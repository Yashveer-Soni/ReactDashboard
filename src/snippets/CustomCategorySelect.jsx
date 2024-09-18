import React, { useState, useEffect } from 'react';
import axios from "axios";
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 10 + ITEM_PADDING_TOP, // Show only 10 items at a time
      width: 250,
    },
  },
};

const CustomCategorySelect = ({ onSelectCategory, selectedCategoryId }) => {
  const [selectedOption, setSelectedOption] = useState('');
  const [categories, setCategories] = useState([]);
  const token=localStorage.getItem('access_token');


  useEffect(() => {
    // Fetch categories from the API
    axios.get("http://127.0.0.1:8000/api/categories/",{
      headers: {
        'Authorization': `Bearer ${token}`
    }
    })
      .then(response => setCategories(response.data))
      .catch(error => console.error("Error fetching categories:", error));
  }, []);

  useEffect(() => {
    // Set the selected option when selectedCategoryId changes
    setSelectedOption(selectedCategoryId || '');
  }, [selectedCategoryId]);

  const handleChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedOption(selectedValue);
    onSelectCategory(selectedValue); // Pass the selected value directly to the parent component
  };

  return (
    <FormControl sx={{ m: 1, minWidth: 120 }}>
      <Select
        value={selectedOption}
        onChange={handleChange}
        displayEmpty
        inputProps={{ 'aria-label': 'Without label' }}
        MenuProps={MenuProps} // Apply the custom MenuProps here
      >
        <MenuItem value="">
          None
        </MenuItem>
        {categories.map((category) => (
          <MenuItem
            key={category.id}
            value={category.id} // Use the category ID as the value
          >
            {category.category_name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default CustomCategorySelect;
