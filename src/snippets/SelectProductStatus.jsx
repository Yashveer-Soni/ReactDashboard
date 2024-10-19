// import * as React from 'react';
// import { draftIcon, activeIcon } from './Image_load';

// export default function SelectProductStatus({ onSelectStatus }) {
//   // Define the options with icons
//   const icons = [
//     { icon: activeIcon, label: 'Active' },
//     { icon: draftIcon, label: 'Draft' },
//   ];

//   // Retrieve the saved status from localStorage
//   const savedStatusLabel = localStorage.getItem("selectedStatus") || null;

//   // Find the corresponding icon object based on the saved status label
//   const savedStatus = icons.find(option => option.label === savedStatusLabel) || null;

//   console.log(savedStatus); // This should log the selected status object

//   return (
//     <Autocomplete
//       id="status-select-demo"
//       sx={{
//         width: '100%',
//         '& .MuiOutlinedInput-root': {
//           '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
//             borderColor: 'transparent', // Remove focus border color
//           },
//         },
//         '& .MuiAutocomplete-inputRoot': {
//           '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
//             borderColor: 'transparent', // Remove focus border color
//           },
//         },
//       }}
//       options={icons}
//       autoHighlight
//       getOptionLabel={(option) => option.label}
//       onChange={(event, value) => {
//         onSelectStatus(value.label);
//         if (value.label) {
//           localStorage.setItem("selectedStatus", value.label);
//         }
//       }} 
//       // Set value to the saved status object, or null if not found
//       value={savedStatus}
//       renderOption={(props, option) => {
//         const { key, ...optionProps } = props;
//         return (
//           <Box
//             key={key}
//             component="li"
//             sx={{ '& > img': { mr: 2, flexShrink: 0 } }}
//             {...optionProps}
//           >
//             <img
//               loading="lazy"
//               width="15"
//               srcSet={`${option.icon}`}
//               src={`${option.icon}`}
//               alt=""
//             />
//             {option.label}
//           </Box>
//         );
//       }}
//       renderInput={(params) => (
//         <TextField
//           {...params}
//           label=""
//           slotProps={{
//             htmlInput: {
//               ...params.inputProps,
//               autoComplete: 'new-password', // disable autocomplete and autofill
//             },
//           }}
//         />
//       )}
//     />
//   );
// }
