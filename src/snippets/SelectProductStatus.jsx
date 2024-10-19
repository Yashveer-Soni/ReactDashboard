import React, { useState } from 'react';
import { draftIcon, activeIcon } from './Image_load';
import CustomSelect from './CustomSelect';

export default function SelectProductStatus({ onSelectStatus }) {
  const icons = [
    { label: 'Active' },
    { label: 'Draft' },
  ];
  const [selectedOption, setSelectedOption] = useState('');
  const savedStatusLabel = localStorage.getItem("selectedStatus") || null;
  onSelectStatus(selectedOption);
  return (
    <CustomSelect
        label="Status"
        options={icons}
        selectedOption={selectedOption}
        onSelect={(value) => {
        setSelectedOption(value);
        }}
        valueKey="label"         
        labelKey="label" 
        placeholder="Select Status"
    />
  );
}
