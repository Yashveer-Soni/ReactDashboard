import React, { useState, useEffect } from 'react';
import CustomSelect from './CustomSelect';

export default function SelectLabels({ onWeightChange }) {
  const [weight, setWeight] = useState('kg'); 

  useEffect(() => {
    const savedWeight = localStorage.getItem("weightType") || 'kg';
    setWeight(savedWeight);
    onWeightChange(savedWeight); 
  }, []);

  const handleChange = (value) => {
    setWeight(value);
    onWeightChange(value); 
    localStorage.setItem("weightType", value); 
  };

  const options = [
    { label: "Kg", value: 'kg' },
    { label: "G", value: 'g' },
    { label: "L", value: 'l' },
    { label: "Ml", value: 'ml' },
    { label: "Pcs", value: 'pcs' },
  ];

  return (
    <div className='w-full mt-2'>
      <CustomSelect
        label=""
        options={options}
        selectedOption={weight}
        onSelect={handleChange} // Pass the change handler directly
        valueKey="value"
        labelKey="label"
        placeholder="Type"
      />
    </div>
  );
}
