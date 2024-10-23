import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CustomSelect from './CustomSelect';

const CustomBrandsSelect = ({ selectedBrandId, onSelectBrand }) => {
  const token = localStorage.getItem('access_token');
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOption, setSelectedOption] = useState(localStorage.getItem('selectedBrand') || '');

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/brands/', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setBrands(Array.isArray(response.data) ? response.data : []);
      } catch (error) {
        console.error('Error fetching brands:', error);
        setBrands([]); // Clear brands on error
      } finally {
        setLoading(false);
      }
    };

    fetchBrands();
  }, [token]);

  // Update selectedOption when selectedBrandId prop changes
  useEffect(() => {
    if (selectedBrandId) {
      setSelectedOption(selectedBrandId);
    }
  }, [selectedBrandId]);

  const handleChange = (value) => {
    setSelectedOption(value);
    onSelectBrand(value); // Notify parent of the selected brand
    localStorage.setItem('selectedBrand', value); // Store selection in localStorage
  };

  return loading ? (
    <div>Loading brands...</div>
  ) : (
    <CustomSelect
      label="Brand"
      options={brands}
      selectStyleClass="w-100 max-w-100"
      selectedOption={selectedOption}
      onSelect={handleChange}
      valueKey="id"
      labelKey="brand_name"
      placeholder="Select a brand"
    />
  );
};

export default CustomBrandsSelect;
