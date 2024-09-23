import * as React from 'react';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function SelectLabels({onWeightChange}) {
  const [weight, setWeight] = React.useState(3);

  const handleChange = (event) => {
    setWeight(event.target.value);
    onWeightChange(weight);
  };

  return (
    <div>
      <FormControl sx={{ m: 1, minWidth: 120 }}>
        <Select
          value={weight}
          onChange={handleChange}
          displayEmpty
          inputProps={{ 'aria-label': 'Without label' }}
          sx={{
            '& .MuiOutlinedInput-notchedOutline': {
              border: 'none',
            },
          }}
        >
          <MenuItem value={1}>lb</MenuItem>
          <MenuItem value={2}>oz</MenuItem>
          <MenuItem value={3}>kg</MenuItem>
          <MenuItem value={4}>g</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}
