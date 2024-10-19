import React, { useState } from 'react';
import CustomSelect from './CustomSelect';

export default function SelectLabels({onWeightChange}) {
  const selected=localStorage.getItem("weightType") || 3;
  const [weight, setWeight] = useState('kg');

  const handleChange = (event) => {
    setWeight(event.target.value);
    onWeightChange(weight);
    localStorage.setItem("weightType", event.target.value);
  };
  const option=[
    {label:"Kg", value:'kg'},
    {label:"G", value:'g'},
    {label:"L", value:'l'},
    {label:"Ml", value:'ml'},
    {label:"Pcs", value:'pcs'},
  ];

  return (
    <div className='w-full mt-2'>
      <CustomSelect
        label=""
        options={option}
        selectedOption={weight}
        onSelect={(value) => {
          setWeight(value);
        }}
        valueKey="value"         
        labelKey="label" 
        placeholder="Type"
    />
    </div>
  );
}
