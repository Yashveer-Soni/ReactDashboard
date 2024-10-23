import React from 'react';

const CustomSelect = ({ label, options, selectedOption, onSelect, placeholder, valueKey, labelKey, selectStyleClass }) => {
  const handleChange = (event) => {
    const selectedValue = event.target.value;
    onSelect(selectedValue);
  };

  return (
    <form className="w-full">
      {label && (
        <label
          htmlFor=""
          className="block mb-2 text-sm font-medium font-medium text-gray-900 dark:text-white"
        >
          {label}
        </label>
      )}
      <select
        id="custom-select"
        className={`font-medium bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-0 focus:border-transparent block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${selectStyleClass}`} 
        value={selectedOption}
        onChange={handleChange}
      >
        <option value="">{placeholder || 'Choose an option'}</option>
        {options.map((option) => (
          <option key={option[valueKey]} value={option[valueKey]}>
            {option[labelKey]}
          </option>
        ))}
      </select>
    </form>
  );
};

export default CustomSelect;
