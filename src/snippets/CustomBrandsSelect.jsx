import React, { useState, useEffect } from 'react';
import axios from "axios";
import CustomSelect from './CustomSelect';

const CustomBrandsSelect = ({ selectedBrandId, onSelectBrand }) => {
  const selected=localStorage.getItem("selectedBrand") || null
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);
  const token=localStorage.getItem('access_token');
  const [selectedOption, setSelectedOption] = useState('');

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/brands/",{
          headers: {
            'Authorization': `Bearer ${token}`
        }
        });
        setBrands(Array.isArray(response.data) ? response.data : []); // Ensure response is an array
      } catch (error) {
        console.error("Error fetching brands:", error);
        setBrands([]); // Set to empty array on error
      } finally {
        setLoading(false);
      }
    };

    fetchBrands();
  }, []);

  const handleChange = (event) => {
    const selectedValue = event.target.value;
    console.log('Selected Value:', selectedValue);
    onSelectBrand(selectedValue);  // Pass selected option to the parent component
  };

  return (
    <CustomSelect
    label="Brand"
    options={brands}
    selectedOption={selectedOption}
    onSelect={(value) => {
      setSelectedOption(value);
      setSelectedOption(value); 
    }}
    valueKey="id"         
    labelKey="brand_name" 
    placeholder="Brand"
  />
  );
};

export default CustomBrandsSelect;
