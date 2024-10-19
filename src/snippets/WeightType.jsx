import * as React from 'react';

export default function SelectLabels({onWeightChange}) {
  const selected=localStorage.getItem("weightType") || 3;
  const [weight, setWeight] = React.useState('');

  const handleChange = (event) => {
    setWeight(event.target.value);
    onWeightChange(weight);
    localStorage.setItem("weightType", event.target.value);

  };

  return (
    <div>
      {/* <FormControl sx={{ m: 1, minWidth: 120 }}>
        <Select
          value={weight?weight:selected}
          onChange={handleChange}
          displayEmpty
          inputProps={{ 'aria-label': 'Without label' }}
          sx={{
            '& .MuiOutlinedInput-notchedOutline': {
              border: 'none',
            },
          }}
        >
          <MenuItem value={'kg'}>Kg</MenuItem>
          <MenuItem value={'g'}>G</MenuItem>
          <MenuItem value={'l'}>L</MenuItem>
          <MenuItem value={'ml'}>Ml</MenuItem>
          <MenuItem value={'pcs'}>Pcs</MenuItem>
        </Select>
      </FormControl> */}
    </div>
  );
}
