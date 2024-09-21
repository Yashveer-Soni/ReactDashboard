import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { draftIcon, activeIcon } from './Image_load';

export default function SelectProductStatus() {
  return (
    <Autocomplete
      id="country-select-demo"
      sx={{
        width: '100%',
        '& .MuiOutlinedInput-root': {
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: 'transparent', // Remove focus border color
          },
        },
        '& .MuiAutocomplete-inputRoot': {
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: 'transparent', // Remove focus border color
          },
        },
      }}
      options={icons}
      autoHighlight
      getOptionLabel={(option) => option.label}
      renderOption={(props, option) => {
        const { key, ...optionProps } = props;
        return (
          <Box
            key={key}
            component="li"
            sx={{ '& > img': { mr: 2, flexShrink: 0 } }}
            {...optionProps}
          >
            <img
              loading="lazy"
              width="15"
              srcSet={`${option.icon}`}
              src={`${option.icon}`}
              alt=""
            />
            {option.label} 
          </Box>
        );
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          label=""
          slotProps={{
            htmlInput: {
              ...params.inputProps,
              autoComplete: 'new-password', // disable autocomplete and autofill
            },
          }}
        />
      )}
    />
  );
}

const icons = [
  { icon: activeIcon, label: 'Active'},
  { icon: draftIcon, label: 'Draft'},
];
