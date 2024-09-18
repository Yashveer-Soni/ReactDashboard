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

const CustomSubCategorySelect = ({ selectedCategoryId, onSelectSubCategory, selectedSubCategoryId }) => {
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
        {subCategories.map((subcategory) => (
          <MenuItem
            key={subcategory.id}
            value={subcategory.id} // Use the subcategory ID as the value
          >
            {subcategory.sub_category_name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default CustomSubCategorySelect;
